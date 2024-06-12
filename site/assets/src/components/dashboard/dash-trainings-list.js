import { LitElement, html } from 'lit';

export class DashTrainingsList extends LitElement {

    render() {
        return html`
            <h1>Trainings List</h1>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('dash-trainings-list', DashTrainingsList);
