import { LitElement } from 'lit';

export class DashPage extends LitElement {

    firstUpdated() {
        this.updateHeaderStyle()
    }

    updateHeaderStyle() {
        const headerLeft = this.querySelector('.dashboard__header.left')
        const offset = headerLeft.offsetTop
        console.log(offset, headerLeft)
        headerLeft.style.top = offset + 'px'
    }
}
