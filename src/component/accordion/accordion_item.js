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
    this.headerEl = this.header.assignedElements({ flatten: true })[0].children[0];

    if (this.hasAttribute('open')) {
      this.open = true;
      this.content.classList.add('initial-open');
      this.headerEl.title = '열림';
    } else {
      this.headerEl.title = '닫힘';
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

    this.shadowRoot.querySelector('[name="title"]').addEventListener('focus', function () {
      console.log('ee');
    });
  }

  attributeChangedCallback(name, oldval, newval) {
    if (this.content) {
      if (this.hasAttribute('open')) {
        slideDown(this.content);
        this.headerEl.title = '열림';
      } else {
        slideUp(this.content);
        this.headerEl.title = '닫힘';
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
