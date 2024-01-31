import { LitElement, html } from 'lit';

export class DashPlans extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            commitments: { type: Array, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = true

        this.renderListItem = this.renderListItem.bind(this)
    }

    firstUpdated() {
        this.fetchCommitments()
    }

    fetchCommitments() {
        makeRequest('GET', 'commitments', { status: '' }, 'zume_system/v1' )
            .done( ( data ) => {
                console.log(this)
                console.log(data)
                this.commitments = data
            })
            .always(() => {
                this.loading = false
            })
    }

    completeCommitment(id) {

        let data = {
            id: id,
            user_id: zumeDashboard.user_profile.user_id
        }
        makeRequest('PUT', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.fetchCommitments()
        })
    }

    renderList() {
        return this.commitments.map(this.renderListItem)
    }

    renderListItem(commitment) {
        const { question, answer, id, status } = commitment
        return html`
            <li class="list__item">
                <span>${question} <b>${answer}</b></span>
                <div class="list__secondary">
                    <div class="d-flex w-6rem justify-content-center">
                        ${status === 'closed'
                            ? html`<span class="icon zume-check-mark success"></span>`
                            : html`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    data-id=${id}
                                    @click=${() => this.completeCommitment(id)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `
                        }
                    </div>
                    <button class="icon-btn">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Plans</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                    ${
                        this.loading
                            ? html`<span class="loading-spinner active"></span>`
                            : html`
                                <ul class="list">
                                    <li class="list__item">
                                        <h2 class="f-1">I will</h2>
                                    </li>
                                    ${
                                        !this.loading && this.commitments && this.commitments.length > 0
                                        ? this.renderList()
                                        : ''
                                    }
                                </ul>
                            `
                    }

                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-plans', DashPlans);
