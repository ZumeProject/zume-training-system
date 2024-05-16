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
        this.url = jsObject.site_url + `/app/plan_invite${this.inviteCode !== '' ? '?code=' + this.inviteCode : ''}`
    }

    connectedCallback() {
        super.connectedCallback();

        makeRequest( 'GET', `plan/${this.inviteCode}`, {}, 'zume_system/v1' )
            .then((data) => {
                console.log(data)
                this.training = data
            })
            .fail((error) => {
                console.error(error)
            })
    }

    getNextSession() {
        const { set_type } = this.training

        const numberOfSessions = this.numberOfSessions(set_type)

        const now = DateTime.now()
        for (let i = 1; i < numberOfSessions + 1; i++) {
            const digit = i < 10 ? `0${i}` : `${i}`
            const date = this.training[set_type + '_' + digit]

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
        const location = this.t.location.replace('%s', this.location_note ?? '')
        const time = this.t.time
            .replace('%1$s', nextSession !== '' ? DateTime.fromISO(nextSession) : '')
            .replace('%2$s', this.training.time_of_day_note ?? '')
        const joinKey = this.t.join_key.replace('%s', this.training.join_key)
        const inviteText = html`
            ${note}

            ${location}
            ${time}

            ${this.t.join_url}
            ${this.url}

            ${joinKey}`
        return html`
            <div class="center stack">
                <span class="zume-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <textarea class="input" rows="10">
                    ${inviteText}
                </textarea>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t} alwaysShow ></share-links>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}

window.customElements.define( 'invite-friends', InviteFriends )
