import { LitElement, html } from 'lit';

export class CheckinDashboard extends LitElement {
    static get properties() {
        return {
            error: { type: Boolean, attribute: false },
            sessionNumber: { type: Number, attribute: false },
        };
    }

    constructor() {
        super()
        this.error = false
        this.getSessionNumber()
    }

    firstUpdated() {
        jQuery(this.renderRoot).foundation();
        if (!this.error) {
            this.showCongratulationsModal()

            setTimeout(() => {
                this.closeCelebrationModal()
            }, 1400)
        }
    }

    showCongratulationsModal() {
        const modal = document.querySelector('#celebration-modal')
        console.log(modal)
        jQuery(modal).foundation('open')
    }
    closeCelebrationModal() {
        const modal = document.querySelector('#celebration-modal')
        jQuery(modal).foundation('close')
    }

    getSessionNumber() {
        const url = new URL(location.href)
        const code = url.searchParams.get('code')

        const sessionKeys = jsObject.session_keys

        const sessionKey = sessionKeys[code] ?? ''

        if (!sessionKey) {
            this.error = true

            return 0
        }

        const keyParts = sessionKey.split('_')
        if (keyParts[1] === 'a') {
            return 10
        }
        if (keyParts[1] === 'b') {
            return 20
        }
        if (keyParts[1] === 'c') {
            return 5
        }
        this.error = true

        return 0
    }

    render() {
        if (this.error) {
            return html`
                <div class="text-center">
                    <h1 class="h2 brand-light mb0">${jsObject.translations.woops}</h1>
                    <hr class="mt0">
                    <p>${jsObject.translations.something_went_wrong}</p>
                    <a href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn ">${jsObject.translations.dashboard}</a>
                </div>
            `
        }
        return html`
            <div class="text-center">
                <p class="my-0">${jsObject.translations.check_off_items}</p>
            </div>

            <div
                class="stack | reveal tiny card celebration showing | border-none"
                id="celebration-modal"
                data-reveal
                data-initial-top
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeCelebrationModal}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">
                    ${jsObject.translations.congratulations}
                </h2>
                <p class="f-medium">
                    ${jsObject.translations.checked_in}
                </p>
                <div class="d-flex align-items-center justify-content-between">
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                    <img
                        class="w-40"
                        src="${jsObject.images_url + '/thumbs-up.svg'}"
                        alt=""
                    />
                    <img
                        class="w-30"
                        src="${jsObject.images_url + '/fireworks-2.svg'}"
                        alt=""
                    />
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('checkin-dashboard', CheckinDashboard);
