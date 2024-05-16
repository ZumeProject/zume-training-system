import { LitElement, html } from "lit"
import { DateTime } from "luxon"

/**
 * Component for inviting friends to a plan
 *
 * TODO: this needs fleshing out to be given a training code and title for sharing
 */
export class InviteFriends extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            module: { type: String },
            skippable: { type: Boolean },
            t: { type: Object },
            inviteCode: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
            errorMessage: { type: String, attribute: false },
            training: { type: Object, attribute: false },
        }
    }

    constructor() {
        super()
        this.name = ''
        this.module = ''
        this.skippable = false
        this.t = {}

        const url = new URL(location.href)
        const joinKey = url.searchParams.get('joinKey')

        this.training = {}
        this.inviteCode = joinKey
        this.loading = false
        this.errorMessage = ''
        this.url = jsObject.site_url + `/app/plan_invite${this.inviteCode !== '' ? '?code=' + this.inviteCode : ''}`
    }

    connectedCallback() {
        super.connectedCallback();

        this.loading = true

        makeRequest( 'GET', `plan/${this.inviteCode}`, {}, 'zume_system/v1' )
            .then((data) => {
                console.log(data)
                if (data.error_code) {
                    this.errorMessage = this.t.broken_link
                    return
                }
                this.training = data
                this.errorMessage = ''
            })
            .fail((error) => {
                console.error(error)
                this.errorMessage = this.t.broken_link
            })
            .always(() => {
                this.loading = false
            })
    }

    getNextSession() {
        if (Object.keys(this.training).length === 0) {
            return
        }

        const { set_type } = this.training

        const numberOfSessions = this.numberOfSessions(set_type.key)

        const now = DateTime.now()
        for (let i = 1; i < numberOfSessions + 1; i++) {
            const digit = i < 10 ? `0${i}` : `${i}`
            const date = this.training[set_type.key + '_' + digit]

            if (!date) {
                continue
            }

            if (DateTime.fromMillis(date.timestamp) < now) {
                return date.formatted
            }
        }
        return ''
    }

    numberOfSessions(setType) {
        switch (setType) {
            case 'set_a':
                return 10
            case 'set_b':
                return 20
            case 'set_c':
                return 5
            default:
                break;
        }
    }

    render() {

        const nextSession = this.getNextSession()
        const note = this.t.note.replace('%s', this.training.post_author_display_name)
        const location = this.t.location.replace('%s', this.training.location_note ?? '')
        const inviteText = `${note}

${this.t.location}: ${location}
${this.t.time}: ${nextSession !== '' ? DateTime.fromISO(nextSession).toFormat('DDDD') : ''} ${this.training.time_of_day_note ?? ''} ${this.training.timezone_note ?? ''}
${
    this.training.zoom_link_note ? `${this.t.zoom_link}: ${this.training.zoom_link_note}\n` : ''
}
${this.t.join_url}
${this.url}

${this.t.join_key}: ${this.training.join_key}`

        return html`
            <div class="center stack">
                <span class="zume-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>

                ${
                    this.loading ? html`<span class="loading-spinner active"></span>` : ''
                }
                ${
                    !this.loading && this.errorMessage !== '' ? html`<span class="banner warning">${this.errorMessage}</span>` : ''
                }
                ${
                    !this.loading && this.errorMessage === '' ? html`
                        <textarea class="input" rows="9">${inviteText}</textarea>
                        <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t} alwaysShow ></share-links>
                    ` : ''
                }
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )
