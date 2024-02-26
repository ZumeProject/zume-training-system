import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class TitleSlide extends CourseSlide {
    render() {
        return html`
            <div class="cover | presenter__title-slide | text-center">
                <div class="stack-1 | w-100">
                    <div class="center | w-40"><img src=${this.slide['center'][0]} /></div>
                    <h2>${this.slide['center'][1]}</h2>
                </div>
            </div>
        `;
    }
}
customElements.define('title-slide', TitleSlide);
