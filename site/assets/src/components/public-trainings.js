import { LitElement, html } from 'lit'
import {
    zumeAttachObservers,
    zumeDetachObservers,
} from '../js/zumeAttachObservers'
import { zumeRequest } from '../js/zumeRequest'
import { DateTime } from 'luxon'

export class PublicTrainings extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            /**
             * Join link
             *
             * If provided, will be used as the href of the link to join that is in the table.
             * If not provided, this component will just emit an event with details of the training selected
             */
            joinLink: { type: String },
            notifyUrl: { type: String },
            notifyMeOpen: { type: Boolean, attribute: false },
            loading: { attribute: false },
            plans: { attribute: false },
        }
    }

    constructor() {
        super()

        this.loading = true
        this.plans = []
        this.notifyUrl = ''
        this.notifyMeOpen = false
        this.getTrainings()

        this.renderRow = this.renderRow.bind(this)
    }

    updated(changedProperties) {
        if (changedProperties.has('loading')) {
            zumeDetachObservers(this.renderRoot, 'public-trainings')
            zumeAttachObservers(this.renderRoot, 'public-trainings')
        }
    }

    getTrainings() {
        zumeRequest
            .post('public_plans', {})
            .then((plans) => {
                this.plans = plans
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.loading = false
            })
    }

    _handleNotifyMe() {
        this.notifyMeOpen = !this.notifyMeOpen
    }

    render() {
        if (this.loading) {
            return html`<span class="loading-spinner active"></span>`
        }

        if (this.plans.length === 0) {
            return html` <p>${this.t.no_plans}</p> `
        }

        return html`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.session}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    ${this.plans.map(this.renderRow)}
                </tbody>
            </table>
            <button class="btn" @click=${this._handleNotifyMe}>
                ${this.t.notify_of_future_trainings_button}
            </button>
            <div class="zume-collapse" ?data-expand=${this.notifyMeOpen}>
                <h3>${this.t.notify_of_future_trainings_title}</h3>
                <p>${this.t.notify_of_future_trainings_description}</p>
                <p>${this.t.notify_of_future_trainings_unsubscribe}</p>
                <a
                    href=${this.notifyUrl}
                    class="btn large uppercase fit-content mx-auto"
                >
                    ${this.t.notify_me}
                </a>
            </div>
        `
    }

    renderRow({
        join_key,
        language_note,
        post_title,
        time_of_day_note,
        time_of_day,
        next_session_date,
        current_session,
        total_sessions,
        timezone_note,
    }) {

        return html`
            <tr>
                <td data-label="${this.t.name}">${post_title}</td>
                <td data-label="${this.t.session}">
                    ${current_session} / ${total_sessions}
                </td>
                <td data-label="${this.t.next_date}">${next_session_date}</td>
                <td data-label="${this.t.start_time}">${time_of_day || time_of_day_note}</td>
                <td data-label="${this.t.timezone}">${timezone_note}</td>
                <td data-label="${this.t.language}">${language_note}</td>
                <td>
                    <button
                        class="btn"
                        data-code=${join_key}
                        @click=${this._handleJoinTraining}
                    >
                        ${this.t.join}
                    </button>
                </td>
            </tr>
        `
    }

    _handleJoinTraining(event) {
        const code = event.target.dataset.code

        const training = this.plans.find(plan => plan.join_key === code)

        const chosenTrainingEvent = new CustomEvent('chosen-training', {
            bubbles: true,
            detail: { code, training },
        })
        this.dispatchEvent(chosenTrainingEvent)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('public-trainings', PublicTrainings)
