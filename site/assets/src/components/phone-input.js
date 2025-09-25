import { LitElement, html } from 'lit';
import intlTelInput from 'intl-tel-input';
import intlTelInputUtils from "intl-tel-input/utils";


export class PhoneInput extends LitElement {
  iti
  static get properties() {
    return {
      value: { type: String },
      number: { type: String, reflect: true },
    };
  }

  firstUpdated() {
    this.t = jsObject.translations;
    const input = this.renderRoot.querySelector("#phone");
    this.iti = intlTelInput(input, {
      loadUtils: () => ({ default: intlTelInputUtils }),
    });
    this.number = this.value;
  }

  _handleInput() {
    this.number = this.iti.getNumber();
    this.dispatchEvent(new CustomEvent('input', { detail: { number: this.number } }));

    if ( !this.iti.isValidNumber() ) {
      const error = this.iti.getValidationError();

      if ( error === 'TOO_SHORT' ) {
        message = this.t.phone_error_too_short;
      } else if ( error === 'TOO_LONG' ) {
        message = this.t.phone_error_too_long;
      } else {
        message = this.t.phone_error;
      }

      this.dispatchEvent(new CustomEvent('invalid', { detail: { number: this.number, message: message } }));
    }
  }


  render() {
    return html`
      <input
        type="tel"
        id="phone"
        class="input"
        name="phone"
        value=${this.value}
        @input=${this._handleInput}
      />
    `;
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define('phone-input', PhoneInput);
