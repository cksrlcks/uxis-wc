import { LitElement, html } from 'lit';

export class Element extends LitElement {
  static properties = {
    href: { type: String },
    target: { type: String },
    title: { type: String }
  };
  constructor() {
    super();
    this.target = '_self';
    this.title = '닫힘';
  }

  firstUpdated() {
    this.header = this.shadowRoot.querySelector('.title');
    this.customEvent = new CustomEvent('clickTitle', {
      bubbles: true,
      composed: true
    });
    this.header.addEventListener('click', (e) => {
      //하위메뉴가 없을때 일반 이동 링크도 구현해야함
      e.preventDefault();
      this.dispatchEvent(this.customEvent);
    });
  }

  render() {
    return html`
      <style></style>
      <a href="${this.href}" class="title" target="${this.target}" title="${this.title}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('wc-accordion-title', Element);
