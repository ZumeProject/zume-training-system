import { LitElement, html } from 'lit';
import { Modules, Steps } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';

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

    connectedCallback() {
        super.connectedCallback();

        this.stateManager = new WizardStateManager(Modules.makePlan)
        this.stateManager.clear()
    }

    willUpdate(properties) {
        if (properties.has('variant')) {
            this.state = this.stateManager.get(this.variant) || {}
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
            <div class="stack-1">
                ${this.variant === Steps.planDecision ? html`
                    <div class="stack">
                        <span class="zume-start-group brand-light f-7"></span>
                        <h2>${this.t.join_or_start_a_training}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                            <button class="btn tight light" data-decision="join" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight light outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howManySessions ? html`
                    <div class="stack">
                        <span class="zume-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_which_session}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light outline ${this.state === '20' ? 'selected' : ''}" data-value="20" @click=${this._handleSelection}>${this.t.hour_1_session_20}</button>
                            <button class="btn tight light ${this.state === '10' ? 'selected' : ''}" data-value="10" @click=${this._handleSelection}>${this.t.hour_2_session_10}</button>
                            <button class="btn tight light outline ${this.state === '5' ? 'selected' : ''}" data-value="5" @click=${this._handleSelection}>${this.t.hour_4_session_5}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howOften ? html`
                    <div class="stack">
                        <span class="zume-time brand-light f-7"></span>
                        <h2>${this.t.question_how_often}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light ${this.state === 'weekly' ? 'selected' : ''}" data-value="weekly" @click=${this._handleSelection}>${this.t.weekly}</button>
                            <button class="btn tight light ${this.state === 'biweekly' ? 'selected' : ''}" data-value="biweekly" @click=${this._handleSelection}>${this.t.biweekly}</button>
                            <button class="btn tight light ${this.state === 'monthly' ? 'selected' : ''}" data-value="monthly" @click=${this._handleSelection}>${this.t.monthly}</button>
                            <button class="btn tight light ${this.state === 'other' ? 'selected' : ''}" data-value="other" @click=${this._handleSelection}>${this.t.other}</button>
                            <button class="btn tight light outline" @click=${this._handleDone}>${this.t.skip}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.startDate ? html`
                    <div class="stack">
                        <span class="zume-start-date brand-light f-7"></span>
                        <h2>${this.t.question_when_will_you_start}</h2>
                        <div class="cluster justify-content-center gapy-0">
                            <input type="date" name="date" class="fit-content m0" @change=${this._handleChange} value=${this.state.date} >
                            <input type="time" name="time" class="fit-content m0" @change=${this._handleChange} value=${this.state.time} min="00:00" max="23:55" step="300"/>
                        </div>
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                            <button class="btn light outline fit-content mx-auto" @click=${this._handleDone}>${this.t.skip}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.location ? html`
                    <div class="stack">
                        <span class="zume-start-date brand-light f-7"></span>
                        <h2>${this.t.question_where_will_you_meet}</h2>
                        <p>${this.t.question_where_will_you_meet_help_text}</p>
                        <input type="text" name="location" @change=${this._handleChange} value=${typeof this.state === 'string' ? this.state : ''} />
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                            <button class="btn light outline" @click=${this._handleDone}>${this.t.skip}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.review ? html`
                    <div class="stack">
                        <span class="zume-overview brand-light f-7"></span>
                        <h2>${this.t.review_training}</h2>
                        <p>${this.t.you_can_change_your_choices}</p>
                        <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.create}</button>
                    </div>
                ` : ''}
                ${this.variant !== Steps.planDecision ? html`
                    <review-steps
                        .t=${this.t}
                        howManySessions=${this.stateManager.get(Steps.howManySessions)}
                        howOften=${this.stateManager.get(Steps.howOften)}
                        time=${this.stateManager.get(Steps.startDate)?.time}
                        date=${this.stateManager.get(Steps.startDate)?.date}
                        whatLocation=${this.stateManager.get(Steps.location)}
                    ></review-steps>
                ` : ''}
            </div>
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

    _handleSelection(event) {
        const value = event.target.dataset.value

        this.stateManager.add(this.variant, value)

        this._handleDone()
    }

    _handleChange(event) {
        if (event.target.type === 'text') {
            this.state = event.target.value
        }
        if (['date', 'time'].includes(event.target.type)) {
            this.state[event.target.name] = event.target.value
        }

        this.stateManager.add(this.variant, this.state)
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
