import { LitElement, html } from "lit"
import { live } from 'lit/directives/live.js';

export class CompleteProfile extends LitElement {
    static get properties() {
        return {
            /**
             * The step name
             */
            name: { type: String },
            /**
             * The module name that this step is part of
             */
            module: { type: String },
            /**
             * Is this step skippable
             */
            skippable: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
            /**
             * What inputs to display
             */
            variant: { type: String },
            locations: { attribute: false },
            locationError: { attribute: false },
            city: { attribute: false },
            loading: { attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.variant = ''
        this.t = {}
        this.locations = []
        this.locationError = ''
        this.city = ''
        this.loading = false

        this._clearLocations = this._clearLocations.bind(this)
        this._handleSuggestions = this._handleSuggestions.bind(this)
        this._debounceCityChange = debounce(getAddressSuggestions(this._handleSuggestions, zumeProfile.map_key)).bind(this)
        this._handleCityInputChange = this._handleCityInputChange.bind(this)
    }

    firstUpdated() {
        this.renderRoot.querySelector('.inputs input').focus()
    }

    render() {
        return html`
        <form class="inputs">
            ${ this.variant === 'name' ? html`
                <h2 class="f-1">${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" @change=${this._handleNameChange}>
                </div>
            ` : ''}

            ${ this.variant === 'phone' ? html`
                <h2 class="f-1">${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange}>
                </div>
            ` : ''}

            ${ this.variant === 'location' ? html`
                <h2 class="f-1">${this.t.location_question}</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${live(this.city)}"
                        @input=${this._handleCityChange}
                    >
                </div>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map((location) => {
                        return html`
                            <div
                                class="address-result"
                                id="${location.id}"
                                data-place-name=${location.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${location.place_name}
                            </div>
                        `
                    })}
                </div>
            ` : '' }
            ${ [ 'phone', 'name' ].includes(this.variant) ? html`
                <div class="cluster">
                    <button class="btn" @click=${this._handleDone} ?disabled=${this.loading}>${this.t.done}</button>
                    <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                </div>
            ` : '' }
        </form>
        `
    }

    _handleDone(event) {
        if (event) {
            event.preventDefault()
        }

        const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
        this.dispatchEvent(doneStepEvent)
    }

    _handleNameChange(event) {
        event.stopPropagation()

        const updates = {
            [event.target.name]: event.target.value,
        }

        this._updateProfile(updates)
    }

    _handlePhoneChange(event) {
        event.stopPropagation()

        const updates = {
            [event.target.name]: event.target.value,
        }

        this._updateProfile(updates)
    }

    _handleCityChange(event) {
        this._handleCityInputChange(event)
        this._debounceCityChange(event)
    }

    _handleCityInputChange(event) {
        this.city = event.target.value
    }

    _handleSuggestions(data) {
        if (data.features.length < 1) {
            this.locationError = this.t.no_locations_found
        }

        this.locations = data.features
    }

    _handleLocationSelection(event) {
        this.city = event.target.dataset.placeName

        const updates = {
            location_grid_meta: getLocationGridFromMapbox(event.target.id, zumeProfile.profile.location),
        }

        this._updateProfile(updates, () => {
            this._clearLocations()
            this._handleDone()
        })


    }

    _updateProfile(updates, successCallback) {
        /* Update the profile using the api */
        this.loading = true

        fetch( jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(updates),
            headers: {
                'X-WP-Nonce': jsObject.nonce
            }
        } )
        .then(() => {
            console.log('success')
            successCallback()
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            this.loading = false
        })
    }

    _clearLocations() {
        this.locations = []
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'complete-profile', CompleteProfile )