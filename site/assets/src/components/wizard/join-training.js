import { LitElement, html } from 'lit';

export class JoinTraining extends LitElement {

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
        this.showTrainings = false
        this.loading = false
    }

    firstUpdated() {
        /* We need the plan id */
        const url = new URL( location.href )
        if ( !url.searchParams.has('code') ) {
            this.message = ""
            this.loading = false
            this.showTrainings = true
            return
        }

        const code = url.searchParams.get('code')

        this.connectToPlan(code);
    }

    connectToPlan(code) {
        this.loading = true;
        this.message = this.t.please_wait;
        this.code = code;
        makeRequest('POST', 'connect/public-plan', { code: code }, 'zume_system/v1')
            .then((data) => {
                console.log(data);

                this.message = this.t.success.replace('%s', data.name);

                this._sendDoneStepEvent();
            })
            .fail(({ responseJSON: error }) => {
                console.log(error);
                this.message = '';
                if (error.code === 'bad_plan_code') {
                    this.setErrorMessage(this.t.broken_link);
                } else {
                    this.setErrorMessage(this.t.error);
                }

                this._sendDoneStepEvent();
            })
            .always(() => {
                this.loading = false;
            });
    }

    _sendDoneStepEvent() {
        setTimeout(() => {
            const doneStepEvent = new CustomEvent( 'done-step', { bubbles: true } )
            this.dispatchEvent(doneStepEvent)
        }, 2000);
    }

    setErrorMessage( message ) {
        this.errorMessage = message

        setTimeout(() => {
            this.errorMessage = ''
        }, 3000)
    }

    _handleChosenTraining(event) {
        console.log(event)

        const { code } = event.detail

        this.showTrainings = false

        this.connectToPlan(code)
    }

    render() {
        return html`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings ? html`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `: ''}
            <span class="loading-spinner ${this.loading ? 'active' : ''}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length ? '' : 'empty'}>${this.errorMessage}</div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-training', JoinTraining);
