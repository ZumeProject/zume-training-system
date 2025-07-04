import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { DashBoard } from './dash-board'
import { DashPage } from './dash-page'
import { Wizards } from '../wizard/wizard-constants'
import { RouteNames } from './routes'
import { zumeRequest } from '../../js/zumeRequest'
import { DateTime } from 'luxon'
import {
    zumeAttachObservers,
    zumeDetachObservers,
} from '../../js/zumeAttachObservers'
import { encodeJSON } from '../../js/Base64'

export class DashTrainings extends DashPage {
    static get properties() {
        return {
            showTeaser: { type: Boolean },
            code: { type: String },
            loading: { type: Boolean, attribute: false },
            error: { type: String, attribute: false },
            training: { type: Object, attribute: false },
            sessions: { type: Array, attribute: false },
            sessionToEdit: { type: Object, attribute: false },
            groupMemberToView: { type: Object, attribute: false },
            openDetailStates: { type: Object, attribute: false },
            filterStatus: { type: String, attribute: false },
            filteredItems: { type: Array, attribute: false },
            isEditingTitle: { type: Boolean, attribute: false },
            isSavingTitle: { type: Boolean, attribute: false },
            isSavingSession: { type: Boolean, attribute: false },
            groupMembersOpen: { type: Boolean, attribute: false },
            groupDetailsOpen: { type: Boolean, attribute: false },
            groupCommunicationOpen: { type: Boolean, attribute: false },
            coachingToolsOpen: { type: Boolean, attribute: false },
            copyFeedback: { type: Object, attribute: false },
        }
    }

    constructor() {
        super()
        this.showTeaser = false
        this.loading = false
        this.isEditingTitle = false
        this.error = ''
        this.route = DashBoard.getRoute(RouteNames.myTraining)
        this.sessionToEdit = {}
        this.groupMemberToView = {}
        this.openDetailStates = {}
        this.filteredItems = []
        this.groupMembersOpen = false
        this.groupDetailsOpen = false
        this.groupCommunicationOpen = false
        this.filterName = 'my-trainings-filter'
        this.filterStatus = ZumeStorage.load(this.filterName)
        this.copyFeedback = {
            emails: '',
            phones: '',
        }

        this.renderListItem = this.renderListItem.bind(this)
        this.renderMemberItem = this.renderMemberItem.bind(this)
        this.renderTrainingItem = this.renderTrainingItem.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()

        if (this.code !== 'teaser') {
            this.getTraining()
        }
        document
            .querySelectorAll('.reveal-overlay #edit-session-modal')
            .forEach((element) => {
                element.parentElement.remove()
            })
        document
            .querySelectorAll('.reveal-overlay #edit-session-details-modal')
            .forEach((element) => {
                element.parentElement.remove()
            })
    }

    disconnectedCallback() {
        zumeDetachObservers(this.tagName)

        super.disconnectedCallback()
    }

    willUpdate(properties) {
        if (properties.has('code')) {
            if (this.code !== 'teaser') {
                zumeDetachObservers(this.tagName)
                this.openDetailStates = {}
                this.groupCommunicationOpen = false
                this.groupDetailsOpen = false
                this.groupMembersOpen = false
                this.getTraining()
            }
        }
    }

    firstUpdated() {
        super.firstUpdated()

        jQuery(this.renderRoot).foundation()
        zumeAttachObservers(this.renderRoot, this.tagName)
    }

    updated() {
        jQuery(this.renderRoot).foundation()
        zumeDetachObservers(this.tagName)
        zumeAttachObservers(this.renderRoot, this.tagName)

        const dropdown = jQuery('#filter-menu')
        dropdown.foundation('_destroy')
        new Foundation.Dropdown(dropdown)
        dropdown.css('display', '')
    }

