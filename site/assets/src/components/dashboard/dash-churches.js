import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'
import { DashPage } from './dash-page';
import { DashBoard } from './dash-board';
import { zumeRequest } from '../../js/zumeRequest';

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
        this.addChurch = this.addChurch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        document.querySelectorAll('.reveal-overlay #new-church-form').forEach((element) => {
            element.parentElement.remove()
        })
    }

    firstUpdated() {
        super.firstUpdated()
        const addChurchForm = document.querySelector('#add-church-form')

        addChurchForm.addEventListener('submit', this.handleSubmit)
    }
    updated() {
        jQuery(this.renderRoot).foundation();
    }

    joinCommunity() {
        zumeRequest.post( 'log', { type: 'practicing', subtype: 'join_community' } ).then( ( data ) => {
            const stateEvent = new CustomEvent('user-state:change', { bubbles: true })
            this.dispatchEvent(stateEvent)
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.addChurch()
    }
    addChurch() {

        const newId = this.churches.length + 1
        const newChurches = [
            {
                id: newId,
                name: 'This is a new church',
                location: 'Birmingham, UK',
                depth: 0,
            },
            {
                id: `${newId}-1`,
                name: 'Tea Shop 1',
                location: 'Birmingham, UK',
                parent: newId,
                depth: 1,
            },
            {
                id: `${newId}-2`,
                name: 'Tea Shop 2',
                location: 'Birmingham, UK',
                parent: newId,
                depth: 1,
            },
            {
                id: `${newId}-2-1`,
                name: 'Tea Shop 2 child',
                location: 'Birmingham, UK',
                parent: `${newId}-2`,
                depth: 2,
            },
            {
                id: `${newId}-3`,
                name: 'Breakfast Shop',
                location: 'Birmingham, UK',
                parent: newId,
                depth: 1,
            },
        ]

        this.churches = [...this.churches, ...newChurches]

        this.closeChurchModal()
    }
    editChurch(id) {
        console.log('edit church', id)
    }
    deleteChurch(id) {
        console.log('delete church', id)
    }

    openChurchModal() {
        if (this.showTeaser) {
            return
        }
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('open')
    }

    closeChurchModal() {
        const modal = document.querySelector('#new-church-form')
        jQuery(modal).foundation('close')
        this.clearChurchModal()
    }
    clearChurchModal() {
        jQuery('#add-church-form input').each(function(value) {
            this.value = ''
        })
    }

    renderChurch({id, name, location, depth }) {
        return html`
            <li
                class="list__item"
                data-depth=${depth}
                style=${`--depth: ${depth}`}
            >
                <div class="list__primary f-medium" data-large-gap>
                    <span>${name}</span>
                    <span>${location}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${id}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${id}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${() => this.editChurch(id)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${() => this.deleteChurch(id)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
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
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser ? 'true' : 'false'}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl ? 'right' : 'left'} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content p-2">
                    ${
                        this.showTeaser
                        ? html`
                            <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">My Churches are Locked</h3>
                                    <p>My Churches tool makes it easy for you to track your simple church and the simple church generations that grow out of your spiritual family.</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.join}
                                  </button>
                                </div>
                            </div>

                        `
                        : html`
                            <ul class="list">
                                ${
                                    this.churches.length === 0
                                    ? html`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.addChurch}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `
                                    : repeat(this.churches, (church) => `${church.id}`, this.renderChurch)
                                }
                            </ul>

                        `
                    }
                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearChurchModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <h2>${jsObject.translations.my_churches}</h2>
                    <div id="add-church-form">
                        <div>
                            <label for="church-name">${jsObject.translations.church_name}</label>
                            <input id="church-name" name="church-name" type="text" />
                        </div>
                        <div>
                            <label for="number-of-people">${jsObject.translations.number_of_people}</label>
                            <input id="number-of-people" name="number-of-people" type="text" />
                        </div>
                        <div>
                            <label for="church-location">${jsObject.translations.church_location}</label>
                            <input id="church-location" name="church-location" type="text" />
                        </div>
                        <div>
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <input id="parent-church" name="parent-church" type="text" />
                        </div>
                        <div class="cluster">
                            <button class="btn" @click=${this.addChurch}>${jsObject.translations.add_new_church}</button>
                            <button class="btn outline" type="button" @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-churches', DashChurches);
