import { html } from 'lit';
import { DashPage } from './dash-page';
import { Wizards } from '../wizard/wizard-constants';

export class DashCoach extends DashPage {
    static get properties() {
      return {
        showTeaser: { type: Boolean },
        coaches: { type: Array, attribute: false },
      };
    }

    constructor() {
      super()
      //this.coaches = Object.values(jsObject.profile.coaches) || []
      this.coaches = []
    }

    getACoach() {
      this.dispatchEvent(new CustomEvent( 'open-wizard', { bubbles: true, detail: { type: Wizards.getACoach } } ))
    }

    updateProfile() {
      this.dispatchEvent(new CustomEvent( 'open-profile', { bubbles: true } ))
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
                            <button class="btn" @click=${this.updateProfile}>
                              ${jsObject.translations.change_preferences}
                            </button>
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
                                    ${
                                      coach.communication_apps.length ? html`
                                        <ul class="stack">
                                          ${
                                            coach.communication_apps.includes('email') ? html`
                                              <li>${jsObject.translations.email}: <a href="mailto:${coach.email}">${coach.email}</a></li>
                                            ` : ''
                                          }
                                          ${
                                            coach.communication_apps.includes('phone') ? html`
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
                                      ` : ''
                                    }

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
