import { LitElement, html } from 'lit';

export class DashTraining extends LitElement {

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <h1 class="h3">Training</h1>
                </div>
                <div class="dashboard__header right">
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-training', DashTraining);
