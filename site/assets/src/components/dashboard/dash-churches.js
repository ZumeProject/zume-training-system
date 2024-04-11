import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashPage } from './dash-page';
import { DashBoard } from './dash-board';

export class DashChurches extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            churches: { type: Array, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.route = DashBoard.getRoute('my-churches')

        this.churches = []

        this.renderChurch = this.renderChurch.bind(this)
    }

    updated() {
        jQuery(document).foundation();
    }

    joinCommunity() {
        makeRequest('POST', 'log', { type: 'system', subtype: 'join_community' }, 'zume_system/v1/' ).done( ( data ) => {
            const stateEvent = new CustomEvent('user-state:change', { bubbles: true })
            this.dispatchEvent(stateEvent)
        })
    }

    addChurch() {
        const newChurch = {
            id: this.churches.length + 1,
            name: 'This is a new church',
            location: 'Birmingham, UK',
        }

        this.churches = [...this.churches, newChurch]
    }
    editChurch(id) {
        console.log('edit church', id)
    }
    deleteChurch(id) {
        console.log('delete church', id)
    }

    renderChurch({id, name, location}) {
        return html`
            <li
                class="list__item"
            >
                <div class="list__primary">
                    <span>${name}</span>
                    <span>${location}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editChurch(id)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${() => this.deleteChurch(id)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.addChurch} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'open' ? 'selected' : ''}" @click=${() => this.filterCommitments('open')}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === 'closed' ? 'selected' : ''}" @click=${() => this.filterCommitments('closed')}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus === '' ? 'selected' : ''}" @click=${() => this.filterCommitments('')}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${
                        this.showTeaser
                        ? html`
                            <p>${jsObject.translations.join_to_access}</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                ${jsObject.translations.join}
                            </button>
                        `
                        : html`
                            <ul class="list">
                                ${
                                    this.churches.length === 0
                                    ? html`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            @click=${this.addChurch}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `
                                    : repeat(this.churches, (church) => church.id, this.renderChurch)
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
customElements.define('dash-churches', DashChurches);
