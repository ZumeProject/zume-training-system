import { LitElement, html } from 'lit';

export class ProfileForm extends LitElement {
    static get properties() {
        return {
            userProfile: { type: Object },
            loading: { type: Boolean, attribute: false },
        };
    }
    constructor() {
        super()
        this.userProfile = {}
    }

    firstUpdated() {
        this.nameInput = this.renderRoot.querySelector('#full_name')
        this.phoneInput = this.renderRoot.querySelector('#phone')
        this.emailInput = this.renderRoot.querySelector('#email')
        this.cityInput = this.renderRoot.querySelector('#city')
        this.prefferedLanguageInput = this.renderRoot.querySelector('#preferred-language')
        this.addressResultsContainer = this.renderRoot.querySelector('#address_results')
    }

    submitProfileForm(e) {
        e.preventDefault()

        const name = this.nameInput.value
        const email = this.emailInput.value
        const phone = this.phoneInput.value
        //const preferred_language = this.prefferedLanguageInput.value

        const data = {
          name,
          phone,
          email,
          //preferred_language,
        }

        data.location_grid_meta = getLocationGridFromMapbox(zumeDashboard.mapbox_selected_id, this.userProfile.location)

        this.loading = true

        /* submit data to profile API endpoint */
        fetch( zumeDashboard.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'X-WP-Nonce': zumeDashboard.nonce
            }
        } )
        .then((response) => response.json())
        .then((profile) => {
            const event = new CustomEvent( 'user-profile:change', { bubbles: true, detail: profile} )
            this.dispatchEvent(event)
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            this.loading = false
        })
    }

    addressCallback(data) {
        if (data.features.length < 1) {
            addressResultsContainer.innerHTML = `
                No Locations Found
            ` /* TODO: translate and escape me */
        }

        let locations = ''
        data.features.forEach((feature) => {
            locations += `
                <div class="address-result" id="${feature.id}" data-place-name="${feature.place_name}">
                    ${feature.place_name}
                </div>
            ` /* TODO: escape place names */
        })

        addressResultsContainer.innerHTML = locations

        addressResults = this.renderRoot.querySelectorAll('.address-result')
        addressResults.forEach((result) => {
            result.addEventListener('click', function(e) {
                /* Escape placeName */
                const id = e.target.id
                const placeName = e.target.dataset.placeName

                cityInput.value = placeName

                zumeDashboard.mapbox_selected_id = id

                addressResultsContainer.innerHTML = ''
            })
        })
    }

    render() {
        return html`
            <form action="" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${zumeDashboard.translations.name}</label>
                    <input required type="text" id="full_name" name="full_name" value=${this.userProfile.name}>
                </div>
                <div class="">
                    <label for="phone">${zumeDashboard.translations.phone}</label>
                    <input type="tel" id="phone" name="phone" value=${this.userProfile.phone}>
                </div>
                <div class="">
                    <label for="email">${zumeDashboard.translations.email}</label>
                    <input type="email" id="email" name="email" value=${this.userProfile.email}>
                </div>
                <div class=""></div>
                    <label for="city">${zumeDashboard.translations.city}</label>
                    <input type="text" id="city" name="city" value=${this.userProfile.location?.label ?? ''}>
                </div>

                <button class="btn" id="submit-profile" ?disabled=${this.loading}>${zumeDashboard.translations.save}</button>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>

            </form>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('profile-form', ProfileForm);
