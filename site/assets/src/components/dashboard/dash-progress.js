import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';

export class DashProgress extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            commitments: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = false
        this.route = DashBoard.getRoute('my-progress')
        this.filterName = 'my-progress-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)

        this.renderListItem = this.renderListItem.bind(this)
        this.closeInfoModal = this.closeInfoModal.bind(this)
    }

    firstUpdated() {
        const status = this.filterStatus || ''
    }

    updated() {
        jQuery(document).foundation();
    }

    openInfoModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('open')
    }

    closeInfoModal() {
        const modal = document.querySelector('#new-commitments-form')
        jQuery(modal).foundation('close')
    }

    filterProgress(status) {
        this.filterStatus = status
        /* Reorder progress */
        ZumeStorage.save(this.filterName, status)
        this.closeFilter()
    }

    closeFilter() {
        const menu = this.querySelector('#filter-menu')
        jQuery(menu).foundation('close')
    }

    closeMenu(id) {
        const menu = this.querySelector(`#kebab-menu-${id}`)
        jQuery(menu).foundation('close')
    }

    renderListItem(courseElement) {
        const { question, answer, id, status } = courseElement
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
                        <li class="hidden"><button class="menu-btn" @click=${() => this.editCommitment(id)}><span class="icon zume-pencil"></span>${zumeDashboard.translations.edit}</button></li>
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
                    <div class="dashboard__title">
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <button class="icon-btn f-2" data-toggle="filter-menu">
                            <span class="visually-hidden">${zumeDashboard.translations.filter}</span>
                            <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                        </button>
                        <button class="icon-btn f-2" @click=${this.openInfoModal}>
                            <span class="visually-hidden">${zumeDashboard.translations.progress_info}</span>
                            <span class="icon zume-info brand-light" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'open' ? 'selected' : ''}" @click=${() => this.filterProgress('open')}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${zumeDashboard.translations.active}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__header right">
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                    ${
                        html`
                            <ul class="list">
                                ${
                                    this.commitments && this.commitments.length > 0
                                    ? repeat(this.commitments, (commitment) => commitment.id, this.renderListItem)
                                    : ''
                                }
                            </ul>
                        `
                    }

                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button">
                        <img src=${`${zumeDashboard.images_url}/close-button-01.svg`} alt="close button">
                </button>
                <div id="pieces-content" class="stack">
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-progress', DashProgress);
