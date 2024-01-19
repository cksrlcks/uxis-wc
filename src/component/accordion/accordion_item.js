import { LitElement, html } from 'lit';
import { down as slideDown, up as slideUp } from 'slide-element';

export class Element extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions };
  static get properties() {
    return {
      open: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const content = this.querySelector('[slot="content"]');
    if (!content) {
      this.linkType = true;
    }
  }

  updated() {}

  firstUpdated() {
    this.header = this.shadowRoot.querySelector('[name="title"]');
    this.content = this.shadowRoot.querySelector('[name="content"]');
    if (this.open) {
      this.content.classList.add('inital-open');
    }
    this.customEvent = new CustomEvent('clickTitle', {
      bubbles: true,
      composed: true
    });

    this.header.addEventListener('click', (e) => {
      if (!this.linkType) {
        e.preventDefault();
        this.dispatchEvent(this.customEvent);
      }
    });
  }

  attributeChangedCallback(name, oldval, newval) {
    if (this.content) {
      if (this.hasAttribute('open')) {
        slideDown(this.content);
      } else {
        slideUp(this.content);
      }
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        ::slotted(*) {
          display: block;
        }
        [name='content'] {
          display: none;
        }
        [name='content'].initial-open {
          display: block;
        }
      </style>
      <slot name="title"></slot>
      <slot name="content"></slot>
    `;
  }
}

customElements.define('wc-accd-item', Element);
