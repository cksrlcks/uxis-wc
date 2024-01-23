import { LitElement, css, html } from 'lit';

export default class Element extends LitElement {
  static properties = {
    background: { type: String },
    color: { type: String }
  };

  constructor() {
    super();
    this.background = '#000';
    this.color = '#fff';
  }

  render() {
    return html`
      <style>
        :host {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          z-index: 99999999999999;
        }
        .item {
          color: ${this.color};
        }
        .item::slotted(a) {
          display: block;
          background: ${this.background};
          color: ${this.color};
          padding: 0 1em;
          line-height: 34px;
          font-size: 13px;
          font-weight: bold;
          height: 34px;
          position: absolute;
          top: 10px;
          left: 10px;
          border-radius: 4px;
          white-space: nowrap;
          transform: translateY(-100px);
        }
        .item::slotted(a:focus) {
          transform: translateY(0);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      </style>
      <slot class="item"></slot>
    `;
  }
}

customElements.define('wc-skip-nav', Element);
