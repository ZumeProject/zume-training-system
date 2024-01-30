import { LitElement, html } from 'lit';

export class DashPlans extends LitElement {

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header">
                    <h1 class="h3">Plans</h1>
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main">
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-plans', DashPlans);
