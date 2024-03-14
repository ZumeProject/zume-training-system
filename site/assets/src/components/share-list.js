import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js'

export class ShareList extends LitElement {
    static get properties() {
        return {
            items: { type: Array, attribute: false },
            filterType: { type: String, attribute: false },
        };
    }

    constructor() {
        super()
        this.items = zumeShare.share_items
        this.filterType = 'all'
    }

    filterItems(filterType) {
        this.filterType = filterType

        this.items = zumeShare.share_items.filter(({ type }) => {
            if (filterType === 'all') {
                return true
            }

            return type === filterType
        })
    }

    renderListItem({ page_url, page_title, type }) {
        return html`
            <li class="share-cards" data-type=${type}>
                <div class="stack | share card">
                    <a class="f-0 bold my-0" href=${page_url}>
                        ${page_title}
                    </a>
                    <div class="center">
                        <share-links
                            url=${page_url}
                            title=${page_title}
                            .t=${zumeShare.translations}>
                        </share-links>
                    </div>
                </div>
            </li>
        `
    }

    render() {
        return html`
            <div class="filter-area">
                <button class="icon-btn f-2 ms-auto" data-toggle="filter-menu">
                    <span class="visually-hidden">${zumeShare.translations.filter}</span>
                    <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                </button>
                <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType === 'all' ? 'selected' : ''}"
                                @click=${() => this.filterItems('all')}
                            >
                                ${zumeShare.translations.all}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType === 'tool' ? 'selected' : ''}"
                                @click=${() => this.filterItems('tool')}
                            >
                                ${zumeShare.translations.tools}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType === 'concept' ? 'selected' : ''}"
                                @click=${() => this.filterItems('concept')}
                            >
                                ${zumeShare.translations.concepts}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="stack container-xsm">

                ${
                    repeat(this.items, (share_item) => share_item.key, this.renderListItem)
                }

            </ul>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('share-list', ShareList);
