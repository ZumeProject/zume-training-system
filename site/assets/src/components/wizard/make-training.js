import { LitElement, html } from 'lit';
import { ZumeWizardSteps } from './wizard-constants';

export class MakeTraining extends LitElement {
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
            message: { attribute: false },
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
        this.message = ''
        this.loading = false
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    _handlePlanDecision(event) {
        const decision = event.target.dataset.decision
        this.dispatchEvent(new CustomEvent('plan-decision', { bubbles: true, detail: { decision } }))
    }

    render() {
        return html`
            ${this.variant === ZumeWizardSteps.planDecision ? html`
                <div class="stack">
                    <span class="zume-start-group brand-light f-7"></span>
                    <h2>${this.t.join_or_start_a_training}</h2>
                    <button class="btn tight light" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                    <button class="btn tight light" data-decision="join" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                    <button class="btn tight light outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.howManySessions ? html`
                <div class="stack">
                    <span class="zume-session-choice brand-light f-7"></span>
                    <h2>${this.t.question_which_session}</h2>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.hour_1_session_20}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.hour_2_session_10}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.hour_4_session_5}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.howOften ? html`
                <div class="stack">
                    <span class="zume-time brand-light f-7"></span>
                    <h2>${this.t.question_how_often}</h2>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.weekly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.biweekly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.monthly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.other}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.startDate ? html`
                <div class="stack">
                    <span class="zume-start-date brand-light f-7"></span>
                    <h2>${this.t.question_when_will_you_start}</h2>
                    <div class="cluster justify-content-center gapy-0">
                        <input type="date" class="fit-content m0">
                        <input type="time" class="fit-content m0" />
                    </div>
                    <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                    <button class="btn light outline fit-content mx-auto" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.location ? html`
                <div class="stack">
                    <span class="zume-start-date brand-light f-7"></span>
                    <h2>${this.t.question_where_will_you_meet}</h2>
                    <p>${this.t.question_where_will_you_meet_help_text}</p>
                    <input type="text" />
                    <button class="btn tight light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            ` : ''}
            ${this.variant === ZumeWizardSteps.review ? html`
                <div class="stack">
                    <span class="zume-overview brand-light f-7"></span>
                    <h2>${this.t.review_training}</h2>
                    <p>${this.t.you_can_change_your_choices}</p>
                    <button class="btn tight light fit-content mx-auto" @click=${this._handleDone}>${this.t.create}</button>
                </div>
            ` : ''}

        `;
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
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

    createRenderRoot() {
        return this
    }
}
customElements.define('make-training', MakeTraining);
