import { LitElement, html, css } from 'lit';

export class CalendarList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    /*
        Display list of editable dates and clear buttons
        date and 'add' button to add to the list.
    */
    render() {
        return html`
            <div class="stack">

            </div>
        `;
    }
}
customElements.define('calendar-list', CalendarList);