    getTraining() {
        this.loading = true
        return zumeRequest
            .get(`plan/${this.code}`, {})
            .then((result) => {
                this.training = result
              console.log(this.training)
                this.error = ''
            })
            .then(() => {
                this.refreshSessions()
                this.groupMembers = this.getGroupMembers()
            })
            .catch((error) => {
                console.log(error)
                this.error = error.message
            })
            .finally(() => {
                this.loading = false
            })
    }
    refreshSessions(completedSessions) {
        if (completedSessions) {
            this.training.completed_sessions = completedSessions
        }
        this.sessions = this.getSessions()
        this.currentSession = this.getCurrentSession()

        this.filteredItems = this.filterItems(this.filterStatus, this.sessions)
    }
    getSessions() {
        const trainingType = this.getTrainingType()
        const numberOfSessions = this.getNumberOfSessions()

        const sessions = []

        for (let i = 1; i < numberOfSessions + 1; i++) {
            const digit = i < 10 ? `0${i}` : `${i}`
            const id = trainingType + '_' + digit
            const time = this.training[id]

            sessions.push({
                id,
                name: jsObject.translations.session_x.replace('%d', i),
                datetime: time ? Number(time.timestamp) * 1000 : 0,
                completed: this.training.completed_sessions.includes(id),
            })
        }

        return sessions
    }
    getHighlightedDays() {
        if (!this.sessions) {
            return []
        }
        return this.sessions.map((session) => {
            return {
                date: DateTime.fromMillis(session.datetime).toISODate(),
            }
        })
    }
    getGroupMembers() {
        if (
            !this.training.participants ||
            !Array.isArray(this.training.participants)
        ) {
            return []
        }

        const groupMembers = []

        this.training.participants.forEach((groupMember) => {
            groupMembers.push({
                id: groupMember.ID,
                name: groupMember.post_title,
            })
        })

        return groupMembers
    }
    getTrainingType() {
        return this.training.set_type.key
    }
    getSessionNumber(id) {
        const type = this.getTrainingType() + '_'

        const number = id.slice(type.length)

        return number
    }
    getSessionUrl(id) {
        const type = this.getTrainingType()
        const sessionNumber = this.getSessionNumber(id)

        let indexUrl = ''
        if (type === 'set_a') {
            indexUrl = jsObject.urls.launch_ten_session_course
        }
        if (type === 'set_b') {
            indexUrl = jsObject.urls.launch_twenty_session_course
        }
        if (type === 'set_c') {
            indexUrl = jsObject.urls.launch_intensive_session_course
        }

        const url = new URL(indexUrl)

        url.searchParams.set('session', sessionNumber)

        return url.href
    }
    getNumberOfSessions() {
        const set_type = this.getTrainingType()
        switch (set_type) {
            case 'set_a':
                return 10
            case 'set_b':
                return 20
            case 'set_c':
                return 5
            default:
                break
        }
    }
    getSlideKey(id) {
        const idParts = id.split('_')
        if (idParts.length !== 3) {
            return ''
        }
        switch (idParts[1]) {
            case 'a':
                return `s1_${Number(idParts[2])}_1`
            case 'b':
                return `s2_${Number(idParts[2])}_1`
            case 'c':
                return `s3_${Number(idParts[2])}_1`
        }
    }
    getCurrentSession() {
        for (let i = 0; i < this.sessions.length; i++) {
            const session = this.sessions[i]

            if (session.completed) {
                continue
            }

            return session.id
        }

        return ''
    }

    createTraining() {
        this.dispatchEvent(
            new CustomEvent('open-wizard', {
                bubbles: true,
                detail: { type: Wizards.planDecision },
            })
        )
    }
    inviteFriends() {
        this.dispatchEvent(
            new CustomEvent('open-wizard', {
                bubbles: true,
                detail: {
                    type: Wizards.inviteFriends,
                    params: {
                        joinKey: this.code,
                    },
                },
            })
        )
    }

    startSession(id, event) {
        event.stopImmediatePropagation()
        const url = this.getSessionUrl(id)

        location.href = url
    }
    editSession(id, event) {
        this.stopImmediatePropagation(event)
        this.closeKebabMenu(id)
        const sessionToEdit = this.sessions.find((session) => session.id === id)

        const date = DateTime.fromMillis(sessionToEdit.datetime)
        sessionToEdit.date = date.toISODate()

        this.sessionToEdit = sessionToEdit

        this.openEditSessionModal()
    }
    selectDay(event) {
        const { date } = event.detail

        const newSession = {
            ...this.sessionToEdit,
            date,
        }
        this.sessionToEdit = newSession
    }
    saveSession(event) {
        if (this.isSavingSession) {
            return
        }
        this.isSavingSession = true

        const { date } = this.sessionToEdit

        const sessionTime = DateTime.fromFormat(`${date}`, 'y-LL-dd')
        zumeRequest
            .post('plan/edit-session', {
                key: this.training.join_key,
                session_id: this.sessionToEdit.id,
                session_time: sessionTime.toSeconds(),
            })
            .then((res) => {
                this.training = {
                    ...this.training,
                    [this.sessionToEdit.id]: {
                        timestamp: sessionTime.toSeconds(),
                        formatted: sessionTime.toISODate(),
                    },
                }
                this.refreshSessions()

                this.closeEditSessionModal()
            })
            .finally(() => {
                this.isSavingSession = false
            })
    }
    cancelEditingSession() {
        this.sessionToEdit = {}
        this.closeEditSessionModal()
    }
    openEditSessionModal() {
        const modal = document.querySelector('#edit-session-modal')
        jQuery(modal).foundation('open')
    }
    closeEditSessionModal() {
        const modal = document.querySelector('#edit-session-modal')
        jQuery(modal).foundation('close')
    }
    editSessionDetails(event) {
        event.stopImmediatePropagation()
        document.querySelector('#location-note').value =
            this.training.location_note || ''
        document.querySelector('#time-of-day-note').value =
            this.training.time_of_day_note || ''

        if (this.isCoach()) {
            document.querySelector('#language-note').value =
                this.training.language_note || ''
            document.querySelector('#timezone-note').value =
                this.training.timezone_note || ''
            document.querySelector('#zoom-link-note').value =
                this.training.zoom_link_note || ''

            if (this.isPublic()) {
                document.querySelector(
                    '#edit-session-details-modal #public[type="radio"]'
                ).checked = true
            } else {
                document.querySelector(
                    '#edit-session-details-modal #private[type="radio"]'
                ).checked = true
            }
            if (this.isActive()) {
                document.querySelector(
                    '#edit-session-details-modal #active[type="radio"]'
                ).checked = true
            } else {
                document.querySelector(
                    '#edit-session-details-modal #inactive[type="radio"]'
                ).checked = true
            }
        }

        this.openEditSessionDetailsModal()
    }
    openEditSessionDetailsModal() {
        const modal = document.querySelector('#edit-session-details-modal')
        jQuery(modal).foundation('open')
    }
    closeEditSessionDetailsModal() {
        const modal = document.querySelector('#edit-session-details-modal')
        jQuery(modal).foundation('close')
    }
    saveSessionDetails() {
        if (this.isSavingSession) {
            return
        }
        this.isSavingSession = true

        const locationNote = document.querySelector('#location-note').value
        const timeNote = document.querySelector('#time-of-day-note').value
        const zoomLinkNote = document.querySelector('#zoom-link-note').value
        const status = document.querySelector(
            '#edit-session-details-modal #active'
        ).checked
            ? 'active'
            : 'inactive'

        const trainingUpdate = {
            location_note: locationNote,
            time_of_day_note: timeNote,
            zoom_link_note: zoomLinkNote,
            status,
        }

        let languageNote
        let timezoneNote
        let visibility
        if (this.isCoach()) {
            languageNote = document.querySelector('#language-note').value
            timezoneNote = document.querySelector('#timezone-note').value
            visibility = document.querySelector(
                '#edit-session-details-modal #public'
            ).checked
                ? 'public'
                : 'private'

            trainingUpdate.language_note = languageNote
            trainingUpdate.timezone_note = timezoneNote
            trainingUpdate.visibility = visibility
        }

        zumeRequest
            .put(`plan/${this.training.join_key}`, trainingUpdate)
            .then((result) => {
                const newTraining = {
                    ...this.training,
                }
                newTraining.location_note = locationNote
                newTraining.time_of_day_note = timeNote
                newTraining.zoom_link_note = zoomLinkNote
                newTraining.status = {
                    key: status,
                }

                if (this.isCoach()) {
                    newTraining.language_note = languageNote
                    newTraining.timezone_note = timezoneNote
                    newTraining.visibility = {
                        key: visibility,
                    }
                }
                this.training = newTraining
            })
            .finally(() => {
                this.isSavingSession = false
                this.closeEditSessionDetailsModal()
                this.dispatchEvent(
                    new CustomEvent('training:changed', { bubbles: true })
                )
                if (visibility === 'private') {
                    this.groupCommunicationOpen = false
                }
            })
    }

