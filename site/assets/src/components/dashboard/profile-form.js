import { LitElement, html } from 'lit'
import { zumeAttachObservers } from '../../js/zumeAttachObservers'

export class ProfileForm extends LitElement {
    static get properties() {
        return {
            userProfile: { type: Object },
            loading: { type: Boolean, attribute: false },
            locations: { type: Array, attribute: false },
            infosOpen: { type: Array, attribute: false },
        }
    }
    constructor() {
        super()
        this.userProfile = {}
        this.locations = []
        this.infosOpen = []
    }

    firstUpdated() {
        this.nameInput = this.renderRoot.querySelector('#full_name')
        this.phoneInput = this.renderRoot.querySelector('#phone')
        this.emailInput = this.renderRoot.querySelector('#email')
        this.preferredEmailInput = this.renderRoot.querySelector(
            '#communications_email'
        )
        this.cityInput = this.renderRoot.querySelector('#city')
        this.prefferedLanguageInput = this.renderRoot.querySelector(
            '#preferred_language'
        )
        this.addressResultsContainer =
            this.renderRoot.querySelector('#address_results')
        this.notifyOfFutureTrainingsInput = this.renderRoot.querySelector(
            '#notify_of_future_trainings'
        )
        this.hidePublicContactInput = this.renderRoot.querySelector(
            '#hide_public_contact'
        )
        this.hidePublicProgressInput = this.renderRoot.querySelector(
            '#hide_public_progress'
        )
        zumeAttachObservers(this.renderRoot, 'profile-form')
    }

