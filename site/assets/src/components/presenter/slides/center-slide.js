import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class CenterSlide extends CourseSlide {
    render() {
        return html`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover">
                    <h2 class="title text-center">${this.slide['center'][0] ?? ''} ${this.slide['length'] ?? ''}</h2>
                    <div class="center w-70">
                        <div class="stack activity-card">
                            ${this.renderContent(this.slide['left'], true)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('center-slide', CenterSlide);
