import { LitElement, html } from "lit"
import { WizardStateManager } from "./wizard-state-manager"
import { Modules } from "./wizard-constants"
import { Steps } from "./wizard-constants"

/**
 * Component for confirming a training
 */
export class ConfirmTraining extends LitElement {
    static get properties() {
        return {
            t: { type: Object },
            training: { type: Object, attribute: false },
        }
    }

    constructor() {
        super()
        this.t = {}

        this.training = {}
    }

    firstUpdated() {
        const stateManager = WizardStateManager.getInstance(Modules.joinTraining)
        const data = stateManager.get(Steps.confirmPlan)

        this.training = data.training
    }

    sendDoneStepEvent() {
        const event = new CustomEvent('done-step', { bubbles: true })
        this.dispatchEvent(event)
    }

    render() {
        if (!this.training || Object.keys(this.training).length === 0) {
            return html`
                <span class="loading-spinner active"></span>
            `
        }

        return html`
            <h2 class="h3 brand-light text-center">${this.training.title}</h2>
            <p class="text-center">${this.training.description}</p>
            <table class="table center">
                <tbody>
                    <tr>
                        <td class="f-medium">${this.t.facilitator}:</td>
                        <td>${this.training.post_author_display_name}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.location}:</td>
                        <td>${this.training.location_note}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.time_of_day}:</td>
                        <td>${this.training.time_of_day_note}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.timezone}:</td>
                        <td>${this.training.timezone_note}</td>
                    </tr>

                    <tr>
                        <td class="f-medium">${this.t.session}:</td>
                        <td>${this.training.current_session} / ${this.training.total_sessions}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.next_session_date}:</td>
                        <td>${this.training.next_session_date}</td>
                    </tr>
                </tbody>
            </table>
            <p class="text-center">${this.t.complete_profile}</p>
            <button class="btn" @click=${this.sendDoneStepEvent}>${this.t.join_training}</button>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'confirm-training', ConfirmTraining )