    viewGroupMember(id) {
        this.groupMemberToView = this.training.participants.find(
            (member) => member.ID === id
        )
        this.openGroupMembersModal()
    }
    openGroupMembersModal() {
        const modal = document.querySelector('#group-members-modal')
        jQuery(modal).foundation('open')
    }
    closeGroupMembersModal() {
        const modal = document.querySelector('#group-members-modal')
        jQuery(modal).foundation('close')
    }

    editTitle() {
        this.isEditingTitle = true
    }
    cancelEditingTitle() {
        this.isEditingTitle = false
    }
    inputSaveTitle(event) {
        if (event.code === 'Enter') {
            this.saveTitle()
        }
    }
    saveTitle() {
        if (this.isSavingTitle) {
            return
        }
        this.isSavingTitle = true
        const title = document.querySelector('#training-title-input').value
        zumeRequest
            .put(`plan/${this.training.join_key}`, { title })
            .then((result) => {
                this.training.title = title
                this.dispatchEvent(
                    new CustomEvent('training:changed', { bubbles: true })
                )
            })
            .finally(() => {
                this.isEditingTitle = false
                this.isSavingTitle = false
            })
    }

    markSessionCompleted(id, event) {
        this.stopImmediatePropagation(event)
        this.closeKebabMenu(id)
        zumeRequest
            .post('plan/complete-session', {
                key: this.training.join_key,
                session_id: id,
            })
            .then((result) => {
                this.refreshSessions(result)
            })
        /* Update the local store to reflect this change */
    }

    sendEmailToSubscribers() {
        if (!this.isCoach()) {
            return
        }

        zumeRequest
            .post('send_email_to_subscribers', {
                join_key: this.training.join_key,
            })
            .then((result) => {
                this.training.has_emailed_notification = true
                this.training.last_emailed_notification = result.timestamp
                this.update()
            })
    }

    isGroupLeader() {
        if (
            this.training &&
            this.training.assigned_to &&
            Number(this.training.assigned_to.id) === jsObject.profile.user_id
        ) {
            return true
        }
        return false
    }
    isCoach() {
        return jsObject.is_coach
    }
    canEditTitle() {
        return (
            jsObject.training_groups &&
            Object.keys(jsObject.training_groups).length > 1
        )
    }
    isPublic() {
        return this.training.visibility.key === 'public'
    }
    isActive() {
        return this.training.status.key === 'active'
    }

    toggleDetails(id) {
        const open = this.openDetailStates[id]

        if (open) {
            this.openDetailStates = {
                ...this.openDetailStates,
                [id]: false,
            }
        } else {
            this.openDetailStates = {
                ...this.openDetailStates,
                [id]: true,
            }
        }
    }
    closeKebabMenu(sessionId) {
        jQuery(`#kebab-menu-${sessionId}`).foundation('close')
    }
    toggleKebabMenu(event) {
        event.stopImmediatePropagation()
        const id = event.currentTarget.dataset.toggle
        jQuery(`#${id}`).foundation('toggle')
    }
    stopImmediatePropagation(event) {
        event.stopImmediatePropagation()
    }

