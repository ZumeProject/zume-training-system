import { LitElement, html } from 'lit';

export class CourseSlide extends LitElement {
    static get properties() {
        return {
            slide: { type: Object },
            showButtons: { type: Boolean },
            id: { type: String },
            dir: { type: String },
            inContainer: { type: Boolean },
            isScreenshotMode: { type: Boolean, attribute: false },
            videoInfo: { type: Object, attribute: false },
            showTitleMessage: { type: Boolean, attribute: false },
            titleMessage: { type: String, attribute: false },
        };
    }

    constructor() {
        super()

        this.maxPercentage = 80
        this.inContainer = false
        this.showButtons = true
        this.dir = 'ltr'
        this.isScreenshotMode = false
        this.videoInfo = {}
        this.showTitleMessage = false
        this.titleMessage = ''

        this.resizeCallback = this.resizeCallback.bind(this)
    }

    connectedCallback() {
        super.connectedCallback()
        this.dir = document.querySelector('html').dir
        window.addEventListener('resize', this.resizeCallback)

        // Get video information first
        this.getVideoInfo()

        // Then check for screenshot mode - this will also handle title message functionality
        this.checkScreenshotMode()
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('resize', this.resizeCallback)
    }
    firstUpdated() {
        // If screenshot mode is enabled, set the title message now that slide data is available
        if (this.isScreenshotMode) {
            this.setTitleMessage()
        }

        this.resizeSlide(window)
        this.fitContentToSlide('.activity-card')
        this.fitContentToSlide('.content-area__text')
    }
    resizeCallback(event) {
        this.resizeSlide(event.currentTarget)
    }
    fitContentToSlide(selector) {
        const contentArea = this.renderRoot.querySelector(selector)
        const slide = this.renderRoot.querySelector('.slides-card')

        if (!contentArea || !slide) {
            return
        }

        const contentAreaHeight = contentArea.getBoundingClientRect().height

        const parentElementTop = contentArea.parentElement.getBoundingClientRect().top
        const slideTop = slide.getBoundingClientRect().top
        const slideHeight = slide.getBoundingClientRect().height

        const spaceAvailable = slideHeight - ( parentElementTop - slideTop )

        const percentageOfSlideHeight = contentAreaHeight / spaceAvailable * 100

        if (percentageOfSlideHeight > this.maxPercentage) {
            /* CurrentFontRatio is hardcoded to match the ratio currently in presenter.scss as --font-size-ratio */
            const currentFontRatio = 2
            const newFontSize = currentFontRatio * this.maxPercentage / percentageOfSlideHeight
            contentArea.style.fontSize = `calc( var(--slide-unit) * ${newFontSize} )`
        }
    }
    resizeSlide(target) {
        const normalSlides = document.querySelectorAll('.slides-card')

        const videoSlides = document.querySelectorAll('.video-slide')

        const slides = [...normalSlides, ...videoSlides]

        const { innerWidth: screenWidth, innerHeight: screenHeight } = target

        const isScreenWiderThanSlide = this.inContainer
            ? screenWidth / screenHeight > 16/10
            : screenWidth / screenHeight > 16/9

        let slideHeight
        let slideWidth

        if (isScreenWiderThanSlide) {
            slideHeight = screenHeight
            slideWidth = screenHeight * 16 / 9

            if (this.inContainer && slideWidth > screenWidth * 90 / 100 + 12) {
                slideWidth = screenWidth * 90 / 100 + 12
                slideHeight = slideWidth * 9 / 16
            }

        } else {
            slideWidth = screenWidth

            if (this.inContainer) {
                slideWidth = screenWidth * 90 / 100 + 12
            }

            slideHeight = slideWidth * 9 / 16
        }

        const slideUnit = slideWidth / 100

        slides.forEach((slide) => {
            slide.style = `
                --slide-unit: ${slideUnit}px;
                --slide-height: ${slideHeight}px;
                --slide-width: ${slideWidth}px;
            `
        })
    }

    renderProgressBar() {
        let progress_bar = []
        let stage = []
        for (let i = 0; i < this.slide.progress_bar.length; i++) {
            const item = this.slide.progress_bar[i];
            if (item === false) {
                progress_bar.push(stage)
                progress_bar.push(false)
                stage = []
                continue
            }
            stage.push(item)
        }
        progress_bar.push(stage)

        return html`
            <div class="stage ${this.slide['key']}-bar">
                <div class="progress-bar-wrapper">
                    ${progress_bar.map((stage) => {
                        if ( !stage ) {
                            return html`<div class="progress-bar-divider"></div>`
                        }
                        return html`
                            <div class="progress-bar-stage">
                                ${stage.map((item) => html`
                                    <div class="progress-bar-item ${this.slide.key === item ? 'active' : ''}"></div>
                                `)}
                            </div>
                        `
                    })}
                </div>
            </div>
        `
    }

    renderContent(stack = [], boldFirst = false, boldAll = false) {
        return stack.map((item, i) => {
            if ((boldFirst && i === 0)) {
                return html`<p><strong>${item}</strong></p>`
            }
            if (Array.isArray(item)) {
                return html`
                    <ul class="bullets">
                        ${
                            item.map((listItem) => html`<li>${listItem}</li>`)
                        }
                    </ul>
                `
            }
            if (boldAll) {
                return html`<p><strong>${item}</strong></p>`
            }
            return html`<p>${item}</p>`
        })
    }

    render() {
        return html`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `
    }

    createRenderRoot() {
        return this
    }

    checkScreenshotMode() {
        const url = new URL(window.location.href);
        this.isScreenshotMode = url.searchParams.has('screenshot');

        if (this.isScreenshotMode) {
            this.addScreenshotStyles();
            this.showTitleMessage = true;
        }
    }

    addScreenshotStyles() {
        if (document.getElementById('screenshot-styles')) {
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = 'screenshot-styles';

        styleElement.textContent = `
            .btn { display: none !important; }
            #hamburger-menu { display: none !important; }
            .flex-video iframe { display: none !important; }
            .visual-indicator { display: none !important; }
            .video-replacement-message h1 { font-size: 3rem !important; }
        `;

        document.head.appendChild(styleElement);

        console.log('Screenshot mode enabled');
    }

    getVideoInfo() {
        // Initialize empty video info map
        this.videoInfo = {};

        // First try to use zumeTrainingItems from presenter.php
        if (zumeTrainingItems) {
            try {
                // Process each item in zumeTrainingItems
                Object.keys(zumeTrainingItems).forEach(key => {
                    const item = zumeTrainingItems[key];

                    // Store video info if video_id and title exist
                    if (item && item.video_id && item.title_en) {
                        this.videoInfo[item.video_id] = {
                            title: item.title_en,
                            title_en: item.title_en || item.title
                        };
                    }
                });
            } catch (error) {
                console.error('Error processing video information:', error);
            }
        }
    }

    setTitleMessage() {
        let message = 'Video content is not available in this view.';

        if (this.slide) {
            let videoId = this.slide.alt_video_id;
            message = zumeTrainingItems[videoId].title_en;
        }

        this.titleMessage = message;
    }
}
customElements.define('course-slide', CourseSlide);
