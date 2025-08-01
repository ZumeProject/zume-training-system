import { html } from 'lit';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants';
import { zumeRequest } from '../../js/zumeRequest';

export class DashCoach extends DashPage {
    static get properties() {
      return {
        showTeaser: { type: Boolean },
        coaches: { type: Array, attribute: false },
        error: { type: String, attribute: false },
        success: { type: String, attribute: false },
        loading: { type: Boolean, attribute: false },
      };
    }

    constructor() {
      super()
      // TODO: remove me as only for devs
      this.coaches = Object.values(jsObject.profile.coaches) || []
      //this.coaches = []
      this.error = ''
      this.success = ''
      this.loading = false
      const timeSinceRequest = Number(jsObject.user_stage?.state?.requested_a_coach_date * 1000 || Date.now())
      this.timeSinceRequestInDays = Math.floor((Date.now() - timeSinceRequest) / (1000 * 60 * 60 * 24))
      this.hoursSinceLastContactedCoach = Math.floor((Date.now() - (jsObject.profile.last_contacted_coach * 1000 ?? Date.now())) / ( 1000 * 60 * 60))

      const hoursBetweenMessages = 24
      this.hoursLeftToMessage = hoursBetweenMessages - this.hoursSinceLastContactedCoach
      this.allowMessage = this.hoursLeftToMessage < 0

      // TODO: remove me as only for devs
      //this.allowMessage = true
    }

    getACoach() {
      this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.getACoach } } ))
    }

    updateProfile() {
      this.dispatchEvent(new CustomEvent( 'open-profile', { bubbles: true } ))
    }

    handleMessageInput(e) {
      this.message = e.target.value
      this.error = ''
    }

    sendMessage() {
      this.loading = true
      this.error = ''
      // send message as a comment on the coaching contact
      zumeRequest.post('/connect/message-coach', { message: this.message })
        .then(() => {
          this.success = jsObject.translations.success_sending_message
          setTimeout(() => {
            this.success = ''
          }, 3000)
        })
        .catch(error => {
          this.error = jsObject.translations.error_sending_message
        })
        .finally(() => {
          this.loading = false
        })
    }

    render() {
      console.log(this.coaches)
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main content p-2">
                  ${
                      this.showTeaser ? html`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
                            </div>
                            <div class="dash-menu__text-area | switcher | switcher-width-20">
                              <div>
                                <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                                <p>${jsObject.translations.get_a_coach_explanation}</p>
                              </div>
                              <button class="dash-menu__view-button btn tight" @click=${this.getACoach}>
                                ${jsObject.translations.get_a_coach}
                              </button>
                            </div>
                          </div>
                      ` : ''
                  }
                  ${
                      !this.showTeaser && this.coaches.length === 0 ? html`
                          <div class="stack-2">
                              <div class="stack--1">
                                <p>
                                  ${jsObject.translations.connecting_with_coach}
                                </p>
                                <p>
                                  ${jsObject.translations.wait_for_coach}
                                </p>
                                <ul>
                                  <li>
                                    <strong>${jsObject.translations.phone}:</strong> ${jsObject.profile.phone}
                                  </li>
                                  <li>
                                    <strong>${jsObject.translations.communications_email}:</strong> ${jsObject.profile.communications_email}
                                  </li>
                                </ul>
                                <p>
                                  ${jsObject.translations.confirm_phone_and_email}
                                </p>
                                <button class="btn center" @click=${this.updateProfile}>
                                  ${jsObject.translations.change_preferences}
                                </button>
                              </div>
                              ${
                                this.timeSinceRequestInDays > 14 ? html`
                                    <div class="stack--1 center">
                                        <h3 class="h4 brand-light">${jsObject.translations.apology_for_delay}</h3>
                                        <p>
                                          ${jsObject.translations.message_explanation}
                                        </p>
                                        <textarea
                                            placeholder="${jsObject.translations.message}"
                                            rows="3"
                                            @input=${this.handleMessageInput}
                                        ></textarea>
                                        <button
                                          class="btn ${this.allowMessage ? '' : 'disabled'}"
                                          @click=${this.sendMessage}
                                          ?disabled=${!this.allowMessage}
                                        >
                                          ${jsObject.translations.send_message}
                                        </button>
                                        ${
                                          !this.allowMessage ? html`
                                            <span>${jsObject.translations.message_again.replace( '%d', this.hoursLeftToMessage )}</span>
                                          ` : ''
                                        }
                                        <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                                        <div class="banner warning" data-state=${this.error.length ? '' : 'empty'}>
                                          ${this.error}
                                        </div>
                                        <div class="banner success" data-state=${this.success.length ? '' : 'empty'}>
                                          ${this.success}
                                        </div>
                                    </div>
                                ` : ''
                              }
                          </div>
                      ` : ''
                  }
                  ${
                      !this.showTeaser && this.coaches.length > 0 ? html`
                        <div class="grid grid-min-18rem">
                          ${
                              this.coaches.map((coach) => html`
                                  <div class="card stack | mw-50ch">
                                    <h3>${coach.name}</h3>
                                    <div class="center">
                                        <img class="profile-image" src="${coach.picture}" alt="${coach.name}" />
                                    </div>
                                    <ul class="stack">
                                      ${
                                        coach.email ? html`
                                          <li>${jsObject.translations.email}: <a href="mailto:${coach.email}">${coach.email}</a></li>
                                        ` : ''
                                      }
                                      ${
                                        coach.phone ? html`
                                          <li>${jsObject.translations.phone}: ${coach.phone}</li>
                                        ` : ''
                                      }
                                      ${coach.communication_apps.map((app) => {
                                        /* Mute these buttons for now until we have time to test them */
                                        /* Number needs checking to make sure it's formatted correctly, only numbers and + at the start */
                                        return ''
                                        if (app === 'signal') {
                                          return html`
                                            <li><a class="btn" href="sgnl://signal.me/#p/${coach.signal}">${jsObject.translations.signal}</a></li>
                                          `
                                        }
                                        if (app === 'telegram') {
                                          return html`
                                            <li><a class="btn" href="https://t.me/${coach.telegram}" target="_blank">${jsObject.translations.telegram}</a></li>
                                          `
                                        }
                                        if (app === 'whatsapp') {
                                          return html`
                                            <li><a class="btn" href="https://wa.me/${coach.whatsapp}" target="_blank">${jsObject.translations.whatsapp}</a></li>
                                          `
                                        }
                                        if (app === 'messenger') {
                                          return html`
                                            <li><a class="btn" href="https://m.me/${coach.messenger}" target="_blank">${jsObject.translations.messenger}</a></li>
                                          `
                                        }
                                      })}
                                    </ul>
                                  </div>
                              `)
                          }
                        </div>
                      `
                      : ''
                  }
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-coach', DashCoach);
