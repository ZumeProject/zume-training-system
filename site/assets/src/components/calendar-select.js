import { LitElement, html, css } from 'lit';

export class CalendarSelect extends LitElement {
    static styles = [
        css`
          :host {
            display: block;
            container-type: inline-size;
            container-name: calendar;
          }
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 14cqw);
          }
          .day-cell {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 40px;
          }
          .day-cell:hover {
            background-color: #4676fa1a;
            cursor: pointer;
            border-radius: 50%;
          }
          .day-cell.disabled-calendar-day {
            color:lightgrey;
            cursor: not-allowed;
          }
          .week-day {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 40px;
            font-weight: bold;
            font-size:clamp(0.75em, 0.65rem + 2cqi, 1em);
          }
          .selected-time {
            color: black;
            border-radius: 50%;
            border: 2px solid;
            background-color: #4676fa1a;
          }
          .selected-day {
            color: white;
            border-radius: 50%;
            border: 2px solid;
            background-color: var(--cp-color);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            max-width: 280px;
            font-size: 1.2rem;
          }
          .month-next {
            padding: 0.25rem 0.5rem;
          }
        `,
        window.campaignStyles
    ]

    static properties = {
        start_timestamp: {type: String},
        end_timestamp: {type: String},
        days: {type: Array},
        selected_times: {type: Array},
    }

    constructor() {
        super();
        this.month_to_show = null;
        this.start_timestamp = window.campaign_data.start_timestamp
        this.end_timestamp = window.campaign_data.end_timestamp
        this.days = window.campaign_scripts.days
        this.selected_times = []
    }

    connectedCallback(){
        super.connectedCallback();
        //get days from days ready event
        window.addEventListener('campaign_days_ready', e=>{
            this.days = e.detail
            this.requestUpdate()
        })
    }

    next_view(month){
        this.month_to_show = month
        this.requestUpdate()
        //remove all selected-time css
        this.shadowRoot.querySelectorAll('.selected-time').forEach(e=>e.classList.remove('selected-time'))
    }

    day_selected(month, day){
        //dispatch event
        this.dispatchEvent(new CustomEvent('day-selected', {detail: day}));
        //highlight selected day
        this.shadowRoot.querySelectorAll('.selected-time').forEach(e=>e.classList.remove('selected-time'))

        month.target.classList.add('selected-time');
    }


    render() {
        if ( this.days.length === 0 ){
            return html`<div></div>`
        }
        if ( !this.end_timestamp ){
            this.end_timestamp = this.days[this.days.length - 1].key
        }

        let selected_times = this.selected_times.map(t=>t.day_key);

        let week_day_names = window.campaign_scripts.get_days_of_the_week_initials(navigator.language, 'narrow')

        let now_date = window.luxon.DateTime.now({zone:window.campaign_user_data.timezone})
        let now = now_date.toSeconds();
        let month_date = window.luxon.DateTime.fromSeconds(this.month_to_show || Math.max(this.days[0].key, now, window.campaign_data.start_timestamp), {zone:window.campaign_user_data.timezone})
        let month_start = month_date.startOf('month')

        let month_days =  window.campaign_scripts.build_calendar_days(month_date)

        let first_day_is_weekday = month_start.weekday
        let previous_month = month_date.minus({months:1}).toSeconds()
        let next_month = month_start.plus({months:1}).toSeconds()

        return html`

            <div class="calendar-wrapper">
                <h3 class="month-title center">
                    <button class="month-next" ?disabled="${month_start.toSeconds() < now}"
                            @click="${e=>this.next_view(previous_month)}">
                        <
                    </button>
                    ${month_date.toFormat('MMMM y')}
                    <button class="month-next" ?disabled="${next_month > this.end_timestamp}" @click="${e=>this.next_view(next_month)}">
                        >
                    </button>
                </h3>
                <div class="calendar">
                    ${week_day_names.map(name=>html`<div class="day-cell week-day">${name}</div>`)}
                    ${map(range(first_day_is_weekday%7), i=>html`<div class="day-cell disabled-calendar-day"></div>`)}
                    ${month_days.map(day=>{
                        return html`
                            <div class="day-cell ${day.disabled ? 'disabled':''} ${selected_times.includes(day.key) ? 'selected-day':''}"
                               data-day="${window.campaign_scripts.escapeHTML(day.key)}"
                               @click="${e=>!day.disabled&&this.day_selected(e, day.key)}"
                            >
                                ${window.campaign_scripts.escapeHTML(day.day)}
                            </div>`
                    })}
                </div>
            </div>
            `
   }
}
customElements.define('calendar-select', CalendarSelect);
