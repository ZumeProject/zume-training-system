import { LitElement, html } from 'lit';

export class CourseSession extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            sections: { type: Array },
        };
    }

    render() {
        return html`
            <h1>${this.title}</h1>
            ${this.sections.map((section, i) => {
                return html`
                    <course-section .section=${section}></course-section>
                `
            })}
        `;
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('course-session', CourseSession);
