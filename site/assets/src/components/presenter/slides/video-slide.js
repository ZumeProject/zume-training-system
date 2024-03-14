import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class VideoSlide extends CourseSlide {
    constructor() {
        super()

    }

    sendNavigateEvent(direction = 'forwards') {
        console.log(direction)
        const dir = direction === 'forwards' ? 'forwards' : 'backwards'
        const event = new CustomEvent( `navigateSlide-${dir}` , { bubbles: true })
        this.dispatchEvent(event)
    }

    render() {
        return html`
            <div class="video-slide">
                <div>
                    <iframe src="${this.slide['center'][0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>
                <button
                    type="button"
                    class="btn icon-btn absolute middle left mx-0"
                >
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.previous_slide}
                        class="svg white rotate-90 w-1rem h-1rem"
                    />
                </button>
                <button
                    type="button"
                    class="btn icon-btn absolute middle right mx-0"
                >
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.next_slide}
                        class="svg white rotate--90 w-1rem h-1rem"
                    />
                </button>
            </div>
        `;
    }
}
customElements.define('video-slide', VideoSlide);
