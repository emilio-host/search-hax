import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-image.js";

export class HaxSearch extends LitElement {

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
    this.jsonUrl = '';
    this.errorMessage = '';
  }

  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
      jsonUrl: { type: String },
      errorMessage: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      h2 {
        margin-left: 16px;
      }

      .results {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        max-width: 1200px; 
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: var(--ddd-theme-default-pughBlue);
        border-radius: 4px;
      }

      details.no-arrow summary {
        list-style: none;
      }

      summary {
        font-size: 24px;
        padding: 8px 16px;
        color: white;
        font-size: 42px;
      }

      input {
        font-size: 20px;
        line-height: var(--ddd-lh-auto);
        width: 100%;
      }

      button {
        margin-top: 10px;
        padding: 10px;
        font-size: 16px;
        background-color: var(--ddd-theme-default-discoveryCoral);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .error {
        color: red;
        margin-top: 10px;
      }

      
    `;
  }

  render() {
    return html`
      <h2>
        ${this.title}
      </h2>
      <details class="no-arrow" open>
      <summary>${this.title ? '' : 'Search the HaxWeb!'}</summary>
          <div>
            <input 
              id="input" 
              class="search-input"
              placeholder="Search" 
              @input="${this.inputChanged}" 
              @keydown="${this.handleKeyPress}"
            />
          </div>
          ${this.title === 'Enter URL Location' ? html`
        <div>
          <button @click="${this.loadData}">Analyze</button>
        </div>
      ` : ''}
      </details>
      ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` 
      : ''} 

      <div class="results">
      ${this.items.map((item) => {
        const created = item.metadata ? new Date(parseInt(item.metadata.created) * 1000).toLocaleDateString() : '';
        const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
        const logo = item.metadata && item.metadata.files && item.metadata.files[0] 
          ? `https://haxtheweb.org/${item.metadata.files[0].url}` 
          : '';

          const slug = item.slug || '';

          return html`
            <hax-image
              created="${created}"
              lastUpdated="${updated}"
              title="${item.title}"
              description="${item.description}"
              logo="${logo}"
              slug="${item.slug}"
              base="${this.value}"
            ></hax-image>
          `;
        })}
      </div>
    `;
  }

  
  inputChanged(e) {
    this.value = e.target.value;
    // Updates the jsonUrl to append `/site.json` automatically
    if (this.value && !this.value.endsWith('/site.json')) {
      this.jsonUrl = `${this.value}/site.json`;
    }
  }


  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.loadData();
    }
  }


  loadData() {
    if (!this.jsonUrl || this.jsonUrl.trim() === '') {
      this.errorMessage = 'Please enter a valid URL.';
      return;
    }
  
    this.loading = true;
    this.errorMessage = '';
    this.items = [];
  
    fetch(this.jsonUrl)
      .then(response => response.ok ? response.json() : Promise.reject('Invalid response'))
      .then(data => {
        if (data && Array.isArray(data.items)) {
          this.items = data.items.map(item => {
            if (!item.slug) {
              item.slug = ''; 
            }
            return item;
          });
        } else {
          throw new Error('Invalid data format');
        }
        this.loading = false;
      })
      .catch((error) => {
        this.errorMessage = `Error: ${error.message || 'Invalid response'}`;
        this.items = [];
        this.loading = false;
      });
  }

  
  static get tag() {
    return 'hax-search';
  }
}
customElements.define(HaxSearch.tag, HaxSearch);
