import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'

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

    updated() {
        jQuery(document).foundation();
    }

    fetchCommitments() {
        makeRequest('GET', 'commitments', { status: '' }, 'zume_system/v1' )
            .done( ( data ) => {
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

    deleteCommitment(id) {
        let data = {
            id: id,
            user_id: zumeDashboard.user_profile.user_id
        }
        makeRequest('DELETE', 'commitment', data, 'zume_system/v1' ).done( ( data ) => {
            this.closeMenu(id)
            this.fetchCommitments()
        })
    }

    editCommitment(id) {
        console.log(id)
    }

    closeMenu(id) {
        const menu = this.querySelector(`#kebab-menu-${id}`)
        jQuery(menu).foundation('close')
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
                                    @click=${() => this.completeCommitment(id)}
                                >
                                    ${zumeDashboard.translations.done}
                                </button>
                            `
                        }
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editCommitment(id)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${() => this.deleteCommitment(id)}><span class="icon zume-trash"></span>${zumeDashboard.translations.delete}</button></li>
                    </ul>
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
                                        ? repeat(this.commitments, (commitment) => commitment.id, this.renderListItem)
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
