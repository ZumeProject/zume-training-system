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
        return this.locked ? this.icon + '-locked' : this.icon
    }

    render() {
        return html`
            <div
                class="dash-menu__list-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${(event) => this.handleClick(event, true)}
            >
                <div class="dash-menu__icon-area | stack--5">
                    <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                </div>
                <div class="dash-menu__text-area | switcher | switcher-width-20">
                    <div>
                        <h3 class="f-1 bold uppercase">${this.text}</h3>
                        <p>${this.explanation}</p>
                    </div>
                    ${
                        this.completed
                            ? html`
                            <div class="grow-0"><span class="icon z-icon-check-mark grow-0 | dash-menu__list-success"></span></div>
                        `
                        : ''
                    }
                </div>
            </div>
        `
    }
}
customElements.define('list-link', ListLink);
