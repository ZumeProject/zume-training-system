import { LitElement, html } from 'lit';

export class CourseSlide extends LitElement {
    static get properties() {
        return {
            slide: { type: Object },
        };
    }

    render() {
        return html``
    }

    createRenderRoot() {
        return this
    }
}
