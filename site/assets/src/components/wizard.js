import { LitElement, html } from "lit"

console.log('wizard file')

export class Wizard extends LitElement {
    static get properties() {
        return {
            /**
             * The wizard type
             */
            type: { type: String }
        }
    }

    constructor() {
        super()
    }

    render() {
        return html`
        <div class="stack | s5">
            <h1>Wizard</h1>
            <h2>Type: ${this.type}</h2>
        </div>
        `
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}

window.customElements.define( 'zume-wizard', Wizard )