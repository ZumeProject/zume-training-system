import { LitElement, html, css } from 'lit';
import { range } from 'lit/directives/range.js'
import { map } from 'lit/directives/map.js'
import { DateTime } from 'luxon'

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
    ]

    static properties = {
        start_timestamp: {type: String},
        end_timestamp: {type: String},
        days: {type: Array},
        selected_times: {type: Array},
        timezone: {type: String},
        month_to_show: {attribute: false},
    }

    constructor() {
        super();
        this.month_to_show = null;
        this.start_timestamp = ''
        this.end_timestamp = ''
        this.days = []
        this.selected_times = []
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    next_view(month){
        this.month_to_show = month
        this.shadowRoot.querySelectorAll('.selected-time').forEach(e=>e.classList.remove('selected-time'))
    }

    day_selected(event, day){
        this.dispatchEvent(new CustomEvent('day-selected', {detail: day}));
        this.shadowRoot.querySelectorAll('.selected-time').forEach(element=>element.classList.remove('selected-time'))

        event.target.classList.add('selected-time');
    }
    get_days_of_the_week_initials(localeName = 'en-US', weekday = 'long') {
        const now = new Date()
        const day_in_milliseconds = 86400000
        const format = new Intl.DateTimeFormat(localeName, { weekday }).format
        return [...Array(7).keys()]
            .map((day) => format(new Date().getTime() - ( now.getDay() - day  ) * day_in_milliseconds  ))
    }

    build_calendar_days(month_date){
        const now = new Date().getTime()/1000
        const month_start = month_date.startOf('month').startOf('day');
        let month_days = []
        let this_month_days = this.days.filter(k=>k.month===month_date.toFormat('y_MM'));
        for ( let i = 0; i < month_date.daysInMonth; i++ ){
            let day_date = month_start.plus({days:i})
            let day = this_month_days.find(d=>d.key === day_date.toSeconds())
            let next_day = day_date.plus({days:1}).toSeconds()
            if ( !day ){
                day = {
                    key:day_date.toSeconds(),
                    day:i+1,
                }
            }
            day.disabled = next_day < now || (this.end_timestamp && day_date.toSeconds() > this.end_timestamp ) || next_day <= this.start_timestamp;
            month_days.push(day)
        }
        return month_days
    }
    escapeHTML(str) {
        if (typeof str === "undefined") return '';
        if (typeof str !== "string") return str;
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    render() {
        if ( !this.end_timestamp ){
            this.end_timestamp = this.days[this.days.length - 1].key
        }

        let selected_times = this.selected_times.map(t=>t.day_key);

        let week_day_names = this.get_days_of_the_week_initials(navigator.language, 'narrow')

        let now_date = DateTime.now({zone: this.timezone})
        let now = now_date.toSeconds();
        let month_date = DateTime.fromSeconds(this.month_to_show || Math.max(now, this.start_timestamp), { zone: this.timezone })
        let month_start = month_date.startOf('month')

        let month_days =  this.build_calendar_days(month_date)

        let first_day_is_weekday = month_start.weekday
        let previous_month = month_date.minus({months:1}).toSeconds()
        let next_month = month_start.plus({months:1}).toSeconds()

        return html`

            <div class="calendar-wrapper">
                <h3 class="month-title center">
                    <button
                        class="month-next"
                        ?disabled="${month_start.toSeconds() < now}"
                        @click="${e=>this.next_view(previous_month)}"
                    >
                        <
                    </button>
                    ${month_date.toFormat('MMMM y')}
                    <button
                        class="month-next"
                        ?disabled="${next_month > this.end_timestamp}"
                        @click="${e=>this.next_view(next_month)}"
                    >
                        >
                    </button>
                </h3>
                <div class="calendar">
                    ${
                        week_day_names.map( name => html`
                            <div class="day-cell week-day">
                                ${name}
                            </div>
                        `
                    )}
                    ${
                        map( range( first_day_is_weekday%7 ), i => html`
                            <div class="day-cell disabled-calendar-day"></div>
                        `
                    )}
                    ${
                        month_days.map(day => html`
                            <div
                                class="day-cell ${day.disabled ? 'disabled':''} ${selected_times.includes(day.key) ? 'selected-day':''}"
                                data-day=${this.escapeHTML(day.key)}
                                @click=${event => !day.disabled && this.day_selected(event, day.key)}
                            >
                                ${this.escapeHTML(day.day)}
                            </div>
                        `
                    )}
                </div>
            </div>
        `
    }
}
customElements.define('calendar-select', CalendarSelect);
