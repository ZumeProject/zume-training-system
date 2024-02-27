import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class VideoSlide extends CourseSlide {
    render() {
        return html`
            <div class="video-slide">
                <iframe src="${this.slide['center'][0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                >
                </iframe>
            </div>
        `;
    }
}
customElements.define('video-slide', VideoSlide);
