import { html } from 'lit';
import { NavLink } from './nav-link'

export class ListLink extends NavLink {
    constructor() {
        super()
    }

    renderText() {
        return this.text.split(' ').map((word) => html`
            <span>${word}</span>
        `)
    }

    getIcon() {
        return this.disabled ? this.icon + '-locked' : this.icon
    }

    render() {
        return html`
            <div
                class="dash-menu__list-item"
                data-disabled=${this.printBool(this.disabled)}
                data-completed=${this.printBool(this.completed)}
            >
                <div class="dash-menu__icon-area | stack--5">
                    <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                    ${this.renderText()}
                </div>
                <span>${this.explanation}</span>
                <a href=${this.href} class="btn ${this.disabled ? 'locked' : 'light'} tight" role="button" @click=${this.handleClick}>
                    ${
                        this.disabled
                            ? zumeDashboard.translations.preview
                            : zumeDashboard.translations.view_now
                    }
                </a>
            </div>
        `
    }
}
customElements.define('list-link', ListLink);
