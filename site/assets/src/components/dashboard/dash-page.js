import { LitElement } from 'lit';

export class DashPage extends LitElement {

    connectedCallback() {
        super.connectedCallback()

        window.addEventListener('load', this.updateHeaderStyle)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        window.removeEventListener('load', this.updateHeaderStyle)
    }

    updateHeaderStyle() {
        const headerLeft = document.querySelector('.dashboard__header.left')
        const offset = headerLeft.offsetTop
        console.log(offset, headerLeft)
        headerLeft.style.top = offset + 'px'
    }
}
