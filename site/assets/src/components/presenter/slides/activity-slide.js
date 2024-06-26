import { html } from 'lit'
import { CourseSlide } from './course-slide'

export class ActivitySlide extends CourseSlide {
    static get properties() {
        return {
            slide: { type: Object },
            id: { type: String },
            offCanvasId: { type: String, attribute: false },
        };
    }

    firstUpdated() {
        jQuery(this.renderRoot).foundation();

        this.offCanvasId = 'activityOffCanvas' + this.id
        this.offCanvasSelector = '#' + this.offCanvasId

        super.firstUpdated()
    }

    openMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        console.log(menu, this.offCanvasSelector)
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('close')
    }


    render() {
        return html`
            <div class="slides-card activity-slide | position-relative">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <button
                        type="button"
                        class="btn icon-btn absolute top ${this.dir === 'rtl' ? 'left' : 'right'} z-1 m-0 f-0 bypass-nav-click d-flex gap--2"
                        @click=${this.openMenu}
                    >
                        <span class="icon z-icon-info"></span><span>${jsObject.translations.view_activity}</span>
                    </button>
                    <h2 class="title text-center" data-small>${this.slide['center'][0]} ${this.slide['length']}</h2>
                    <div class="two-column right">
                        <div>
                            <div class="activity-card | stack--2" data-expanded-padding>
                                ${this.renderContent(this.slide['left'], true)}
                            </div>
                        </div>
                        <div class="content-area">
                            <div class="stack center | text-center">
                                <div class="qr-code"><a href="${this.slide['right'][0]}" target="_blank" class="bypass-nav-click"><img src="${this.slide['right'][1]}" /></a></div>
                                <p>${this.slide['right'][2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white | activity-flyout bypass-nav-click off-canvas ${this.dir === 'rtl' ? 'position-left' : 'position-right'}"
                    id=${this.offCanvasId || "activityOffCanvas"}
                    data-off-canvas
                    data-transition="overlap"
                >
                    <button class="close-btn | ms-auto absolute ${this.dir === 'rtl' ? 'left' : 'right'} top my--2 mx-1 f-0 invert" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon z-icon-close"></span>
                    </button>

                    <iframe
                        src=${this.slide['right'][0] || ''}
                        frameborder="0"
                        width="100%"
                    >
                    </iframe>
                </div>
            </div>
        `
    }
}
customElements.define('activity-slide', ActivitySlide )
