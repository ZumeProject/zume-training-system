import { LitElement, html } from 'lit';
import { zumeRequest } from '../../js/zumeRequest';
import { zumeAttachObservers } from '../../js/zumeAttachObservers';
import { Modules, Steps } from './wizard-constants';
import { WizardStateManager } from './wizard-state-manager';

export class JoinFriendsTraining extends LitElement {

    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },
            variant: { type: String },

            code: { type: String, attribute: false },
            message: { type: Array, attribute: false },
            errorMessage: { type: String, attribute: false },
            successMessage: { type: String, attribute: false },
            success: { type: Boolean, attribute: false },
            loading: { type: Boolean, attribute: false },
            privacyPolicyOpen: { type: Boolean, attribute: false },
            plan: { type: Object, attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.successMessage = ''
        this.success = false
        this.message = []
        this.loading = false
        this.privacyPolicyOpen = false
        this.plan = null

        this.stateManager = WizardStateManager.getInstance(Modules.joinFriendsTraining)
        this.stateManager.clear()
    }

    willUpdate(properties) {
        if ( properties.has('variant') && this.variant === Steps.joinFriendsPlan ) {
          this.loading = true
          this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
          this.message.push(this.t.please_wait)
          /* We need the plan id */

          const url = new URL( location.href )
          const code = url.searchParams.get('code')
          this.code = code

          zumeRequest.post( 'connect/plan', { code: code } )
              .then( ( data ) => {
                  this.success = true
                  this.successMessage = this.t.success.replace('%s', data.name)
                  this.message = ''

                  const url = new URL(location.href)
                  url.searchParams.set('joinKey', code)
                  window.history.pushState(null, null, url.href)
              })
              .catch((error) => {
                  console.log(error)
                  this.success = false
                  this.message = ''
                  if ( error.code === 'bad_plan_code' ) {
                      this.setErrorMessage(this.t.broken_link)
                  } else {
                      this.setErrorMessage(this.t.error)
                  }
              })
              .finally(() => {
                  this.loading = false
                  zumeAttachObservers(this.renderRoot, 'join-friends-training')
                  this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
                  this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
              })
        }
    }

    setErrorMessage( message ) {
        this.errorMessage = message
    }

    togglePrivacyPolicy() {
        this.privacyPolicyOpen = !this.privacyPolicyOpen
    }

    _sendDoneStepEvent() {
        const doneStepEvent = new CustomEvent('done-step', { bubbles: true })
        this.dispatchEvent(doneStepEvent)
    }

    _handleVerifyCode() {
        this.loading = true
        this.code = this.renderRoot.querySelector('#code').value
        zumeRequest.get( `plan/${this.code}`, {})
            .then( ( data ) => {
                this.success = true
                this._sendDoneStepEvent()
                this.stateManager.add(Steps.joinFriendsPlan, { code: this.code, plan: data })
            })
            .catch((error) => {
                this.errorMessage = this.t.not_a_recognized_code
                setTimeout(() => {
                    this.errorMessage = ''
                }, 2500)
            })
            .finally(() => {
                this.loading = false
            })
    }

    render() {
        if ( this.variant === Steps.joinFriendsPlan ) {
          return html`
              <h1>${this.t.title}</h1>
              <div class="stack--2">
                <div class="success banner" data-state=${this.successMessage.length ? '' : 'empty'}>${this.successMessage}</div>
                ${this.message.length ? html`<p>${this.message}</p>` : ''}
                <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
              </div>
              <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
              ${this.success ? html`
                  <button class="btn outline tight" @click=${this.togglePrivacyPolicy}>
                    ${this.t.privacy_policy}
                  </button>
                  <div class="zume-collapse" ?data-expand=${this.privacyPolicyOpen}>
                    <ul role="list" class="fit-content mt-1 mx-auto text-left">
                      <li>${this.t.contact_visibility1}</li>
                      <li>${this.t.contact_visibility2}</li>
                      <li>${this.t.contact_visibility3}</li>
                    </ul>
                    <a href="/dashboard?profile=true" class="btn brand tight">${this.t.change_preferences}</a>
                  </div>
              ` : ''}
          `;
        }

        if ( this.variant === Steps.joinCode ) {
            return html`
                <div class="container-md">
                  <h1 class="brand">${this.t.join_friends_training}</h1>
                  <div class="stack-1 invitation-form">
                      <p>${this.t.use_the_code_your_friend_sent_you}</p>
                      <div class="">
                          <label for="code"></label>
                          <input class="input" id="code" type="text" placeholder="012345">
                      </div>
                      <button
                          class="btn light"
                          @click=${this._handleVerifyCode}
                      >
                          ${this.t.connect}
                      </button>
                      <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
                      <div class="banner warning text-center" data-state=${this.errorMessage.length ? '' : 'empty'}>
                          ${this.errorMessage}
                      </div>
                  </div>
                </div>
            `
        }
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-friends-training', JoinFriendsTraining);
