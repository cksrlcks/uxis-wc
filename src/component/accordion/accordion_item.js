import { LitElement, html } from 'lit';

export class Element extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions };
  static get properties() {
    return {
      open: { type: String }
    };
  }
  constructor() {
    super();
  }

  attributeChangedCallback(name, oldval, newval) {
    // if (this.hasAttribute('open')) {
    //   this.content.style.maxHeight = this.content.scrollHeight + 'px';
    // } else {
    //   this.content.style.maxHeight = null;
    // }
    // super.attributeChangedCallback(name, oldval, newval);
  }

  firstUpdated() {
    // // this.header = this.shadowRoot.querySelector('slot[name="title"]');
    // this.content = this.querySelector('wc-accordion-content');
    // this.customEvent = new CustomEvent('clickTitle', {
    //   bubbles: true,
    //   composed: true
    // });
    // this.header.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.dispatchEvent(this.customEvent);
    // });
  }

  render() {
    return html`
      <style>
        :host {
          margin-bottom: 10px;
          display: block;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('wc-accordion-item', Element);
