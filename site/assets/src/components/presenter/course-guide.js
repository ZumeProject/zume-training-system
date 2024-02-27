import { LitElement, html } from 'lit';

export class CourseGuide extends LitElement {
    static get properties() {
        return {
            sections: { type: Array },
        };
    }

    render() {
        return html`
            <div class="container">
                <div class="stack | mb-5">
                    ${this.sections.map((slide, i) => {
                        return html`
                            <slide-switcher .slide=${slide}></slide-switcher>
                        `
                    })}
                </div>
            </div>
        `
    }
    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }

}
customElements.define('course-guide', CourseGuide);
