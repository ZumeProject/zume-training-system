import { LitElement, html } from 'lit'
import { navigator } from 'lit-element-router'

export class NavLink extends navigator(LitElement) {
    static get properties() {
        return {
            href: { type: String },
            class: { type: String },
            as: { type: String },
            locked: { type: Boolean },
            completed: { type: Boolean },
            disableNavigate: { type: Boolean },
            active: { type: Boolean },
            icon: { type: String },
            text: { type: String },
            explanation: { type: String },
            noRenderText: { type: Boolean },
            targetBlank: { type: Boolean, attribute: 'target-blank' },
        }
    }

    constructor() {
        super()
        this.href = ''
        this.class = ''
        this.as = ''
        this.icon = ''
        this.text = ''
        this.explanation = ''
        this.locked = false
        this.completed = false
        this.disableNavigate = false
        this.active = false
    }

    handleClick(event, isListLink = false) {
        if (this.as === 'nav') {
            event.preventDefault()
            this.navigate(this.href)
        }
        if (this.as === 'link' && isListLink) {
            window.open(this.href, '_blank')
            return
        }
        if (this.as === 'link') {
            return
        }
        if (this.as === 'button') {
            event.preventDefault()
        }
    }

    printBool(bool) {
        return bool ? 'true' : 'false'
    }

    render() {
        return html`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.completed}
                target=${this.targetBlank ? '_blank' : '_self'}
                ?data-completed=${this.completed}
                ?data-locked=${this.locked}
                ?data-active=${this.active}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('nav-link', NavLink)