    filterSessions(status) {
        this.filterStatus = status
        this.filteredItems = this.filterItems(status, this.sessions)
        ZumeStorage.save(this.filterName, status)
        this.closeFilter()
    }
    filterItems(status, sessions) {
        if (!this.sessions) {
            return []
        }
        switch (status) {
            case 'completed':
                return sessions.filter((item) => item.completed)
            case 'uncompleted':
                return sessions.filter((item) => !item.completed)
            default:
                return [...sessions]
        }
    }
    closeFilter() {
        const menu = this.querySelector('#filter-menu')
        jQuery(menu).foundation('close')
    }
    toggleGroupMembers() {
        this.groupMembersOpen = !this.groupMembersOpen
    }
    toggleGroupDetails() {
        this.groupDetailsOpen = !this.groupDetailsOpen
    }
    toggleGroupCommunication() {
        this.groupCommunicationOpen = !this.groupCommunicationOpen
    }
    toggleCoachingTools() {
        this.coachingToolsOpen = !this.coachingToolsOpen
    }
    makeTrainingItemHref(item, sessionId) {
        //const href = [ jsObject.site_url, jsObject.language, item.slug ].join('/')

        const href = this.getSessionUrl(sessionId) + '&slide=' + item.slide_key
        return href
    }
    makeGroupMembersHref() {
        const query = {
            fields: [
                {
                    connected_plans: [this.training.join_key],
                },
            ],
        }
        const encodedQuery = encodeJSON(query)

        const labels = [
            {
                field: 'connected_plans',
                id: this.training.join_key,
                name: `Connected Plans: ${this.training.join_key}`,
            },
        ]
        const encodedLabels = encodeJSON(labels)

        const url = new URL(jsObject.urls.coaching_contact_list)

        url.searchParams.set('query', encodedQuery)
        url.searchParams.set('labels', encodedLabels)
        url.searchParams.set('filter_name', 'Custom Filter')

        return url.href
    }
    copyGroupEmails() {
        const emails = this.training.participants.map((participant) => participant.email)
        navigator.clipboard.writeText(emails.join(', '))
        this.copyFeedback = {
          ...this.copyFeedback,
          emails: jsObject.translations.copy_info_feedback
        }
        setTimeout(() => {
          this.copyFeedback = {
            ...this.copyFeedback,
            emails: ''
          }
        }, 2000)
    }
    copyGroupPhones() {
        const phones = this.training.participants.map((participant) => participant.phone)
        navigator.clipboard.writeText(phones.join(', '))
        this.copyFeedback = {
          ...this.copyFeedback,
          phones: jsObject.translations.copy_info_feedback
        }
        setTimeout(() => {
          this.copyFeedback = {
            ...this.copyFeedback,
            phones: ''
          }
        }, 2000)
    }

