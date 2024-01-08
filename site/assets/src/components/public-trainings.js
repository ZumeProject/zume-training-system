import { LitElement, html, css } from 'lit';

export class PublicTrainings extends LitElement {
    static get properties() {
        return {
            /**
             * Translation strings
             */
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
    }

    getTrainings() {
        makeRequest( 'POST', 'public_plans', {}, 'zume_system/v1' )
            .then((plans) => {
                this.plans = plans
            })
            .catch((error) => {
                console.log(error)
            })
            .always(() => {
                this.loading = false
            })
    }

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                    ${this.plans.length > 0 ? (
                        this.plans.map(({
                            join_key,
                            language_note,
                            post_title,
                            time_of_day_note,
                            timezone_note,
                        }) => {
                            return html`
                                <tr>
                                    <td>${post_title}</td>
                                    <td>${post_title}</td>
                                    <td>${time_of_day_note}</td>
                                    <td>${timezone_note}</td>
                                    <td>${language_note}</td>
                                    <td><button class="btn">${this.t.join}</button></td>
                                </tr>
                            `
                        })
                    ): html`
                        There are currently no public trainings available.
                    `}
               </tbody>
            </table>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('public-trainings', PublicTrainings);
