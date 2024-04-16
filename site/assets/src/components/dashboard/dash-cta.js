import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class DashCta extends LitElement {
    static get properties() {
        return {
            ctas: { type: Array, attribute: false },
        };
    }

    constructor() {
        super()
        this.ctas = []

        this.getCtas = this.getCtas.bind(this)
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('ctas:changed', this.getCtas)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('ctas:changed', this.getCtas)
    }
    firstUpdated() {
        this.getCtas()
    }

    getCtas() {
        this.ctas = jsObject.ctas ?? []
    }

    renderCta({ content, content_template }) {
        if (content_template === 'card') {
            return html`
                <div class="stack | card cta">
                    <h2 class="h5 text-center">${content.title}</h2>
                    <p>${content.description}</p>
                    <a href="${content.link}" class="btn light uppercase">${content.link_text}</a>
                </div>
            `
        }
        if (content_template === 'celebration') {
            return html`
                <div class="stack | card celebration">
                    <h2 class="h5 text-center bold">${content.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                        <img src="${content.imageUrl}" alt="" />
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                    </div>
                    <p>${content.description}</p>
                </div>
            `
        }
    }

    render() {
        return html`
            <div class="stack">
                ${repeat(this.ctas, (cta) => cta.key, this.renderCta)}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-cta', DashCta);
