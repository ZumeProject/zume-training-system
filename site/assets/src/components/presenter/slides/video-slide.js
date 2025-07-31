import { html } from 'lit';
import { CourseSlide } from './course-slide';

export class VideoSlide extends CourseSlide {
    static get properties() {
        return {
            slide: { type: Object },
            showButtons: { type: Boolean },
            id: { type: String },
            scriptUrl: { type: String, attribute: false },
            altVideoUrl: { type: String, attribute: false },
            offCanvasId: { type: String, attribute: false },
            loading: { type: Boolean, attribute: false },
            showTitleMessage: { type: Boolean },
            titleMessage: { type: String },
        };
    }

    connectedCallback() {
        super.connectedCallback()

        this.useAltVideo = window.zumeApiShare.getCookie('zume_video_available') ? false : true

        this.handleLoad = this.handleLoad.bind(this)
    }

    async firstUpdated() {
        jQuery(this.renderRoot).foundation();

        this.offCanvasId = 'informationOffCanvas' + this.id
        this.iframeId = 'iframe' + this.id
        this.offCanvasSelector = '#' + this.offCanvasId
        this.altVideoUrl = jsObject.mirror_url + jsObject.language + '/' + this.slide.alt_video_id + '.mp4'

        if (this.isScreenshotMode && this.slide) {
            console.log('VideoSlide firstUpdated - setting title message');
            this.setTitleMessage();
        }

        await this.loadScriptIntoFrame()

        super.firstUpdated()
    }

    openMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('open')
    }
    closeMenu() {
        const menu = document.querySelector(this.offCanvasSelector)
        jQuery(menu).foundation('close')
    }

    async loadScriptIntoFrame() {
        this.loading = true
        const scriptId = this.slide.script_id
        const lang_code = jsObject.language

        const url = new URL(location.href)
        const scriptUrl = new URL(url.origin)
        scriptUrl.pathname = [ lang_code, 'app', 'script' ].join('/')
        scriptUrl.searchParams.append('s', scriptId)


        await this.updateComplete

        const iframe = this.getIframe()
        if (iframe) {
            iframe.onload = this.handleLoad
        } else {
            console.error('no iframe to attach onload to')
        }

        this.scriptUrl = scriptUrl.href
    }
    getIframe() {
        return this.renderRoot.querySelector(`#${this.offCanvasId} iframe`)
    }
    handleLoad() {
        this.loading = false

        if ( /iPod|iPhone|iPad/.test(navigator.userAgent) ) {
            const iframe = this.getIframe()

            const parent = iframe.parentElement

            parent.style.height = window.innerHeight + 'px'
        }
    }

    shouldAutoplay() {
        if (!this.inContainer) {
            return true
        }
        return false
    }

    maybeRemoveAutoplay(videoUrl) {
        if (this.shouldAutoplay()) {
            return videoUrl
        }

        if (!videoUrl) {
            return ''
        }

        const url = new URL(videoUrl)

        url.searchParams.delete('autoplay')

        return url.href
    }

    render() {
        return html`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn tight outline align-items-center absolute top ${this.dir === 'rtl' ? 'left' : 'right'} z-1 m--1 bypass-nav-click d-flex gap--2"
                    @click=${this.openMenu}
                >
                    <span class="icon z-icon-info"></span>
                    <span class="script-button__text">${jsObject.translations.view_script}</span>
                </button>

                <div class="widescreen flex-video">
                    ${
                        this.showTitleMessage ? html`
                            <div class="video-replacement-message">
                                <h1>${this.titleMessage} - Video ID: ${this.slide.alt_video_id}</h1>
                            </div>
                        ` : this.useAltVideo ? html`
                            <video
                                style="border: 1px solid lightgrey;max-width:100%;"
                                poster=${jsObject.images_url + '/video-thumb.jpg'}
                                controls
                                ?autoplay=${this.shouldAutoplay()}
                            >
                                <source src=${this.altVideoUrl || ''} type="video/mp4">
                                Your browser does not support the video tag.
                                <a href=${this.altVideoUrl || ''}>${jsObject.translations.watch_this_video}</a>
                            </video>
                        ` : html`
                            <iframe src="${this.maybeRemoveAutoplay(this.slide['center'][0])}"
                                frameborder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                            >
                            </iframe>
                        `
                    }
                </div>
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir === 'rtl' ? 'position-left' : 'position-right'}"
                id=${this.offCanvasId || "informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <div class="ms-auto absolute ${this.dir === 'rtl' ? 'left' : 'right'} top">
                    <button class="close-btn | my--2 mx-1 f-0" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
                ${
                    this.loading ? html`
                        <div class="cover-page">
                            <div class="center"><span class="loading-spinner active"></span></div>
                        </div>
                    ` : ''
                }
                <iframe
                    id=${this.iframeId || 'iframe'}
                    src=${this.scriptUrl || ''}
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        `;
    }
}
customElements.define('video-slide', VideoSlide);
