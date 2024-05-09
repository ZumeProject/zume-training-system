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
          .calendar-wrapper {
            --cp-color: var(--primary-color, #489bfa);
            --cp-hover-color: var(--hover-color, #4676fa1a);
          }
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            row-gap: 4px;
            justify-items: center;
          }
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: transparent;
            transition: background-color 100ms linear;
          }
          .day.cell:hover {
            background-color: var(--cp-hover-color);
            cursor: pointer;
          }
          .day.cell.disabled  {
            color:lightgrey;
            cursor: default;
          }
          .day.cell.disabled:hover {
            background-color: transparent;
          }
          .week-day {
            font-weight: 600;
            font-size:clamp(0.75em, 0.65rem + 2cqi, 1em);
          }
          .selected-time {
            color: black;
            border-color: var(--cp-color);
            background-color: var(--cp-hover-color);
          }
          .selected-day {
            color: white;
            background-color: var(--cp-color);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            font-weight: 600;
            grid-column: 2 / 7;
            margin-block: 0;
          }
          .month-next {
            padding: 0.2rem 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .month-next svg {
            width: 1.5rem;
          }
          button {
            padding: 0.25rem 0.5rem;
            color: rgb(254, 254, 254);
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid transparent;
            font-weight: normal;
            padding: 0.85rem 1rem;
            cursor: pointer;
            background-color: var(--cp-color);
            line-height: 1;
            transition: all 100ms linear;
          }
          button:not([disabled]):hover {
            background-color: transparent;
            border-color: var(--cp-color);
            color: var(--cp-color);
          }
          button[disabled] {
            opacity: 0.25;
            cursor: default;
          }
        `,
    ]

    static properties = {
        start_timestamp: { type: String },
        end_timestamp: { type: String },
        days: {type: Array},
        selected_times: { type: Array },
        month_to_show: { attribute: false },
    }

    constructor() {
        super();
        this.month_to_show = null;
        this.start_timestamp = ''
        this.end_timestamp = ''
        this.days = []
        this.selected_times = []
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

    build_calendar_days(localeName = 'en-US', month_date){
        const now = new Date().getTime()/1000
        const month_start = month_date.startOf('month').startOf('day');
        let month_days = []
        let this_month_days = this.days.filter(k=>k.month===month_date.toFormat('y_MM'));
        const format = new Intl.DateTimeFormat(localeName, { day: 'numeric' }).format
        for ( let i = 0; i < month_date.daysInMonth; i++ ){
            let day_date = month_start.plus({days:i})
            let day = this_month_days.find(d=>d.key === day_date.toSeconds())
            let next_day = day_date.plus({days:1}).toSeconds()
            if ( !day ){
                day = {
                    key:day_date.toSeconds(),
                    day:i+1,
                    formatted: format(day_date.toMillis()),
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

        let now_date = DateTime.now({locale: navigator.language})
        let now = now_date.toSeconds();
        let month_date = DateTime.fromSeconds(this.month_to_show || Math.max(now, this.start_timestamp), { locale: navigator.language })
        let month_start = month_date.startOf('month')

        let month_days =  this.build_calendar_days(navigator.language, month_date)

        let first_day_is_weekday = month_start.weekday
        let previous_month = month_date.minus({ months: 1 }).toSeconds()
        let next_month = month_start.plus({ months: 1 }).toSeconds()

        return html`

            <div class="calendar-wrapper">
                <div class="calendar">
                    <button
                        class="month-next"
                        ?disabled="${month_start.toSeconds() < now}"
                        @click="${e=>this.next_view(previous_month)}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L8 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h3 class="month-title center">
                        ${month_date.toFormat('LLLL y')}
                    </h3>
                    <button
                        class="month-next"
                        ?disabled="${next_month > this.end_timestamp}"
                        @click="${e=>this.next_view(next_month)}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M10 6L17 12L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${
                        week_day_names.map( name => html`
                            <div class="cell week-day">
                                ${name}
                            </div>
                        `
                    )}
                    ${
                        map( range( first_day_is_weekday%7 ), i => html`
                            <div class="cell"></div>
                        `
                    )}
                    ${
                        month_days.map(day => html`
                            <div
                                class="cell day ${day.disabled ? 'disabled':''} ${selected_times.includes(day.key) ? 'selected-day':''}"
                                data-day=${this.escapeHTML(day.key)}
                                @click=${event => !day.disabled && this.day_selected(event, day.key)}
                            >
                                ${this.escapeHTML(day.formatted)}
                            </div>
                        `
                    )}
                </div>
            </div>
        `
    }
}
customElements.define('calendar-select', CalendarSelect);
