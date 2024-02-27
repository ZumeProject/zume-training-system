import { LitElement, html } from 'lit';

export class CourseSlideshow extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            sections: { type: Array },
            sectionIndex: { attribute: false },
            partIndex: { attribute: false },
            currentSlide: { attribute: false },
            index: { attribute: false },
        };
    }

    constructor() {
        super()
        this.reset();

        this.listenForKeyboard = this.listenForKeyboard.bind(this)
        this.listenForMouseClick = this.listenForMouseClick.bind(this)
    }

    reset() {
        this.sectionIndex = -1;
        this.currentSlide = null;
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('keydown', this.listenForKeyboard)
        document.addEventListener('mousedown', this.listenForMouseClick)
    }
    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('keydown', this.listenForKeyboard)
        document.removeEventListener('mousedown', this.listenForMouseClick)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'title' && oldValue !== newValue) {
            this.reset()
        }
    }

    nextSlide() {
        if ( this.sectionIndex > this.sections.length - 1 ) {
            this.sectionIndex = this.sections.length - 1
            return
        }

        this.setSlide(this.sectionIndex + 1)
    }
    previousSlide() {
        if ( this.sectionIndex < 0 ) {
            this.sectionIndex = 0
        }

        this.setSlide(this.sectionIndex - 1)
    }
    listenForKeyboard(event) {
        if ( [ 'Space', 'ArrowRight' ].includes(event.code) ) {
            this.nextSlide()
        }
        if ( [ 'Backspace', 'ArrowLeft' ].includes(event.code) ) {
            this.previousSlide()
        }
    }
    listenForMouseClick(event) {
        const { x } = event
        const { innerWidth } = window

        const threshhold = 10 / 100 * innerWidth + 80

        if ( x < threshhold ) {
            this.querySelector('.clickable-area.back').classList.add('visible')
            this.previousSlide()
        }

        if ( x > innerWidth - threshhold ) {
            this.querySelector('.clickable-area.forward').classList.add('visible')
            this.nextSlide()
        }
    }

    setSlide(sectionIndex) {
        this.sectionIndex = sectionIndex
        const slide = this.sections[sectionIndex]
        this.currentSlide = slide
    }

    render() {
        if ( this.sectionIndex < 0 ) {
            this.setSlide(0)
        }
        console.log(this.sections)
        return html`
            <div class="">
                <div class="slides-card">
                    <div class="stage ${this.currentSlide['key']}-bar"></div>
                    <slide-switcher .slide=${this.currentSlide}></slide-switcher>
                </div>
            </div>


            <div class="clickable-area back">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡰</span>
            </div>
            <div class="clickable-area forward">
                <div class="absolute top bottom left right bg-gray-500 opacity-50"></div>
                <span class="absolute middle center brand f-3">🡲</span>
            </div>

        `;
    }

    /**
     * Disable the shadow DOM
     */
    createRenderRoot() {
        return this;
    }
}
customElements.define('course-slideshow', CourseSlideshow);
