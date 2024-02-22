import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class TitleSlide extends CourseSlide {
    render() {
        return html`
            <div class="center">
                <div class="center-title">
                    <div><img src=${slide['center'][0]} /></div>
                    <h2>${slide['center'][1] }</h2>
                </div>
            </div>
        `;
    }
}
customElements.define('title-slide', TitleSlide);
