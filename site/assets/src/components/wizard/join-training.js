import { LitElement, html } from 'lit'
import { zumeRequest } from '../../js/zumeRequest'
import { WizardStateManager } from './wizard-state-manager'
import { Modules, Steps } from './wizard-constants'
import { zumeAttachObservers } from '../../js/zumeAttachObservers'

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
            message: { type: String, attribute: false },
            errorMessage: { type: String, attribute: false },
            successMessage: { type: String, attribute: false },
            success: { type: Boolean, attribute: false },
            loading: { type: Boolean, attribute: false },
            success: { type: Boolean, attribute: false },
            showTrainings: { attribute: false },
            showNextStep: { attribute: false },
            privacyPolicyOpen: { type: Boolean, attribute: false },
            notifyOfFutureTrainings: { type: Boolean, attribute: false },
            leavingNotificationList: { type: Boolean, attribute: false },
        }
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.successMessage = ''
        this.success = false
        this.message = ''
        this.showTrainings = false
        this.showNextStep = false
        this.loading = false
        this.leavingNotificationList = false
        this.privacyPolicyOpen = false
        this.isOnNotificationList = jsObject.profile.notify_of_future_trainings === '1'
        this.notifyOfFutureTrainings = jsObject.profile.notify_of_future_trainings === '1'
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
        this.message = this.t.please_wait
        this.code = code
        zumeRequest
            .post('connect/public-plan', { code })
            .then((data) => {
                this.successMessage = this.t.success.replace('%s', data.name)
                this.success = true
                this.message = ''

                if (!data.coach_request_success) {
                  this.setErrorMessage(this.t.coach_request_failed)
                }

                const url = new URL(location.href)
                url.searchParams.set('joinKey', code)
                window.history.pushState(null, null, url.href)
            })
            .catch((error) => {
                this.message = ''
                if (error.code === 'bad_plan_code') {
                    this.setErrorMessage(this.t.broken_link)
                } else {
                    this.setErrorMessage(this.t.error)
                }
            })
            .finally(() => {
                this.loading = false
                zumeAttachObservers(this.renderRoot, 'join-training')
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

    togglePrivacyPolicy() {
        this.privacyPolicyOpen = !this.privacyPolicyOpen
    }

    toggleNotificationList() {
        if (this.leavingNotificationList) {
            return
        }

        this.leavingNotificationList = true
        this.notifyOfFutureTrainings = !this.notifyOfFutureTrainings

        zumeRequest.post('email-preferences', {
            notify_of_future_trainings: this.notifyOfFutureTrainings,
        })
        .then((data) => {
          this.dispatchEvent(new CustomEvent('user-profile:change', { bubbles: true, detail: data }))
        })
        .catch((error) => {
            this.notifyOfFutureTrainings = !this.notifyOfFutureTrainings
            this.setErrorMessage(this.t.error)
        })
        .finally(() => {
            this.leavingNotificationList = false
        })
    }

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <div class="stack--2">
              <div class="success banner" data-state=${this.successMessage.length ? '' : 'empty'}>${this.successMessage}</div>
              <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
              ${this.message.length ? html`<p>${this.message}</p>` : ''}
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
            ${this.success ? html`
                <button class="btn outline tight mt-0" @click=${this.togglePrivacyPolicy}>
                  ${this.t.privacy_policy}
                </button>
                <div class="zume-collapse" ?data-expand=${this.privacyPolicyOpen}>
                  <ul role="list" class="fit-content mt-1 mx-auto text-left">
                    <li>${this.t.contact_visibility1}</li>
                  </ul>
                </div>
            ` : ''}
            ${ this.success && this.isOnNotificationList ? html`
              <div class="card mw-50ch mx-auto">
                <p class="bold">${this.t.do_you_want_to_unsubscribe_from_the_notification_list}</p>
                <div class="form-control brand-light">
                  <input
                      type="checkbox"
                      id="notify_of_future_trainings"
                      ?checked=${this.notifyOfFutureTrainings}
                      @change=${this.toggleNotificationList}
                  />
                  <label for="notify_of_future_trainings" class="f-1">
                      ${jsObject.translations.notify_of_future_trainings}
                  </label>
                  </div>
                  <span class="loading-spinner mx-auto ${this.leavingNotificationList ? 'active' : ''}"></span>
              </div>
            ` : ''}
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
