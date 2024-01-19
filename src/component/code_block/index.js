import { LitElement, html } from 'lit';
import Prism from 'prismjs';

export default class Element extends LitElement {
  static get properties() {
    return {
      //scrollbar: { type: String }
    };
  }

  constructor() {
    super();
    this.value = this.innerHTML;
  }

  firstUpdated() {
    this.pre = this.shadowRoot.querySelector('pre');
    this.code = this.pre.querySelector('code');
    this.codeText = this.innerHTML;
    const formatted = Prism.highlight(this.codeText, Prism.languages.html, 'html');
    this.code.innerHTML = formatted;
  }

  render() {
    return html`
      <style>
        pre {
          background: #0d1117;
          border-radius: 4px;
          min-height: 120px;
          max-height: 240px;
          overflow-y: auto;
        }

        /* PrismJS 1.29.0
        https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
        /**
         * prism.js default theme for JavaScript, CSS and HTML
         * Based on dabblet (http://dabblet.com)
         * @author Lea Verou
         */

        code[class*='language-'],
        pre[class*='language-'] {
          color: black;
          background: none;
          text-shadow: 0 1px white;
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          font-size: 1em;
          text-align: left;
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          word-wrap: normal;
          line-height: 1.3;

          -moz-tab-size: 4;
          -o-tab-size: 4;
          tab-size: 4;

          -webkit-hyphens: none;
          -moz-hyphens: none;
          -ms-hyphens: none;
          hyphens: none;
        }

        pre[class*='language-']::-moz-selection,
        pre[class*='language-'] ::-moz-selection,
        code[class*='language-']::-moz-selection,
        code[class*='language-'] ::-moz-selection {
          text-shadow: none;
          background: #b3d4fc;
        }

        pre[class*='language-']::selection,
        pre[class*='language-'] ::selection,
        code[class*='language-']::selection,
        code[class*='language-'] ::selection {
          text-shadow: none;
          background: #b3d4fc;
        }

        @media print {
          code[class*='language-'],
          pre[class*='language-'] {
            text-shadow: none;
          }
        }

        /* Code blocks */
        pre[class*='language-'] {
          padding: 1em;
          margin: 0;
          overflow: auto;
        }

        :not(pre) > code[class*='language-'],
        pre[class*='language-'] {
          background: #f4f7f9;
        }

        /* Inline code */
        :not(pre) > code[class*='language-'] {
          padding: 0.1em;
          border-radius: 0.3em;
          white-space: normal;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: slategray;
        }

        .token.punctuation {
          color: #999;
        }

        .token.namespace {
          opacity: 0.7;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #905;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #690;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #9a6e3a;
          /* This background color was intended by the author of this theme. */
          background: hsla(0, 0%, 100%, 0.5);
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #07a;
        }

        .token.function,
        .token.class-name {
          color: #dd4a68;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #e90;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }
      </style>
      <pre class="language-html"><code></code></pre>
    `;
  }
}

customElements.define('wc-code-block', Element);
