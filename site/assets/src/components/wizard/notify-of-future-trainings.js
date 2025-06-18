import { LitElement, html } from 'lit';
import { zumeRequest } from '../../js/zumeRequest';

export class NotifyOfFutureTrainings extends LitElement {

    static get properties() {
        return {
            /**
             * Translation strings
             */
            t: { type: Object },

            code: { attribute: false },
            message: { attribute: false },
            errorMessage: { attribute: false },
            loading: { attribute: false },
        };
    }

    constructor() {
        super()

        this.code = ''
        this.errorMessage = ''
        this.loading = false
    }

    firstUpdated() {
        this.loading = true
        this.dispatchEvent(new CustomEvent( 'loadingChange', { bubbles: true, detail: { loading: this.loading } } ))
        this.message = this.t.please_wait

        zumeRequest.post( 'connect/notify-of-future-trainings' )
            .then( ( data ) => {
                this.message = this.t.success
            })
            .catch((error) => {
                console.log(error)
                this.message = ''
                this.setErrorMessage(this.t.error)
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

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('notify-of-future-trainings', NotifyOfFutureTrainings);
