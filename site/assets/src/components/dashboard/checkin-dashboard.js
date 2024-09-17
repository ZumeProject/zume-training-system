import { LitElement, html } from 'lit';

export class CheckinDashboard extends LitElement {
    static get properties() {
        return {
            error: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()
        this.error = false
        this.getSessionNumber()
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
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('checkin-dashboard', CheckinDashboard);
