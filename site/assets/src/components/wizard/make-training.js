import { LitElement, html } from 'lit';
import { Modules, Steps, Wizards } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';
import { DateTime } from 'luxon';

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
            selectedDays: { type: Array, attribute: false },
            completedSteps: { type: Array, attribute: false },
            calendarStart: { type: String, attribute: false },
            calendarEnd: { type: String, attribute: false },
            calendarView: { type: String, attribute: false },
            scheduleView: { type: String, attribute: false },
            errorMessage: { type: String, attribute: false },
            message: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
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
        this.stateManager = new WizardStateManager(Modules.makePlan)
        this.stateManager.clear()
        this.trainingSchedule = []
        this.selectedDays = []
        this.completedSteps = []
        this.calendarStart = DateTime.now().startOf('month').toISODate()
        this.calendarEnd = DateTime.now().plus({ month: 2 }).endOf('month').toISODate()
        this.calendarView = 'all'
        this.scheduleView = 'calendar'
}

    willUpdate(properties) {
        const defaultState = {
            [Steps.howManySessions]: '10',
            [Steps.howOften]: 'weekly',
            [Steps.location]: '',
            [Steps.startDate]: {},
        }
        if (properties.has('variant')) {
            this.state = this.stateManager.get(this.variant) || defaultState[this.variant]

            if (this.variant === Steps.review) {
                this._buildSelectedDays()
            }
            if (this.variant === Steps.review && this.isForIntensive()) {
                this.scheduleView = 'list'
            }
            /* DEV only */
            if (false && this.variant !== Steps.review) {
                this.variant = Steps.review
                this.stateManager.add(Steps.howManySessions, '10')
                this.stateManager.add(Steps.howOften, 'weekly')
                this.stateManager.add(Steps.startDate, { date: '2024-07-12' })
                this._buildSelectedDays()
            }
        }
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    _handlePlanDecision(event) {
        const decision = event.target.dataset.decision
        let wizard = ''
        switch (decision) {
            case 'make':
                wizard = Wizards.makeAGroup
                break;
            case 'join':
                wizard = Wizards.joinATraining
                break;
            default:
                break;
        }
        this._sendLoadWizardEvent(wizard)
    }

    _sendLoadWizardEvent(wizard) {
        this.dispatchEvent(new CustomEvent('wizard:load', { bubbles: true, detail: { wizard } }))
    }

    _handleDone(event) {
        if ( event ) {
            event.preventDefault()
        }

        if (!this.completedSteps.includes(this.variant)) {
            this.completedSteps = [...this.completedSteps, this.variant]
        }

        this._saveState()

        if (this.variant === Steps.howManySessions && this.state === '5') {
            this._gotoStep(Steps.review)
            return
        }

        this._sendDoneStepEvent()
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _gotoStep(step) {
        const doneStepEvent = new CustomEvent( 'wizard:goto-step', { bubbles: true, detail: { slug: step } } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleSelection(event) {
        const value = event.target.dataset.value
        this.state = value

        this._saveState()
    }

    _saveState() {
        this.stateManager.add(this.variant, this.state)
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

    _buildSelectedDays() {

        const howManySessions = this.stateManager.get(Steps.howManySessions)
        const howOften = this.stateManager.get(Steps.howOften)
        const startDate = this.stateManager.get(Steps.startDate)?.date

        if (this.selectedDays.length > 0) {
            return
        }

        if (howManySessions && howOften && startDate) {
            let weekInterval = 0
            if (howOften === 'weekly') {
                weekInterval = 1
            }
            if (howOften === 'biweekly') {
                weekInterval = 2
            }
            if (howOften === 'monthly') {
                weekInterval = 4
            }

            const selectedDays = []
            const date = DateTime.fromISO(startDate)
            for (let i = 1; i < Number(howManySessions) + 1; i++) {
                selectedDays.push(date.plus({weeks: weekInterval * ( i - 1 )}).toISODate())
            }
            this.selectedDays = selectedDays
            this.calendarStart = DateTime.fromISO(date).startOf('month').toISODate()
            this.calendarEnd = DateTime.fromISO(selectedDays[selectedDays.length - 1]).endOf('month').toISODate()
            this.calendarView = 'all'
        }
    }
    _buildSet(days) {
        const howManySessions = this.stateManager.get(Steps.howManySessions)
        const startTime = this.stateManager.get(Steps.startDate)?.time
        const location = this.stateManager.get(Steps.location)

        /* TODO: create localised time_of_day_note from startDate and startTime */
        const trainingSchedule = {
            location_note: location || '',
            time_of_day_note: startTime || '',
        }

        let prefix = ''
        if (howManySessions === '10') {
            prefix = 'set_a_'
        }
        if (howManySessions === '20') {
            prefix = 'set_b_'
        }
        if (howManySessions === '5') {
            prefix = 'set_c_'
        }

        const sortedDays = days.sort()
        sortedDays.forEach((day, i) => {
            const numberString = i < 10 ? `0${i}` : `${i}`
            trainingSchedule[prefix + numberString] = DateTime.fromISO(day).toSeconds()
        });

        this.trainingSchedule = trainingSchedule
    }

    _handleCreate() {
        const howManySessions = this.stateManager.get(Steps.howManySessions)
        if (this.selectedDays.length !== Number(howManySessions)) {
            this.errorMessage = this.t.incorrect_number_of_sessions
            setTimeout(() => {
                this.errorMessage = ''
            }, 3000)
            return
        }
        const postData = {
            user_id: jsObject.profile.user_id,
            contact_id: jsObject.profile.contact_id,
            title: `${jsObject.profile.name}`,
            set: this._buildSet(this.selectedDays)
        }

        this.loading = true
        makeRequest( 'POST', 'plan', postData, 'zume_system/v1' )
            .then((data) => {
                console.log(data)
                this._handleFinish()
            })
            .fail((error) => {
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    _handleFinish() {
        this._sendLoadWizardEvent(Wizards.inviteFriends)
    }

    isForIntensive() {
        const howManySessions = this.stateManager.get(Steps.howManySessions)

        return howManySessions === '5'
    }

    toggleView() {
        if (this.scheduleView === 'calendar') {
            this.scheduleView = 'list'
        } else {
            this.scheduleView = 'calendar'
        }
    }

    selectDate(event) {
        const day = event.detail

        if (this.selectedDays.includes(day)) {
            const index =  this.selectedDays.indexOf(day)
            this.selectedDays = [
                ...this.selectedDays.slice(0, index),
                ...this.selectedDays.slice(index + 1)
            ]
        } else {
            this.selectedDays = [...this.selectedDays, day]
        }
    }

    _clearCalendar() {
        this.selectedDays = []
    }

    render() {
        const howManySessions = Number( this.stateManager.get(Steps.howManySessions) )
        let progressText = ''
        let progressColor = ''
        if (this.selectedDays.length < howManySessions) {
            progressText = this.t.x_of_total_selected.replace('%1$s', this.selectedDays.length).replace('%2$s', howManySessions)
            progressColor = 'var(--z-brand-light)'
        }
        if ( this.selectedDays.length === howManySessions ) {
            progressText = this.t.all_selected.replace('%s', howManySessions)
            progressColor = 'var(--z-success)'
        }
        if ( this.selectedDays.length > howManySessions ) {
            progressText = this.t.too_many_selected.replace('%s', this.selectedDays.length - howManySessions)
            progressColor = 'var(--z-error-main)'
        }

        return html`
            <div class="stack-1 position-relative">
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
                ${this.variant === Steps.name ? html`
                    <div class="stack">
                        <span class="zume-start-date brand-light f-7"></span>
                        <h2>${this.t.question_what_is_the_groups_name}</h2>
                        <input type="text" name="name" @change=${this._handleChange} value=${typeof this.state === 'string' ? this.state : ''} />
                        <div class="stack" data-fit-content>
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
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
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howManySessions ? html`
                    <div class="stack">
                        <span class="zume-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_which_session}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light ${this.state === '20' ? '' : 'outline'}" data-value="20" @click=${this._handleSelection}>${this.t.hour_1_session_20}</button>
                            <button class="btn tight light ${this.state === '10' ? '' : 'outline'}" data-value="10" @click=${this._handleSelection}>${this.t.hour_2_session_10}</button>
                            <button class="btn tight light ${this.state === '5' ? '' : 'outline'}" data-value="5" @click=${this._handleSelection}>${this.t.hour_4_session_5}</button>
                            <button class="btn tight light outline mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.howOften ? html`
                    <div class="stack">
                        <span class="zume-time brand-light f-7"></span>
                        <h2>${this.t.question_how_often}</h2>
                        <div class="stack" data-fit-content>
                            <button class="btn tight light ${this.state === 'weekly' ? '' : 'outline'}" data-value="weekly" @click=${this._handleSelection}>${this.t.weekly}</button>
                            <button class="btn tight light ${this.state === 'biweekly' ? '' : 'outline'}" data-value="biweekly" @click=${this._handleSelection}>${this.t.biweekly}</button>
                            <button class="btn tight light ${this.state === 'monthly' ? '' : 'outline'}" data-value="monthly" @click=${this._handleSelection}>${this.t.monthly}</button>
                            <button class="btn tight light ${this.state === 'other' ? '' : 'outline'}" data-value="other" @click=${this._handleSelection}>${this.t.other}</button>
                            <button class="btn tight light outline mt-2" @click=${this._handleDone}>${this.t.next}</button>
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
                            <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                ` : ''}
                ${this.variant === Steps.review ? html`
                    <div class="stack">
                        <h2><span class="zume-overview brand-light"></span> ${this.t.review_training}</h2>
                        <div class="make-training-wizard__progress-overview">
                            <span>${progressText}</span>
                            <progress-slider
                                class="grow-1 mt--3"
                                percentage=${this.selectedDays.length / howManySessions * 100}
                                style="--primary-color: ${progressColor}"
                            ></progress-slider>
                        </div>
                        ${
                            this.isForIntensive()
                                ? ''
                                : html`<button class="btn light tight" @click=${this.toggleView}>${this.scheduleView === 'calendar' ? 'list' : 'calendar'}</button>`
                        }
                        ${
                            this.scheduleView === 'calendar'
                                ? html`
                                    <calendar-select
                                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                                        startDate=${this.calendarStart}
                                        endDate=${this.calendarEnd}
                                        .selectedDays=${this.selectedDays}
                                        view=${this.calendarView}
                                        showToday
                                        @day-selected=${this.selectDate}
                                    ></calendar-select>
                                ` : html`
                                    <calendar-list
                                        @day-selected=${this.selectDate}
                                    ></calendar-list>
                                `
                        }
                        <div class="sticky bottom-0 stack">
                            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
                            <div class="cluster">
                                <button
                                    class="btn outline small tight fit-content"
                                    @click=${this._clearCalendar}
                                >
                                    ${this.t.clear_calendar}
                                </button>
                                <button
                                    class="btn tight light ms-auto"
                                    @click=${this._handleCreate}
                                >
                                    ${this.t.create}
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
                ${this.variant !== Steps.planDecision ? html`
                    <review-steps
                        .t=${this.t}
                        name=${this.stateManager.get(Steps.name)}
                        howManySessions=${this.stateManager.get(Steps.howManySessions)}
                        howOften=${this.stateManager.get(Steps.howOften)}
                        time=${this.stateManager.get(Steps.startDate)?.time}
                        date=${this.stateManager.get(Steps.startDate)?.date}
                        whatLocation=${this.stateManager.get(Steps.location)}
                        .display=${this.completedSteps}
                    ></review-steps>
                ` : ''}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('make-training', MakeTraining);
