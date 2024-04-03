import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class VideoSlide extends CourseSlide {
    static get properties() {
        return {
            slide: { type: Object },
            showButtons: { type: Boolean },
        };
    }
    constructor() {
        super()
    }
    firstUpdated() {
        jQuery(document).foundation();
    }
    openMenu() {
        const menu = document.querySelector('#informationOffCanvas')
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = document.querySelector('#informationOffCanvas')
        jQuery(menu).foundation('close')
    }

    render() {
        return html`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn icon-btn absolute top ${this.dir === 'rtl' ? 'left' : 'right'} m-0 f-3 bypass-nav-click"
                    @click=${this.openMenu}
                >
                    <span class="icon zume-info"></span>
                </button>

                <div>
                    <iframe src="${this.slide['center'][0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>

                ${ this.showButtons === true ? html`
                     <!-- These buttons have no click handlers. They essentially give a space to allow the
                mouse click to trigger the click left/right side of screen event -->
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
                ` : '' }
            </div>
            <div class="stack | bg-white px-0 | information-flyout bypass-nav-click off-canvas ${this.dir === 'rtl' ? 'position-left' : 'position-right'} py-1" id="informationOffCanvas" data-off-canvas data-transition="overlap">
                <div class="stack">
                    <button class="close-button" aria-label="Close menu" type="button" data-close>
                      <span aria-hidden="true">&times;</span>
                    </button>

                    <p>
                        Video script goes here
                    </p>
                </div>
            </div>
        `;
    }
}
customElements.define('video-slide', VideoSlide);
