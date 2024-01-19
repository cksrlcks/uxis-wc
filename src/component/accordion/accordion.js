import { LitElement, html, css } from 'lit';
import './style.css';

export class Element extends LitElement {
  static properties = {
    mode: { type: String }
  };

  static styles = css`
    wc-accordion-item [slot='title'] {
      display: block;
      padding: 1em 12px;
      background: #f8f9fa;
      font-weight: bold;
      border-radius: 8px;
    }

    wc-accordion-item [slot='content'] {
      display: block;
      border: 1px solid #eee;
      padding: 12px;
      margin-top: 4px;
      border-radius: 8px;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    this.content = this.querySelector('wc-accordion-content');

    this.addEventListener('clickTitle', this.clickTitleHandler);
  }

  clickTitleHandler = (e) => {
    e.target.parentNode.querySelector('wc-accordion-content').toggleAttribute('open');
    if (this.mode === 'combine') {
      let opened = this.querySelectorAll('wc-accordion-content[open]');
      opened.forEach((el) => {
        if (el !== e.target) {
          el.removeAttribute('open');
        }
      });
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('wc-accordion', Element);
