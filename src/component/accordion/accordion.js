import { LitElement, html, css } from 'lit';

export class Element extends LitElement {
  static properties = {
    mode: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    this.content = this.querySelector('wc-accd-content');

    this.addEventListener('clickTitle', this.clickTitleHandler);
  }

  clickTitleHandler = (e) => {
    e.target.toggleAttribute('open');

    if (this.mode === 'combine') {
      let opened = e.target.parentNode.querySelectorAll('wc-accd-item[open]');
      opened.forEach((el) => {
        if (el !== e.target) {
          el.removeAttribute('open');
        }
      });
    }
  };

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define('wc-accd', Element);
