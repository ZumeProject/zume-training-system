import { html } from 'lit'
import { CourseSlide } from './course-slide'

export class ActivitySlide extends CourseSlide {

    render() {
        return html`
            <div class="slides-card activity-slide">
                ${this.renderProgressBar()}
                <div class="cover">
                    <h2 class="title text-center" data-small>${this.slide['center'][0]} ${this.slide['center'][1]}</h2>
                    <div class="two-column right">
                        <div>
                            <div class="activity-card" data-expanded-padding>
                                ${this.renderContent(this.slide['left'], true)}
                            </div>
                        </div>
                        <div class="content-area">
                            <div class="stack center | text-center">
                                <div class="qr-code"><a href="${this.slide['right'][0]}" target="_blank"><img src="${this.slide['right'][1]}" /></a></div>
                                <p>${this.slide['right'][2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define('activity-slide', ActivitySlide )
