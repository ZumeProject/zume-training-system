import { LitElement, html } from 'lit'
import { zumeRequest } from '../../js/zumeRequest'
import { WizardStateManager } from './wizard-state-manager'
import { Modules, Steps } from './wizard-constants'

export class JoinTraining extends LitElement {
    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },
            hasNextStep: { type: Boolean },
            variant: { type: String },

            code: { attribute: false },
            message: { type: Array, attribute: false },
            errorMessage: { type: String, attribute: false },
            successMessage: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
            success: { type: Boolean, attribute: false },
            showTrainings: { attribute: false },
            showNextStep: { attribute: false },
        }
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.successMessage = ''
        this.message = []
        this.showTrainings = false
        this.showNextStep = false
        this.loading = false
        this.stateManager = WizardStateManager.getInstance(Modules.joinTraining)
    }

    firstUpdated() {
        if (this.variant === Steps.joinTraining) {
            this._handleJoinTraining()
            return
        }

        /* We need the plan id */
        const url = new URL(location.href)
        if (!url.searchParams.has('code')) {
            this.message = []
            this.loading = false
            this.showTrainings = true
            return
        }

        const code = url.searchParams.get('code')

        this.chooseTraining(code)
    }

    connectToPlan(code) {
        this.loading = true
        this.dispatchEvent(
            new CustomEvent('loadingChange', {
                bubbles: true,
                detail: { loading: this.loading },
            })
        )
        this.message.push(this.t.please_wait)
        this.code = code
        zumeRequest
            .post('connect/public-plan', { code })
            .then((data) => {
                this.successMessage = this.t.success.replace('%s', data.name)
                this.success = true
                this.message = [
                  this.t.contact_visibility1,
                ]

                if (!data.coach_request_success) {
                  this.setErrorMessage(this.t.coach_request_failed)
                }

                const url = new URL(location.href)
                url.searchParams.set('joinKey', code)
                window.history.pushState(null, null, url.href)
            })
            .catch((error) => {
                console.log(error)
                this.message = []
                if (error.code === 'bad_plan_code') {
                    this.setErrorMessage(this.t.broken_link)
                } else {
                    this.setErrorMessage(this.t.error)
                }
            })
            .finally(() => {
                this.loading = false
                this.dispatchEvent(
                    new CustomEvent('loadingChange', {
                        bubbles: true,
                        detail: { loading: this.loading },
                    })
                )
                this.dispatchEvent(
                    new CustomEvent('wizard:finish', { bubbles: true })
                )
            })
    }

    setErrorMessage(message) {
        this.errorMessage = message
    }

    _handleChosenTraining(event) {
        const { code } = event.detail

        this.chooseTraining(code)
    }

    chooseTraining(code) {
        this.stateManager.add(Steps.joinTrainingSelection, code)

        this.showTrainings = false
        this.showNextStep = true

        this.message.push(this.t.complete_profile)
    }

    _handleJoinTraining() {
        const code = this.stateManager.get(Steps.joinTrainingSelection)

        this.connectToPlan(code)
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent('done-step', { bubbles: true })
        this.dispatchEvent(doneStepEvent)
    }

    renderMessage() {
        return this.message.map(message => html`<p>${message}</p>`)
    }

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <div class="stack--2">
              <div class="success banner" data-state=${this.successMessage.length ? '' : 'empty'}>${this.successMessage}</div>
              <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
              ${this.renderMessage()}
            </div>
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            ${this.showTrainings && this.variant === Steps.joinTrainingSelection
                ? html`
                      <public-trainings
                          .t=${this.t}
                          notifyUrl=${jsObject.notify_of_future_trainings_url}
                          @chosen-training=${this._handleChosenTraining}
                      ></public-trainings>
                  `
                : ''}
            ${this.showNextStep || (this.success && this.hasNextStep)
                ? html`
                      <button class="btn" @click=${this._sendDoneStepEvent}>
                          ${this.t.next}
                      </button>
                  `
                : ''}
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-training', JoinTraining)
