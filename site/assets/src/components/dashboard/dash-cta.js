import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class DashCta extends LitElement {
    static get properties() {
        return {
            ctas: { type: Array, attribute: false },
        };
    }

    static FADE_TIMEOUT = 3000
    static TRANSITION_TIMEOUT = 500
    static MAX_CTAS = 3

    constructor() {
        super()
        this.allCtas = []
        this.ctas = []

        this.hiddenCtaKeys = []
        this.celebrationKeys = []

        this.manageCtas = this.manageCtas.bind(this)
        this.transitionCelebrations = this.transitionCelebrations.bind(this)
        this.removeCelebrations = this.removeCelebrations.bind(this)
        this.renderCta = this.renderCta.bind(this)
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('ctas:changed', this.manageCtas)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('ctas:changed', this.manageCtas)
    }
    firstUpdated() {
        this.manageCtas()
    }

    manageCtas() {
        const allCtas = this.getCtas()

        const celebrations = allCtas.filter(({content_template}) => content_template === 'celebration')

        if ( celebrations.length > 0 ) {
            this.ctas = allCtas.slice(0, DashCta.MAX_CTAS + celebrations.length)
            this.hiddenCtaKeys = allCtas.slice(DashCta.MAX_CTAS).map(({key}) => key)

            celebrations.forEach(({key}) => {
                this.celebrationKeys.push(key)
            })

            this.timeout = setTimeout(this.transitionCelebrations, DashCta.FADE_TIMEOUT)
        }

        this.allCtas = allCtas
    }
    getCtas() {
        return jsObject.allCtas ?? []
    }
    transitionCelebrations() {
        const celebrationElements = this.getCtaElements(this.celebrationKeys)
        celebrationElements.forEach((element) => {
            element.style.height = element.clientHeight + 'px'
            setTimeout(() => {
                element.classList.add('transition-out')
                element.style.height = ''
            }, 10)
        })
        const hiddenCtaElements = this.getCtaElements(this.hiddenCtaKeys)
        hiddenCtaElements.forEach((element) => {
            element.classList.remove('hiding')
            element.classList.add('showing')
        })
        setTimeout(this.removeCelebrations, DashCta.TRANSITION_TIMEOUT)
    }
    getCtaElements(keys) {
        return this.renderRoot.querySelectorAll(keys.map((key) => `[data-key="${key}"]`).join(','))
    }
    removeCelebrations() {
        this.ctas = this.ctas.filter(({content_template}) => content_template !== 'celebration')
    }

    renderCta({ content, content_template, key }) {
        const classes = this.hiddenCtaKeys.includes(key) ? 'hiding' : 'showing'
        if (content_template === 'card') {
            return html`
                <div class="stack | card cta ${classes}" data-key=${key} style="--duration: ${DashCta.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${content.title}</h2>
                    <p>${content.description}</p>
                    <a href="${content.link}" class="btn light uppercase">${content.link_text}</a>
                </div>
            `
        }
        if (content_template === 'celebration') {
            return html`
                <div class="stack | card celebration ${classes}" data-key=${key} style="--duration: ${DashCta.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${content.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                        <img src="${content.image_url}" alt="" />
                        <img src="${jsObject.images_url + '/fireworks-2.svg'}" alt="" />
                    </div>
                    <p>${content.description}</p>
                </div>
            `
        }
    }

    render() {
        return html`
            <div class="stack-margin-bottom">
                ${repeat(this.ctas, (cta) => cta.key, this.renderCta)}
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-cta', DashCta);
