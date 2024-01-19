import { LitElement, html, css } from 'lit';
import { isMobile } from 'mobile-device-detect';

export default class Element extends LitElement {
  static properties = {
    scrollbar: { type: String },
    space: { type: Number },
    description: { type: Boolean }
  };

  constructor() {
    super();
    this.scrollbar = 'visible';
    this.space = 0;
    this.description = false;

    this.isDown = false;
    this.startX;
    this.cal_scroll;
    this.isDragged = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const description = this.querySelector('[slot="description"]');
    if (description) {
      this.setAttribute('description', true);
    }
  }

  firstUpdated() {
    this.slider = this.shadowRoot.querySelector('.wrapper');
    this.item = this.shadowRoot.querySelector('.drag-zone');

    //스크롤바 유무 적용
    if (this.scrollbar === 'none') {
      this.slider.classList.add('no-scrollbar');
    }

    //모바일이면 종료
    if (isMobile) return;

    this.slider.addEventListener('mousedown', (e) => this.mousedownHandler(e));
    this.slider.addEventListener('mouseleave', (e) => this.mouseleaveHandler(e));
    this.slider.addEventListener('mouseup', (e) => this.mouseupHandler(e));
    this.slider.addEventListener('mousemove', (e) => this.mousemoveHandler(e));
  }

  preventClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  mousedownHandler(e) {
    this.isDown = true;
    this.slider.classList.add('is-dragging');
    this.startX = e.pageX - this.slider.offsetLeft;
    this.cal_scroll = this.slider.scrollLeft;
  }

  mouseleaveHandler() {
    this.isDown = false;
    this.slider.classList.remove('is-dragging');
  }

  mouseupHandler(e) {
    this.isDown = false;

    if (this.isDragged) {
      this.item.addEventListener('click', this.preventClick);
    } else {
      this.item.removeEventListener('click', this.preventClick);
    }

    this.slider.classList.remove('is-dragging');
    this.isDragged = false;
  }

  mousemoveHandler(e) {
    if (!this.isDown) return;

    this.isDragged = true;
    e.preventDefault();

    const x = e.pageX - this.slider.offsetLeft;
    const walk = x - this.startX;

    this.slider.scrollLeft = this.cal_scroll - walk;
  }

  moveTo(x) {
    this.slider.scrollLeft = x;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        ::slotted {
          display: block;
        }
        [name='description'] {
          display: block;
          margin-bottom: 10px;
        }
        [hidden],
        .hide {
          display: none;
        }
        .wrapper {
          overflow-x: scroll;
          cursor: pointer;
          margin: 0 ${this.space}px;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: -ms-autohiding-scrollbar;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      </style>
      <slot name="description" class="${this.description ? '' : 'hide'}"></slot>
      <div class="wrapper">
        <div class="drag-zone">
          <div class="container">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('wc-horizontal-drag', Element);
