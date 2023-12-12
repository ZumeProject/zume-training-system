import { LitElement, html } from 'lit';
import { ZumeWizardSteps } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';

export class GetCoach extends LitElement {
    static get properties() {
        return {
            /**
             * The step name
             */
            name: { type: String },
            /**
             * The module name that this step is part of
             */
            module: { type: String },
            /**
             * Is this step skippable
             */
            skippable: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * What inputs to display
             */
            variant: { type: String },
            state: { attribute: false },
            errorMessage: { attribute: false },
            doneText: { attribute: false },
            loading: { attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.variant = ''
        this.t = {}
        this.state = {}
        this.errorMessage = ''
        this.doneText = ''
        this.loading = false
    }

    firstUpdated() {
        this.doneText = this.t.connect_success

        if ( this.variant === ZumeWizardSteps.connectingToCoach ) {
            this.loading = true
            const onCoachRequested = (( data ) => {
                this.loading = false

                if ( data === false ) {
                    this.doneText = this.t.connect_fail
                    this.setErrorMessage(this.t.error_connecting)
                }

                if (
                    data.coach_request &&
                    data.coach_request.errors &&
                    Object.keys(data.coach_request.errors).length !== 0
                ) {
                    const errorKeys = Object.keys(data.coach_request.errors)

                    if (errorKeys[0] === 'already_has_coach') {
                        this.doneText = this.t.already_coached
                        this.setErrorMessage(this.t.error_connecting)
                    }
                }

                this._handleFinish()
            }).bind(this)
            makeRequest('POST', 'get_a_coach', {}, 'zume_system/v1/' )
                .done(onCoachRequested)
                .fail((error) => {
                    console.log(error)
                })
        }
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    render() {
        if ( !this.stateManager ) {
            this.stateManager = new WizardStateManager(this.module)

            this.state = this.stateManager.get(this.variant) || {}
        }

        return html`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${ this.variant === ZumeWizardSteps.contactPreferences ? html`
                <h2 class="f-1">${this.t.contact_preference_question}</h2>
                <div class="stack center | w-50 align-items-start">
                    <div>
                        <input type="checkbox" name="contact-preference" id="email" value="email" @change=${this._handleChange} ?checked=${!!this.state.email} />
                        <label for="email">${this.t.email}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="text" value="text" @change=${this._handleChange} ?checked=${!!this.state.text} />
                        <label for="text">${this.t.text}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="phone" value="phone" @change=${this._handleChange} ?checked=${!!this.state.phone} />
                        <label for="phone">${this.t.phone}</label>
                    </div>
                    <div>
                        <input type="checkbox" name="contact-preference" id="whatsapp" value="whatsapp" @change=${this._handleChange} ?checked=${!!this.state.whatsapp} />
                        <label for="whatsapp">${this.t.whatsapp}</label>
                    </div>
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.languagePreferences ? html`
                <h2 class="f-1">${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="language">${this.t.language_preference}</label>
                    <input type="text" name="language-preference" id="language" @change=${this._handleChange} value=${this.state.value} />
                </div>
            ` : ''}

            ${ this.variant === ZumeWizardSteps.howCanWeServe ? html`
                <h2 class="f-1">${this.t.how_can_we_serve}</h2>
                <div class="stack center | w-50 align-items-start">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="contact-preference" id="coaching" value="coaching" @change=${this._handleChange} ?checked=${!!this.state.coaching} />
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="contact-preference" id="technical" value="technical" @change=${this._handleChange} ?checked=${!!this.state.technical} />
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="contact-preference" id="implementation" value="implementation" @change=${this._handleChange} ?checked=${!!this.state.implementation} />
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="contact-preference" id="content" value="content" @change=${this._handleChange} ?checked=${!!this.state.content} />
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="contact-preference" id="group-started" value="group-started" @change=${this._handleChange} ?checked=${!!this.state['group-started']} />
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            ` : '' }
            ${ this.variant === ZumeWizardSteps.connectingToCoach ? html`

                <h1>${this.t.connecting_coach_title}</h1>
                <div class="stack center | w-50 align-items-start">
                    ${ this.loading === true
                        ? html`<p>${this.t.please_wait} <span class="loading-spinner active"></span></p>`
                        : html`<p>${this.doneText}</p>`
                    }
                </div>
            ` : '' }
            ${ this.variant !== ZumeWizardSteps.connectingToCoach
                ? html`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                        <button type="submit" class="btn" ?disabled=${this.loading}>${this.t.done}</button>
                    </div>
                `
                : ''}
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        </form>
        `
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
        }

        if ( Object.keys(this.state).length === 0 ) {
            this.setErrorMessage(this.t.missing_response)

            return
        }

        this._sendDoneStepEvent()
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleFinish() {
        setTimeout(() => {
            this._sendDoneStepEvent()
        }, 3000);
    }

    _handleChange(event) {
        if ( event.target.type === 'checkbox' ) {
            this.state[event.target.value] = event.target.checked
        }
        if ( event.target.type === 'text' ) {
            this.state.value = event.target.value
        }

        this.stateManager.add(this.variant, this.state)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('get-coach', GetCoach);