    renderListItem(session) {
        const { id, name, datetime, completed } = session

        const numberOfSessions = this.getNumberOfSessions()
        const slideKey = this.getSlideKey(id)
        const trainingItems =
            zumeTrainingPieces[numberOfSessions][slideKey]?.pieces ?? []

        const dateFormatOptions = {
            month: 'short',
            day: 'numeric',
        }
        if (DateTime.fromMillis(datetime).year !== DateTime.now().year) {
            dateFormatOptions.year = '2-digit'
        }

        return html`
            <li class="list__item" data-no-flex>
                <div class="switcher | switcher-width-20 gapy0">
                    <div class="list__primary">
                        ${this.currentSession === id
                            ? html`
                                  <button
                                      class="icon-btn"
                                      @click=${(event) =>
                                          this.startSession(id, event)}
                                      aria-label=${jsObject.translations
                                          .start_session}
                                  >
                                      <span
                                          class="icon z-icon-play brand-light"
                                      ></span>
                                  </button>
                              `
                            : html`
                                  <span
                                      class="icon z-icon-check-mark success ${completed
                                          ? ''
                                          : 'invisible'} p--2"
                                  ></span>
                              `}
                        <span class="f-medium">${name}</span>
                    </div>

                    <div class="list__secondary" data-align-start>
                        <div
                            class="d-flex justify-content-center align-items-center gap--2"
                        >
                            <span
                                >${datetime > 0
                                    ? DateTime.fromMillis(
                                          datetime
                                      ).toLocaleString(dateFormatOptions)
                                    : jsObject.translations.not_scheduled}</span
                            >
                            <button
                                class="icon-btn"
                                data-toggle="kebab-menu-${id}"
                                @click=${this.toggleKebabMenu}
                            >
                                <span
                                    class="icon z-icon-kebab brand-light"
                                ></span>
                            </button>
                            <button
                                class="icon-btn"
                                aria-label=${jsObject.translations.show_details}
                                aria-pressed=${this.openDetailStates[id]
                                    ? 'true'
                                    : 'false'}
                                @click=${() => this.toggleDetails(id)}
                            >
                                <img
                                    class="chevron | svg w-1rem h-1rem ${this
                                        .openDetailStates[id]
                                        ? 'rotate-180'
                                        : ''}"
                                    src=${jsObject.images_url + '/chevron.svg'}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="list__tertiary zume-collapse"
                    ?data-expand=${this.openDetailStates[id]}
                >
                    <ul class="pt-0 ps-2" role="list" data-brand-light>
                        ${trainingItems.map(
                            (item) => html`
                                <li>
                                    <a
                                        href=${this.makeTrainingItemHref(
                                            item,
                                            id
                                        )}
                                        @click=${this.stopImmediatePropagation}
                                    >
                                        ${item.title}
                                    </a>
                                </li>
                            `
                        )}
                    </ul>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${id}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl ? 'right' : 'left'}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        ${this.isGroupLeader()
                            ? html`
                                  <li>
                                      <button
                                          class="menu-btn"
                                          @click=${(event) =>
                                              this.editSession(id, event)}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations.edit_time}
                                      </button>
                                  </li>
                                  <li>
                                      <button
                                          class="menu-btn"
                                          @click=${(event) =>
                                              this.markSessionCompleted(
                                                  id,
                                                  event
                                              )}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations
                                              .mark_completed}
                                      </button>
                                  </li>
                              `
                            : ''}
                        <li>
                            <button
                                class="menu-btn"
                                @click=${(event) =>
                                    this.startSession(id, event)}
                            >
                                <span class="icon z-icon-play"></span>${jsObject
                                    .translations.start_session}
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
        `
    }

    renderMemberItem(member) {
        const { name } = member
        // if the group is a private one, then render the name as a link that opens a modal with the group members info
        if (this.training.visibility.key === 'private' || this.isCoach()) {
            return html`
                <li>
                    <button
                        class="link"
                        @click=${() => this.viewGroupMember(member.id)}
                    >
                        ${name}
                    </button>
                </li>
            `
        }
        return html` <li>${name}</li> `
    }
    renderTrainingItem(trainingItem) {
        const { title, host } = trainingItem

        if (Object.keys(this.groupMemberToView).length === 0) {
            return null
        }

        return html`
            <li class=" list__item tight" data-no-flex>
                <div class="switcher | switcher-width-30">
                    <div>
                        <h2 class="h5 bold m0">${title}</h2>
                    </div>
                    <div class="list__secondary">
                        <host-progress-bar
                            displayOnly
                            .host=${host}
                            .hostProgressList=${this.groupMemberToView.progress
                                .list}
                        ></host-progress-bar>
                    </div>
                </div>
            </li>
        `
    }
    renderFilterButton() {
        return html`
            <button class="icon-btn f-2" data-toggle="filter-menu">
                <span class="visually-hidden"
                    >${jsObject.translations.filter}</span
                >
                <span
                    class="icon z-icon-filter brand-light"
                    aria-hidden="true"
                ></span>
            </button>
        `
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left flex-wrap">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        ${this.canEditTitle()
                            ? html`
                                    ${
                                        this.isEditingTitle
                                            ? html`
                                                  <div
                                                      class="switcher switcher-width-20 gap--5"
                                                  >
                                                      <div
                                                          class="position-relative"
                                                      >
                                                          <input
                                                              class="input grow-1"
                                                              id="training-title-input"
                                                              type="text"
                                                              value=${this
                                                                  .training
                                                                  .title || ''}
                                                              @keydown=${this
                                                                  .inputSaveTitle}
                                                          />
                                                          <div
                                                              class="absolute ${this
                                                                  .isRtl
                                                                  ? 'left'
                                                                  : 'right'} top bottom d-flex align-items-center mx-0"
                                                          >
                                                              <span
                                                                  class="loading-spinner ${this
                                                                      .isSavingTitle
                                                                      ? 'active'
                                                                      : ''}"
                                                              ></span>
                                                          </div>
                                                      </div>
                                                      <div
                                                          class="d-flex align-items-center gap--1 grow-0"
                                                      >
                                                          <button
                                                              class="btn outline grow-0 tight f--1"
                                                              @click=${this
                                                                  .cancelEditingTitle}
                                                              ?disabled=${this
                                                                  .isSavingTitle}
                                                          >
                                                              ${jsObject
                                                                  .translations
                                                                  .cancel}
                                                          </button>
                                                          <button
                                                              class="btn tight grow-0 f--1"
                                                              @click=${this
                                                                  .saveTitle}
                                                              ?disabled=${this
                                                                  .isSavingTitle}
                                                              aria-disabled=${this
                                                                  .isSavingTitle
                                                                  ? 'true'
                                                                  : 'false'}
                                                          >
                                                              ${jsObject
                                                                  .translations
                                                                  .save}
                                                          </button>
                                                      </div>
                                                  </div>
                                              `
                                            : html`
                                                  <div
                                                      class="d-flex align-items-center s--3"
                                                  >
                                                      <h1 class="h3">
                                                          ${this.training
                                                              ?.title ?? ''}
                                                      </h1>
                                                      ${this.isGroupLeader()
                                                          ? html`
                                                                <button
                                                                    class="icon-btn f-0 brand-light"
                                                                    aria-label=${jsObject
                                                                        .translations
                                                                        .edit}
                                                                    @click=${this
                                                                        .editTitle}
                                                                >
                                                                    <span
                                                                        class="icon z-icon-pencil"
                                                                    ></span>
                                                                </button>
                                                            `
                                                          : ''}
                                                      ${this.renderFilterButton()}
                                                  </div>
                                              `
                                    }
                                </div>
                            `
                            : html`
                                  <h1 class="h3">${this.route.translation}</h1>
                                  ${this.renderFilterButton()}
                              `}
                    </div>

                    ${this.isEditingTitle
                        ? ''
                        : html`
                              <button
                                  class="btn brand-light tight"
                                  aria-label=${jsObject.translations
                                      .create_training_group}
                                  @click=${this.createTraining}
                              >
                                  ${jsObject.translations.new}
                              </button>
                          `}
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main content">
                    ${this.loading
                        ? html`<div class="p-1">
                              <span class="loading-spinner active"></span>
                          </div>`
                        : ''}
                    ${!this.loading && this.error
                        ? html`
                              <div class="p-1">
                                  <h3 class="f-1 bold uppercase">
                                      ${jsObject.translations.error}
                                  </h3>
                                  ${this.error === 'bad-plan-code'
                                      ? html`
                                            <p>
                                                ${jsObject.translations
                                                    .bad_code}
                                            </p>
                                            <p>
                                                ${jsObject.translations
                                                    .join_key}:
                                                ${this.code}
                                            </p>
                                        `
                                      : ''}
                                  ${this.error === 'not-authorized'
                                      ? html`
                                            <p>
                                                ${jsObject.translations
                                                    .not_authorized}
                                            </p>
                                        `
                                      : ''}
                              </div>
                          `
                        : ''}
                    ${this.showTeaser && !this.loading && !this.error
                        ? html`
                              <div class="p-1">
                                  <div class="dash-menu__list-item">
                                      <div
                                          class="dash-menu__icon-area | stack--5"
                                      >
                                          <span
                                              class="icon z-icon-locked dash-menu__list-icon"
                                          ></span>
                                      </div>
                                      <div
                                          class="dash-menu__text-area | switcher | switcher-width-20"
                                      >
                                          <div>
                                              <h3 class="f-1 bold uppercase">
                                                  ${jsObject.translations
                                                      .my_training_locked}
                                              </h3>
                                              <p>
                                                  ${jsObject.translations
                                                      .plan_a_training_explanation}
                                              </p>
                                          </div>
                                          <button
                                              class="dash-menu__view-button btn tight"
                                              @click=${this.createTraining}
                                          >
                                              ${jsObject.translations.unlock}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          `
                        : html`
                              <ul class="list">
                                  ${!this.loading &&
                                  this.sessions &&
                                  this.sessions.length > 0
                                      ? repeat(
                                            this.filteredItems,
                                            (session) => session.id,
                                            this.renderListItem
                                        )
                                      : ''}
                              </ul>
                          `}
                </div>
                <div
                    class="dropdown-pane"
                    id="filter-menu"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl ? 'right' : 'left'}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 ${this.filterStatus ===
                                'completed'
                                    ? 'selected'
                                    : ''}"
                                @click=${() => this.filterSessions('completed')}
                            >
                                ${jsObject.translations.completed}
                            </button>
                            <button
                                class="menu-btn w-100 ${this.filterStatus ===
                                'uncompleted'
                                    ? 'selected'
                                    : ''}"
                                @click=${() =>
                                    this.filterSessions('uncompleted')}
                            >
                                ${jsObject.translations.uncompleted}
                            </button>
                            <button
                                class="menu-btn w-100 ${this.filterStatus ===
                                'all'
                                    ? 'selected'
                                    : ''}"
                                @click=${() => this.filterSessions('all')}
                            >
                                ${jsObject.translations.all}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="dashboard__secondary stack">
                    ${this.loading && !this.error
                        ? html`<span class="loading-spinner active"></span>`
                        : ''}
                    ${!this.loading && !this.error && this.code !== 'teaser'
                        ? html`
                              <div class="card | group-members | grow-0">
                                  <button
                                      class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                      @click=${this.toggleGroupMembers}
                                  >
                                      <span
                                          class="icon z-icon-group brand-light"
                                      ></span>
                                      <span
                                          >${jsObject.translations
                                              .group_members}
                                          (${this.groupMembers.length})</span
                                      >
                                      <img
                                          class="chevron | svg w-1rem h-1rem ${this
                                              .groupMembersOpen
                                              ? 'rotate-180'
                                              : ''}"
                                          src=${jsObject.images_url +
                                          '/chevron.svg'}
                                      />
                                  </button>
                                  <div
                                      class="zume-collapse | mt-0"
                                      ?data-expand=${this.groupMembersOpen}
                                  >
                                      ${!this.loading &&
                                      this.groupMembers &&
                                      this.groupMembers.length > 0
                                          ? html`
                                                <ol class="ps-1">
                                                    ${repeat(
                                                        this.groupMembers,
                                                        (member) => member.id,
                                                        this.renderMemberItem
                                                    )}
                                                </ol>
                                            `
                                          : ''}
                                  </div>
                                  <button
                                      @click=${this.inviteFriends}
                                      class="btn brand tight mt--2"
                                  >
                                      ${jsObject.translations.invite_friends}
                                  </button>
                              </div>
                              <div class="card | group-details | grow-0">
                                  <button
                                      class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                      @click=${this.toggleGroupDetails}
                                  >
                                      <span
                                          class="icon z-icon-overview brand-light"
                                      ></span>
                                      <span
                                          >${jsObject.translations
                                              .group_details}</span
                                      >
                                      <img
                                          class="chevron | svg w-1rem h-1rem ${this
                                              .groupDetailsOpen
                                              ? 'rotate-180'
                                              : ''}"
                                          src=${jsObject.images_url +
                                          '/chevron.svg'}
                                      />
                                  </button>
                                  <div
                                      class="zume-collapse"
                                      ?data-expand=${this.groupDetailsOpen}
                                  >
                                      <div class="stack--2 | mt-0">
                                          <p class="text-left">
                                              <span class="f-medium"
                                                  >${jsObject.translations
                                                      .location}:</span
                                              >
                                              ${this.training.location_note}
                                          </p>
                                          <p class="text-left">
                                              <span class="f-medium"
                                                  >${jsObject.translations
                                                      .time}:</span
                                              >
                                              ${this.training.time_of_day_note}
                                          </p>
                                          ${this.training.language_note &&
                                          this.training.language_note.length
                                              ? html`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject
                                                                .translations
                                                                .language}:</span
                                                        >
                                                        ${this.training
                                                            .language_note}
                                                    </p>
                                                `
                                              : ''}
                                          ${this.training.timezone_note &&
                                          this.training.timezone_note.length
                                              ? html`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject
                                                                .translations
                                                                .timezone}:</span
                                                        >
                                                        ${this.training
                                                            .timezone_note}
                                                    </p>
                                                `
                                              : ''}
                                          ${this.training.zoom_link_note &&
                                          this.training.zoom_link_note.length
                                              ? html`
                                                    <p class="text-left">
                                                        <a
                                                            class="link f-medium"
                                                            href=${this.training
                                                                .zoom_link_note}
                                                            target="_blank"
                                                            >${jsObject
                                                                .translations
                                                                .meeting_link}</a
                                                        >
                                                    </p>
                                                `
                                              : ''}
                                          ${this.isPublic()
                                              ? html`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject
                                                                .translations
                                                                .public_group}</span
                                                        >
                                                    </p>
                                                `
                                              : ''}
                                          ${this.isGroupLeader()
                                              ? html`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject
                                                                .translations
                                                                .status}:</span
                                                        >
                                                        ${this.isActive()
                                                            ? jsObject
                                                                  .translations
                                                                  .active
                                                            : jsObject
                                                                  .translations
                                                                  .inactive}
                                                    </p>
                                                `
                                              : ''}
                                          ${this.isCoach()
                                              ? html`
                                                    <button
                                                        @click=${this
                                                            .editSessionDetails}
                                                        class="btn brand tight mt--2"
                                                    >
                                                        ${jsObject.translations
                                                            .edit}
                                                    </button>
                                                `
                                              : ''}
                                      </div>
                                  </div>
                              </div>
                              ${ this.isGroupLeader() ? html`
                                        <div
                                            class="card | group-communication | grow-0"
                                        >
                                            <button
                                                class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                                @click=${this
                                                    .toggleGroupCommunication}
                                            >
                                                <span
                                                    class="icon z-icon-share brand-light"
                                                ></span>
                                                <span
                                                    >${jsObject.translations
                                                        .group_communication}</span
                                                >
                                                <img
                                                    class="chevron | svg w-1rem h-1rem ${this
                                                        .groupCommunicationOpen
                                                        ? 'rotate-180'
                                                        : ''}"
                                                    src=${jsObject.images_url +
                                                    '/chevron.svg'}
                                                />
                                            </button>
                                            <div
                                                class="zume-collapse"
                                                ?data-expand=${this.groupCommunicationOpen}
                                            >
                                                <div class="stack--2">
                                                      <div class="position-relative">
                                                        <button class="btn brand tight mt--2" @click=${this.copyGroupEmails}>${jsObject.translations.copy_group_emails}</button>
                                                        <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.emails.length ? '' : 'empty'}>${this.copyFeedback.emails}</p>
                                                      </div>
                                                      <div class="position-relative">
                                                        <button class="btn brand tight mt--2" @click=${this.copyGroupPhones}>${jsObject.translations.copy_group_phones}</button>
                                                        <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.phones.length ? '' : 'empty'}>${this.copyFeedback.phones}</p>
                                                      </div>
                                                </div>
                                                ${this.isCoach() && this.training.visibility.key === 'public' ? html`
                                                  <div class="stack--2 | mt-0">
                                                      <button
                                                          class="btn brand tight mt--2 ${this.training.has_emailed_notification
                                                              ? 'disabled'
                                                              : ''}"
                                                          ?disabled=${this.training.has_emailed_notification}
                                                          @click=${this.sendEmailToSubscribers}
                                                      >
                                                          ${jsObject.translations.send_email_to_subscribers}
                                                      </button>
                                                  </div>
                                                  ` : ''}
                                            </div>
                                        </div>
                                        ` : ''}
                              ${ this.isCoach() ? html`
                                        <div
                                            class="card | coaching-tools | grow-0"
                                        >
                                            <button
                                                class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                                @click=${this
                                                    .toggleCoachingTools}
                                            >
                                                <span
                                                    class="icon z-icon-coach brand-light"
                                                ></span>
                                                <span
                                                    >${jsObject.translations
                                                        .coaching}</span
                                                >
                                                <img
                                                    class="chevron | svg w-1rem h-1rem ${this
                                                        .coachingToolsOpen
                                                        ? 'rotate-180'
                                                        : ''}"
                                                    src=${jsObject.images_url +
                                                    '/chevron.svg'}
                                                />
                                            </button>
                                            <div
                                                class="zume-collapse"
                                                ?data-expand=${this.coachingToolsOpen}
                                            >
                                                <div class="stack--2 mt-0">
                                                  <a
                                                      href=${this.makeGroupMembersHref()}
                                                      target="_blank"
                                                      >${jsObject.translations
                                                          .group_members_link}</a
                                                  >
                                                  <a
                                                      href="/coaching"
                                                      target="_blank"
                                                      >${jsObject.translations
                                                          .coaching_portal}</a
                                                  >
                                                </div>
                                            </div>
                                        </div>
                                        ` : ''}
                          `
                        : ''}
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div
                class="reveal small"
                id="group-members-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                  <div>
                    <h2>${this.groupMemberToView.post_title}</h2>
                    ${ this.groupMemberToView.email || this.groupMemberToView.phone ? html`
                        <h3 class="brand-light">${jsObject.translations.contact_info}</h3>
                        <ul>
                            <li><strong>${jsObject.translations.email}:</strong> ${this.groupMemberToView.email}</li>
                            <li><strong>${jsObject.translations.phone}:</strong> ${this.groupMemberToView.phone}</li>
                        </ul>` : ''
                    }
                  </div>
                  <div>
                    <h3 class="brand-light">${jsObject.translations.progress}</h3>
                    <ul>
                        ${repeat(
                            Object.values(jsObject.training_items),
                          (training_item) => training_item.key,
                          this.renderTrainingItem
                        )}
                    </ul>
                  </div>
                </div>
            </div>
            <div
                class="reveal small"
                id="edit-session-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="d-flex gap-0 flex-wrap justify-content-center">
                        <h2>${jsObject.translations.edit}:</h2>
                        <h3 class="h2 brand-light">
                            ${this.sessionToEdit?.name}
                        </h3>
                    </div>
                    <calendar-select
                        style="--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)"
                        showToday
                        .selectedDays=${this.sessionToEdit?.date
                            ? [{ date: this.sessionToEdit.date }]
                            : []}
                        .highlightedDays=${this.getHighlightedDays()}
                        @day-added=${this.selectDay}
                    ></calendar-select>
                    <div
                        class="d-flex align-items-center justify-content-center gap--1"
                    >
                        <button
                            class="btn outline tight"
                            @click=${this.cancelEditingSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession
                                ? 'true'
                                : 'false'}
                        >
                            ${jsObject.translations.cancel}
                        </button>
                        <button
                            class="btn tight"
                            @click=${this.saveSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession
                                ? 'true'
                                : 'false'}
                        >
                            ${jsObject.translations.save}
                            <span
                                class="loading-spinner ${this.isSavingSession
                                    ? 'active'
                                    : ''}"
                            ></span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="reveal small"
                id="edit-session-details-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="d-flex gap-0 flex-wrap justify-content-center">
                        <h2>${jsObject.translations.edit}:</h2>
                        <h3 class="h2 brand-light">
                            ${jsObject.translations.group_details}
                        </h3>
                    </div>
                    <div>
                        <label for="location-note"
                            >${jsObject.translations.location}</label
                        >
                        <input class="input" type="text" id="location-note" />
                    </div>
                    <div>
                        <label for="time-of-day-note"
                            >${jsObject.translations.time}</label
                        >
                        <input
                            class="input"
                            type="text"
                            id="time-of-day-note"
                        />
                    </div>
                    ${this.isCoach()
                        ? html`
                              <div>
                                  <label for="language-note"
                                      >${jsObject.translations.language}</label
                                  >
                                  <input
                                      class="input"
                                      type="text"
                                      id="language-note"
                                  />
                              </div>
                              <div>
                                  <label for="timezone-note"
                                      >${jsObject.translations.timezone}</label
                                  >
                                  <input
                                      class="input"
                                      type="text"
                                      id="timezone-note"
                                  />
                              </div>
                          `
                        : ''}
                    <div>
                        <label for="zoom-link-note"
                            >${jsObject.translations.meeting_link}
                            (${jsObject.translations
                                .meeting_link_examples})</label
                        >
                        <input class="input" type="text" id="zoom-link-note" />
                    </div>
                    ${this.isCoach()
                        ? html`
                              <div>
                                  <label
                                      >${jsObject.translations
                                          .visibility}</label
                                  >
                                  <div class="cluster">
                                      <label class="form-control label-input">
                                          <input
                                              name="visibility"
                                              type="radio"
                                              id="public"
                                          />
                                          ${jsObject.translations.public_group}
                                      </label>
                                      <label class="form-control label-input">
                                          <input
                                              name="visibility"
                                              type="radio"
                                              id="private"
                                          />
                                          ${jsObject.translations.private_group}
                                      </label>
                                  </div>
                              </div>
                          `
                        : ''}
                    <div>
                        <label>${jsObject.translations.status}</label>
                        <div class="cluster">
                            <label class="form-control label-input">
                                <input name="status" type="radio" id="active" />
                                ${jsObject.translations.active}
                            </label>
                            <label class="form-control label-input">
                                <input
                                    name="status"
                                    type="radio"
                                    id="inactive"
                                />
                                ${jsObject.translations.inactive}
                            </label>
                        </div>
                    </div>
                    <div
                        class="d-flex align-items-center justify-content-center gap--1"
                    >
                        <button
                            class="btn outline tight"
                            @click=${this.closeEditSessionDetailsModal}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession
                                ? 'true'
                                : 'false'}
                        >
                            ${jsObject.translations.cancel}
                        </button>
                        <button
                            class="btn tight"
                            @click=${this.saveSessionDetails}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession
                                ? 'true'
                                : 'false'}
                        >
                            ${jsObject.translations.save}
                            <span
                                class="loading-spinner ${this.isSavingSession
                                    ? 'active'
                                    : ''}"
                            ></span>
                        </button>
                    </div>
                </div>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-trainings', DashTrainings)
