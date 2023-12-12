export class WizardStateManager {
    WIZARD_STATE = 'zume_wizard_state'
    MAX_LIFESPAN = 1 * 60 * 1000

    constructor(moduleName) {
        this.moduleName = moduleName

        this.wizardState = this.init()
    }

    init() {
        const existingState = this.get()

        if ( existingState && Date.now() - existingState.timestamp < this.MAX_LIFESPAN ) {
            return existingState
        }

        return ({
            module: this.moduleName,
            data: {},
            timestamp: Date.now(),
        })
    }

    exists() {
        return localStorage.getItem(this.WIZARD_STATE) ? true : false
    }

    get() {
        return JSON.parse(localStorage.getItem(this.WIZARD_STATE))
    }

    add(key, value) {
        this.wizardState.data[key] = value

        localStorage.setItem(this.WIZARD_STATE, JSON.stringify(this.wizardState))
    }

    clear() {
        this.wizardState = null
        localStorage.removeItem(this.WIZARD_STATE)
    }
}