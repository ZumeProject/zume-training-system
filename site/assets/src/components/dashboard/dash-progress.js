import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';

export class DashProgress extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean, attribute: false },
            filteredItems: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.loading = false
        this.route = DashBoard.getRoute('my-progress')

        this.trainingItems = zumeDashboard.training_items
        this.hostProgress = zumeDashboard.host_progress
        this.filteredItems = [ ...this.trainingItems ]

        this.filterName = 'my-progress-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)



        this.renderListItem = this.renderListItem.bind(this)
        this.closeInfoModal = this.closeInfoModal.bind(this)
    }

    firstUpdated() {
        /* Get user HOST progress */
        this.loading = true
        makeRequest('GET', 'host', { user_id: zumeDashboard.user_profile.user_id }, 'zume_system/v1' )
            .done( ( data ) => {
                console.log(data)
                this.loading = false
            })
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

    renderListItem(trainingItem) {
        const { title, host } = trainingItem
        return html`
            <li class="list__item tight">
                <span class="bold">${title}</span>
                <div class="list__secondary">
                    <div class="training-progress">
                        <button data-subtype=${host[0].subtype} class=${this.hostProgress.list[host[0].key] ? 'active' : ''}>
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button data-subtype=${host[1].subtype} class=${this.hostProgress.list[host[1].key] ? 'active' : ''}>
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button data-subtype=${host[2].subtype} class=${this.hostProgress.list[host[2].key] ? 'active' : ''}>
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button data-subtype=${host[3].subtype} class=${this.hostProgress.list[host[3].key] ? 'active' : ''}>
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
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
                                    repeat(this.filteredItems, (trainingItem) => trainingItem.key, this.renderListItem)
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
