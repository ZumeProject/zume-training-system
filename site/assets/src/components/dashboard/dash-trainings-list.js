import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board'
import { RouteNames } from './routes'
import { Wizards } from '../wizard/wizard-constants'
import { zumeAttachObservers } from '../../js/zumeAttachObservers'

export class DashTrainingsList extends LitElement {
    static get properties() {
        return {
            activeTrainingGroups: { type: Object, attribute: false },
            inactiveTrainingGroups: { type: Object, attribute: false },
            inactiveTrainingGroupsOpen: { type: Boolean, attribute: false },
        }
    }

    constructor() {
        super()
        this.activeTrainingGroups = jsObject.active_training_groups
        this.inactiveTrainingGroups = jsObject.inactive_training_groups
        this.routeName = RouteNames.myTrainings
        this.route = DashBoard.getRoute(this.routeName)
        this.inactiveTrainingGroupsOpen = true
    }

    firstUpdated() {
        zumeAttachObservers(this.renderRoot, 'dash-trainings-list')
    }

    makeTrainingHref(code) {
        const routes = DashBoard.routes

        const route = routes.find(({ name }) => name === RouteNames.myTraining)

        return route.pattern.replace(':code', code)
    }
    createTraining() {
        this.dispatchEvent(
            new CustomEvent('open-wizard', {
                bubbles: true,
                detail: { type: Wizards.planDecision },
            })
        )
    }

    toggleInactiveTrainingGroups() {
        this.inactiveTrainingGroupsOpen = !this.inactiveTrainingGroupsOpen
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
                    <div class="">
                        <button
                            class="btn brand-light tight"
                            aria-label=${jsObject.translations
                                .create_training_group}
                            @click=${this.createTraining}
                        >
                            ${jsObject.translations.new}
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    <div class="stack">
                        <h2 class="h4">${jsObject.translations.active}</h2>
                        ${repeat(
                            this.activeTrainingGroups,
                            ({ key }) => key,
                            (group) => html`
                                <training-link
                                    as="nav"
                                    text=${group.title}
                                    href=${this.makeTrainingHref(
                                        group.join_key
                                    )}
                                ></training-link>
                            `
                        )}
                        ${
                            this.inactiveTrainingGroups.length > 0 ? html`
                                <h2 class="h4" @click=${this.toggleInactiveTrainingGroups}>${jsObject.translations.inactive}</h2>
                                <div class="zume-collapse" ?data-expand=${this.inactiveTrainingGroupsOpen}>
                                  ${repeat(this.inactiveTrainingGroups,({ key }) => key,(group) => html`
                                      <training-link
                                          as="nav"
                                          text=${group.title}
                                          href=${this.makeTrainingHref(
                                              group.join_key
                                          )}
                                      ></training-link>
                                      `
                                  )}
                                </div>
                        ` : ''}
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings-list', DashTrainingsList)
