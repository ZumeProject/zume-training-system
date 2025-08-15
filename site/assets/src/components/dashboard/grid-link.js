import { html } from 'lit'
import { NavLink } from './nav-link'

export class GridLink extends NavLink {
    constructor() {
        super()

        this.isRtl =
            document.querySelector('html').getAttribute('dir') === 'rtl'
    }

    renderText() {
        console.log('renderText', this.noRenderText)
        if (this.noRenderText) {
            return this.text
        }
        return this.text.split(' ').map((word) => html` <span>${word}</span> `)
    }

    getIcon() {
        return this.locked ? this.icon + '-locked' : this.icon
    }

    render() {
        return html`
            <a
                href=${this.href}
                class="card-btn grid-link position-relative"
                role="button"
                style=${!this.icon ? 'justify-content: center;' : ''}
                target=${this.targetBlank ? '_blank' : '_self'}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
            >
                ${this.icon
                    ? html`<span
                          class="icon ${this.getIcon()} brand-light"
                      ></span>`
                    : ''}
                ${this.renderText()}
                ${this.completed
                    ? html`
                          <span
                              class="z-icon-check-mark f-2 m--3 success absolute bottom ${this
                                  .isRtl
                                  ? 'left'
                                  : 'right'}"
                          ></span>
                      `
                    : ''}
            </a>
        `
    }
}
customElements.define('grid-link', GridLink)
