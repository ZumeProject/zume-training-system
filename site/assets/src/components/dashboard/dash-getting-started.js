import { DashTopLevel } from "./dash-top-level";

/**
 * The links for the getting started page are controlled by the routes.js file
 * DashTopLevel will render the links children of the 'getting-started' route
 */
export class DashGettingStarted extends DashTopLevel {
    constructor() {
        super('getting-started')
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-getting-started', DashGettingStarted);
