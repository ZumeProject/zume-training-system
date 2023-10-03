import { LitElement, html } from "lit"


const ZumeWizards = {
    makeAPlan: 'make-a-plan',
    connectToCoach: 'connect-to-coach',
}
const ZumeWizardModules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    connectToCoach: 'connectToCoach',
}

export class Wizard extends LitElement {
    static get properties() {
        return {
            /**
             * The wizard type
             */
            type: { type: String }
        }
    }

    constructor() {
        super()
        this.stepIndex = 0
        this.steps = []
        this.modules = {}
    }

    render() {
        if (!this.isWizardLoaded()) {
            this.loadWizard()
        }

        return html`
        <div class="stack | s5">

            ${this.currentStep()}
            ${this.navigationButtons()}

        </div>
        `
    }

    currentStep() {
        if ( this.stepIndex > this.steps.length - 1 ) {
            this.stepIndex = this.steps.length - 1
        }
        if ( this.stepIndex < 0 ) {
            this.stepIndex = 0
        }

        const currentStep = this.steps[this.stepIndex]

        return currentStep.component(currentStep)
    }

    navigationButtons() {
        return html`
        <div>
            <a href="#" class="btn">Back</a>
            <a href="#" class="btn">Next</a>
            <a href="#" class="btn">Skip</a>
        </div>
        `
    }

    getModule( moduleName, skippable = false ) {
        const modules = {
            [ZumeWizardModules.completeProfile]: {
                steps: [
                    {
                        slug: 'update-your-profile',
                        component: (step) => html`
                            <h1>Complete your Profile</h1>
                            <div>
                                <p>This is part of ${step.module}</p>
                                <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                            </div>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.makePlan]: {
                steps: [
                    {
                        slug: 'make-your-plan',
                        component: (step) => html`
                            <h1>Make your plan</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'what-time-of-day',
                        component: (step) => html`
                            <h1>what Time of Day</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'how-many-sessions',
                        component: (step) => html`
                            <h1>How Many Sessions</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.inviteFriends]: {
                steps: [
                    {
                        slug: 'invite-your-friends',
                        component: (step) => html`
                            <h1>Invite your friends</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                    {
                        slug: 'via-what-method',
                        component: (step) => html`
                            <h1>Use this QR or link or we can email them to you.</h1>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
            [ZumeWizardModules.connectToCoach]: {
                steps: [
                    {
                        slug: 'connected-to-coach',
                        component: (step) => html`
                            <h1>You are now connected to a coach</h1>
                            <p>One of our team will contact you in the next 24-48 hours</p>
                            <p>This is part of ${step.module}</p>
                            <p>This module/step(?) is ${step.skippable ? '' : 'not '}skippable</p>
                        `
                    },
                ],
                skippable,
            },
        }

        const moduleNames = Object.keys(modules)

        if ( !moduleNames.includes(moduleName) ) {
            return modules[ZumeWizardModules.completeProfile]
        }

        return modules[moduleName]
    }

    isWizardLoaded() {
        return Object.keys(this.modules).length !== 0
    }

    loadWizard() {
        const wizard = this.getWizard()
        this.modules = wizard
        this.steps = []
        console.log(wizard)
        Object.entries(this.modules).forEach(([moduleName, { steps, skippable }]) => {
            steps.forEach(({ component, slug }) => {
                const step = {
                    component,
                    slug,
                    module: moduleName,
                    skippable,
                }

                this.steps.push(step)
            })
        })
    }

    isWizardTypeValid() {
        const wizardTypes = Object.values(ZumeWizards)

        console.log('wizardTypes = ', wizardTypes, ' type =', this.type)

        if (!wizardTypes.includes(this.type)) {
            return false
        }

        return true
    }

    getWizard() {
        if (!this.isWizardTypeValid()) {
            return {}
        }

        const wizards = {
            [ZumeWizards.makeAPlan]: {
                [ZumeWizardModules.completeProfile]: this.getModule(ZumeWizardModules.completeProfile, true),
                [ZumeWizardModules.makePlan]: this.getModule(ZumeWizardModules.makePlan, true),
                [ZumeWizardModules.inviteFriends]: this.getModule(ZumeWizardModules.inviteFriends, true),
            },
            [ZumeWizards.connectToCoach]: {
                [ZumeWizardModules.completeProfile]: this.getModule(ZumeWizardModules.completeProfile),
                [ZumeWizardModules.connectToCoach]: this.getModule(ZumeWizardModules.connectToCoach),
            },
        }

        return wizards[this.type]
    }



    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}

window.customElements.define( 'zume-wizard', Wizard )