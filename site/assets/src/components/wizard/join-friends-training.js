import { LitElement, html } from 'lit';
import { zumeRequest } from '../../js/zumeRequest';

export class JoinFriendsTraining extends LitElement {

    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },

            code: { type: String, attribute: false },
            message: { type: Array, attribute: false },
            errorMessage: { type: String, attribute: false },
            successMessage: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.successMessage = ''
        this.message = []
        this.loading = false
    }

    firstUpdated() {
      console.log(this.t)
        this.loading = true
        this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
        this.message.push(this.t.please_wait)
        /* We need the plan id */
        const url = new URL( location.href )
        if ( !url.searchParams.has('code') ) {
            this.message = []
            this.setErrorMessage(this.t.broken_link)
            this.loading = false
            return
        }

        const code = url.searchParams.get('code')
        this.code = code

        zumeRequest.post( 'connect/plan', { code: code } )
            .then( ( data ) => {
                this.successMessage = this.t.success.replace('%s', data.name)
                this.message = [
                  this.t.contact_visibility1,
                  this.t.contact_visibility2,
                  this.t.contact_visibility3
                ]

                const url = new URL(location.href)
                url.searchParams.set('joinKey', code)
                window.history.pushState(null, null, url.href)
            })
            .catch((error) => {
                console.log(error)
                this.message = ''
                if ( error.code === 'bad_plan_code' ) {
                    this.setErrorMessage(this.t.broken_link)
                } else {
                    this.setErrorMessage(this.t.error)
                }
            })
            .finally(() => {
                this.loading = false
                this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
                this.dispatchEvent(new CustomEvent('wizard:finish', { bubbles: true }))
            })
    }

    setErrorMessage( message ) {
        this.errorMessage = message
    }

    renderMessage() {
        return this.message.map(message => html`<p>${message}</p>`)
    }

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <div class="stack--2">
              <div class="success banner" data-state=${this.successMessage.length ? '' : 'empty'}>${this.successMessage}</div>
              ${this.renderMessage()}
              <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
            </div>
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-friends-training', JoinFriendsTraining);
