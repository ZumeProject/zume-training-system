import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board';
import { DashPage } from './dash-page';

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            loading: { type: Boolean, attribute: false },
            sessions: { type: Array, attribute: false },
            filterStatus: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = false
        this.route = DashBoard.getRoute('my-training')

        this.sessions = [
            {
                id: 'set_a_01',
                name: 'Session 1',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_02',
                name: 'Session 2',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_03',
                name: 'Session 3',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_04',
                name: 'Session 4',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_05',
                name: 'Session 5',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_06',
                name: 'Session 6',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_07',
                name: 'Session 7',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_08',
                name: 'Session 8',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_09',
                name: 'Session 9',
                datetime: 1712077989881,
            },
            {
                id: 'set_a_10',
                name: 'Session 10',
                datetime: 1712077989881,
            },

        ]
        this.renderListItem = this.renderListItem.bind(this)
    }

    firstUpdated() {
        super.firstUpdated()
    }

    editSession(id) {}

    updated() {
        jQuery(document).foundation();
    }

    renderListItem(session) {
        const { id, name, datetime } = session
        return html`
            <li class="list__item | switcher | switcher-width-30">
                <span>${name}</span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        Date: ${(new Date(datetime))}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editSession(id)}><span class="icon zume-pencil"></span>${jsObject.translations.edit_time}</button></li>
                    </ul>
                </div>
            </li>

        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                    ${
                        this.showTeaser
                        ? html`
                            <p>Start or join a training to get access to your trainings here</p>
                        `
                        : html`
                            <ul class="list">
                                ${
                                    !this.loading && this.sessions && this.sessions.length > 0
                                    ? repeat(this.sessions, (session) => session.id, this.renderListItem)
                                    : ''
                                }
                            </ul>
                        `
                    }
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings', DashTrainings);
