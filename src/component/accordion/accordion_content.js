import { LitElement, html } from 'lit';

export class Element extends LitElement {
  static properties = {
    open: { type: Boolean }
  };
  constructor() {
    super();
  }
  firstUpdated() {
    this.content = this.shadowRoot.querySelector('.content');
  }

  attributeChangedCallback(name, oldval, newval) {
    if (this.hasAttribute('open')) {
      this.content.style.maxHeight = this.content.scrollHeight + 'px';
    } else {
      this.content.style.maxHeight = null;
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
      </style>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('wc-accordion-content', Element);