    submitProfileForm(e) {
        e.preventDefault()

        const name = this.nameInput.value
        const email = this.emailInput.value
        const communications_email = this.preferredEmailInput.value
        const phone = this.phoneInput.value
        const preferred_language = this.prefferedLanguageInput.value
        const hide_public_contact = this.hidePublicContactInput.checked ? '1' : '0'

        const data = {
            name,
            phone,
            email,
            communications_email,
            preferred_language,
            hide_public_contact,
        }

        data.location_grid_meta = getLocationGridFromMapbox(
            this.mapboxSelectedId,
            this.userProfile.location
        )

        this.loading = true

        /* submit data to profile API endpoint */
        fetch(jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'X-WP-Nonce': jsObject.nonce,
            },
        })
            .then((response) => response.json())
            .then((profile) => {
                this.fireEvents(profile)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                this.loading = false
            })
    }

    submitEmailPreferences(e) {
        e.preventDefault()

        const data = {
            notify_of_future_trainings:
                this.notifyOfFutureTrainingsInput.checked,
        }

        this.loading = true

        fetch(jsObject.rest_endpoint + '/email-preferences', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'X-WP-Nonce': jsObject.nonce,
            },
        })
            .then((response) => response.json())
            .then((profile) => {
                this.fireEvents(profile)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                this.loading = false
            })
    }
    submitPreferences(e) {
        e.preventDefault()

        const data = {
            hide_public_contact:
                this.hidePublicContactInput.checked,
            hide_public_progress:
                this.hidePublicProgressInput.checked,
        }

        this.loading = true

        fetch(jsObject.rest_endpoint + '/profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'X-WP-Nonce': jsObject.nonce,
            },
        })
            .then((response) => response.json())
            .then((profile) => {
                this.fireEvents(profile)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                this.loading = false
            })
    }

    fireEvents(profile) {
        const event = new CustomEvent('user-profile:change', {
            bubbles: true,
            detail: profile,
        })
        this.dispatchEvent(event)
        const stateChangeEvent = new CustomEvent('user-state:change', {
            bubbles: true,
        })
        this.dispatchEvent(stateChangeEvent)
    }

    /* I couldn't get this to bind correctly, so have made an arrow function to implicitly gain access to 'this' of the class */
    addressCallback = (data) => {
        if (data.features.length < 1) {
            this.locations = -1
        } else {
            this.locations = data.features
        }
    }

    processLocation = debounce(
        getAddressSuggestions(this.addressCallback, jsObject.map_key)
    )

    selectAddress(e) {
        /* Escape placeName */
        const id = e.target.id
        const placeName = e.target.dataset.placeName

        this.cityInput.value = placeName

        this.mapboxSelectedId = id

        this.locations = []
    }

    _toggleInfo(type) {
        if (this.infosOpen.includes(type)) {
            const newInfosOpen = [...this.infosOpen]
            newInfosOpen.splice(newInfosOpen.indexOf(type), 1)
            this.infosOpen = newInfosOpen
        } else {
            this.infosOpen = [...this.infosOpen, type]
        }
    }

    isSSOUser() {
        return this.userProfile.sso_identities !== ''
    }

    render() {
        return html`
            <form action="" class="stack--2" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          required
                          type="text"
                          id="full_name"
                          name="full_name"
                          value=${this.userProfile.name}
                        >
                        <button type="button" class="icon-btn f-1" @click=${() => this._toggleInfo('name')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes('name') ? 'mt-0' : ''}"
                      ?data-expand=${this.infosOpen.includes('name')}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_name_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          type="tel"
                          id="phone"
                          name="phone"
                          value=${this.userProfile.phone}
                        >
                        <button type="button" class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}" @click=${() =>
                            this._toggleInfo('phone')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                        class="info-area zume-collapse ${this.infosOpen.includes('phone') ? 'mt-0' : ''} ${this.isSSOUser() ? 'd-none' : ''}"
                        ?data-expand=${this.infosOpen.includes('phone')}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_phone_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          ?disabled=${this.isSSOUser()}
                          type="email"
                          id="email"
                          name="email"
                          value=${this.userProfile.email}
                        >
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}"
                          @click=${() => this._toggleInfo('email')}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes('email') ? 'mt-0' : ''} ${this.isSSOUser() ? 'd-none' : ''}"
                      ?data-expand=${this.infosOpen.includes('email')}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_email_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
                    ${
                        this.userProfile.sign_in_providers &&
                        Array.isArray(this.userProfile.sign_in_providers)
                            ? html`
                                  <label>
                                    ${jsObject.translations.linked_accounts}
                                  </label>
                                  <div class="cluster">
                                      ${this.userProfile.sign_in_providers.map(
                                          (profile) => html`
                                              <span class="token">${profile}</span>
                                          `
                                      )}
                                  </div>
                              `
                            : ''
                    }
                <div class="">
                    <label for="communications_email">
                      ${jsObject.translations.communications_email}
                    </label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          type="email"
                          id="communications_email"
                          name="communications_email"
                          value=${this.userProfile.communications_email}
                        >
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}"
                          @click=${() =>this._toggleInfo('communications_email')}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${
                          this.infosOpen.includes('communications_email')
                              ? 'mt-0'
                              : ''
                      } ${this.isSSOUser() ? 'd-none' : ''}"
                      ?data-expand=${this.infosOpen.includes('communications_email')}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${
                                jsObject.translations
                                    .user_email_disclaimer
                            }</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <div class="d-flex align-items-center">
                        <input
                            class="input"
                            type="text"
                            id="city"
                            name="city"
                            value=${this.userProfile.location?.label ?? ''}
                            @input=${this.processLocation}
                        />
                        <button type="button" class="icon-btn f-1" @click=${() =>
                            this._toggleInfo('city')}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes('city') ? 'mt-0' : ''} ${this.isSSOUser() ? 'd-none' : ''}"
                      ?data-expand=${this.infosOpen.includes('city')}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_city_disclaimer}</p>
                        </div>
                    </div>
                </div>
                    ${
                        !Array.isArray(this.locations)
                            ? html` ${jsObject.translations.no_locations} `
                            : ''
                    }
                    ${
                        Array.isArray(this.locations) &&
                        this.locations.length > 0
                            ? html`
                                  <div
                                      id="address_results"
                                      class="stack--3 fit-content mx-auto my-0"
                                  >
                                      ${this.locations.map(
                                          (feature) => html`
                                              <div
                                                  class="btn rounded"
                                                  role="button"
                                                  id="${feature.id}"
                                                  data-place-name="${feature.place_name}"
                                                  @click=${this.selectAddress}
                                              >
                                                  ${feature.place_name}
                                              </div>
                                          `
                                      )}
                                  </div>
                              `
                            : ''
                    }
                </div>

                <div>
                    <label for="preferred_language">
                      ${jsObject.translations.language}
                    </label>
                    <div class="d-flex align-items-center">
                        <select class="input" name="preferred_language" id="preferred_language">

                        ${Object.values(jsObject.languages).map(
                            (item) => html`
                                <option
                                    value=${item.code}
                                    ?selected=${this.userProfile
                                        .preferred_language === item.code}
                                >
                                    ${item.nativeName} - ${item.enDisplayName}
                                </option>
                            `
                        )}

                        </select>
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}"
                          @click=${() => this._toggleInfo('preferred_language')}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${
                          this.infosOpen.includes('preferred_language')
                              ? 'mt-0'
                              : ''
                      } ${this.isSSOUser() ? 'd-none' : ''}"
                      ?data-expand=${this.infosOpen.includes('preferred_language')}
                      >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_preferred_language_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="stack my-0" data-fit-content>
                    <button
                      class="btn"
                      id="submit-profile"
                      ?disabled=${this.loading}
                    >
                      ${jsObject.translations.save}
                    </button>
                </div>
                <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            </form>
            <hr>
            <div class="stack--2">
                <h3 class="h4">
                  ${jsObject.translations.email_preferences}
                </h3>
                <p>${jsObject.translations.email_preferences_disclaimer}</p>
                <form @submit=${this.submitEmailPreferences} class="stack--2">
                  <div class="form-control brand-light">
                      <input
                          type="checkbox"
                          id="notify_of_future_trainings"
                          ?checked=${
                              this.userProfile.notify_of_future_trainings
                          }
                      />
                      <label for="notify_of_future_trainings">
                          ${jsObject.translations.notify_of_future_trainings}
                      </label>
                  </div>
                  <div class="stack-1 my-0" data-fit-content>
                    <button class="btn" id="submit-email-preferences" ?disabled=${this.loading}>
                      ${jsObject.translations.save}
                    </button>
                  </div>
                </form>
            </div>
            <hr>
            <div class="stack--2">
                <h3 class="h4">
                  ${jsObject.translations.preferences}
                </h3>
                <form @submit=${this.submitPreferences} class="stack--2">
                  <div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="form-control brand-light">
                          <input
                              type="checkbox"
                              id="hide_public_contact"
                              ?checked=${this.userProfile.hide_public_contact === '1'}
                          />
                          <label for="hide_public_contact">
                              ${jsObject.translations.hide_public_contact}
                          </label>
                      </div>
                      <button
                        type="button"
                        class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}"
                        @click=${() => this._toggleInfo('hide_public_contact')}
                      >
                          <span class="icon z-icon-info brand-light"></span>
                      </button>
                    </div>
                    <div class="info-area zume-collapse ${this.infosOpen.includes('hide_public_contact') ? 'mt-0' : ''} ${this.isSSOUser() ? 'd-none' : ''}" ?data-expand=${this.infosOpen.includes('hide_public_contact')}>
                      <div class="card mw-50ch mx-auto">
                          <p>${jsObject.wizard_translations.join_training.contact_visibility1}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="form-control brand-light">
                            <input
                                type="checkbox"
                                id="hide_public_progress"
                                ?checked=${this.userProfile.hide_public_progress === '1'}
                            />
                            <label for="hide_public_progress">
                                ${jsObject.translations.hide_public_progress}
                            </label>
                        </div>
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser() ? 'invisible' : ''}"
                          @click=${() => this._toggleInfo('hide_public_progress')}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                      </div>
                      <div class="info-area zume-collapse ${this.infosOpen.includes('hide_public_progress') ? 'mt-0' : ''} ${this.isSSOUser() ? 'd-none' : ''}" ?data-expand=${this.infosOpen.includes('hide_public_progress')}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.progress_visibility}</p>
                        </div>
                      </div>
                  </div>
                  <div class="stack-1 my-0" data-fit-content>
                    <button class="btn" id="submit-privacy-settings" ?disabled=${this.loading}>
                      ${jsObject.translations.save}
                    </button>
                  </div>
                </form>
            </div>
            <hr>
            <a href=${jsObject.urls.logout} class="btn outline fit-content mt-2">
              ${jsObject.translations.logout}
            </a>


        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('profile-form', ProfileForm)
