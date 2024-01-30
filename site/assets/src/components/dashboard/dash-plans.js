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
                    <ul class="list">
                        <li class="list__item">
                            <h2 class="f-1">I will</h2>
                        </li>
                        <li class="list__item">
                            <span>Share my story and God's story with [person]</span>
                            <div>
                                <span class="zume-check-mark success"></span>
                                <span>kebab</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-plans', DashPlans);
