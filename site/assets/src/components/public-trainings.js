import { LitElement, html, css } from 'lit';
import { zumeRequest } from '../js/zumeRequest';
import { DateTime } from 'luxon';

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
            loading: { attribute: false },
            posts: { attribute: false },
        }
    }

    constructor() {
        super()

        this.loading = true
        this.plans = []

        this.getTrainings()

        this.renderRow = this.renderRow.bind(this)
    }

    getTrainings() {
        zumeRequest.post( 'public_plans', {})
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

    render() {
        if ( this.loading ) {
            return html`<span class="loading-spinner active"></span>`
        }

        if (this.plans.length === 0) {
            return html`
                <p>${this.t.no_plans}</p>
            `
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
        `;
    }

    renderRow ({
        join_key,
        language_note,
        post_title,
        time_of_day_note,
        timezone_note,
        set_type,
        ...fields
    }) {

        let plan_length
        switch (set_type.key) {
            case 'set_a':
                plan_length = 10
                break;
            case 'set_b':
                plan_length = 20
                break;
            case 'set_c':
                plan_length = 5
                break;
            default:
                break;
        }
        const plan_prefix = set_type.key + '_'

        const now = Date.now() / 1000

        let latestPlanDate = ''
        let latestSessionNumber
        for ( let i = 1; i < plan_length + 1; i++ ) {
            const sessionIndex = i < 10 ? `0${i}` : `${i}`;
            const sessionDate = fields[plan_prefix + sessionIndex];
            latestPlanDate = sessionDate['timestamp'];
            latestSessionNumber = i
            if ( now < sessionDate['timestamp'] ) {
                break;
            }
        }

        const formattedDate =  DateTime.fromMillis(latestPlanDate * 1000).toFormat('DD')

        return html`
            <tr>
                <td data-label="${this.t.name}">${post_title}</td>
                <td data-label="${this.t.session}">${latestSessionNumber} / ${plan_length}</td>
                <td data-label="${this.t.next_date}">${formattedDate}</td>
                <td data-label="${this.t.start_time}">${time_of_day_note}</td>
                <td data-label="${this.t.timezone}">${timezone_note}</td>
                <td data-label="${this.t.language}">${language_note}</td>
                <td><button class="btn" data-code=${join_key} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `
    }

    _handleJoinTraining(event) {
        const code = event.target.dataset.code

        const chosenTrainingEvent = new CustomEvent( 'chosen-training', { bubbles: true, detail: { code } } )
        this.dispatchEvent(chosenTrainingEvent)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('public-trainings', PublicTrainings);
