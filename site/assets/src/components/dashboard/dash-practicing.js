import { LitElement, html } from 'lit';
import { DashBoard } from './dash-board';

export class DashPracticing extends LitElement {

    constructor() {
        super()
        this.routeName = 'practicing'
        this.route = DashBoard.getRoute(this.routeName)
        this.routes = DashBoard.childRoutesOf(this.routeName)
    }

    render() {
        return html`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="selected" data-id="list">
                            <span class="icon zume-list" aria-hidden="true"></span>
                            <span class="visually-hidden">${zumeDashboard.translations.list}</span>
                        </button>
                        <button data-id="grid">
                            <span class="icon zume-grid" aria-hidden="true"></span>
                            <span class="visually-hidden">${zumeDashboard.translations.grid}</span>
                        </button>
                    </div>
                </div>
                <div class="dashboard__header right">
                    <launch-course></launch-course>
                </div>
                <div class="dashboard__main p-1">
                    <div class="nav-grid">
                        ${this.routes.map((route) => html`
                            <grid-link
                                href=${route.pattern}
                                text=${route.translation || ''}
                                icon=${route.icon}
                            >
                            </grid-link>
                        `)}
                    </div>
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
customElements.define('dash-practicing', DashPracticing);
