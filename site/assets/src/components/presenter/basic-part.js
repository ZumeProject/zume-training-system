import { LitElement, html } from 'lit';

export class BasicPart extends LitElement {
    static get properties() {
        return {
            part: { type: Object},
        };
    }

    render() {
        const t = this.part.t ?? null
        const d = this.part.d ?? null
        const info = this.part.info ?? null

        return html`
            ${t !== null ? html`<h3 class="brand">${t}</h3>` : ''}
            ${d !== null ? html`<p>${d}</p>` : ''}
            ${info !== null ? html`<p>${info}</p>` : ''}
        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('basic-part', BasicPart);
