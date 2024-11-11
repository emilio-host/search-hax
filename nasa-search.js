import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./nasa-image.js";

export class NasaSearch extends LitElement {

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
    this.jsonUrl = 'https://haxtheweb.org/site.json';
  }

  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
      jsonUrl: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: lightblue;
        border-radius: 4px;
      }

      details.no-arrow summary {
        list-style: none;
      }

      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }

      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }

      details button {
        margin-top: 10px;
        padding: 10px;
        font-size: 16px;
        background-color: #FA8072;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
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
            />
          </div>
          ${this.title === 'Enter Website Location' ? html`
        <div>
          <button @click="${this.onButtonClick}">Search</button>
        </div>
      ` : ''}
      </details>
      <div class="results">
      ${this.items.map((item) => {
        const created = item.metadata ? new Date(parseInt(item.metadata.created) * 1000).toLocaleDateString() : '';
        const updated = item.metadata ? new Date(parseInt(item.metadata.updated) * 1000).toLocaleDateString() : '';
        const logo = item.metadata && item.metadata.files && item.metadata.files[0] 
          ? `https://haxtheweb.org/${item.metadata.files[0].url}` 
          : '';

          return html`
            <nasa-image
              created="${created}"
              lastUpdated="${updated}"
              title="${item.title}"
              description="${item.description}"
              logo="${logo}"
              slug="${item.slug}"
            ></nasa-image>
          `;
        })}
      </div>
    `;
  }


  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(this.jsonUrl) // Use the jsonUrl property
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (data && Array.isArray(data.items)) {
          this.items = data.items.filter(item => 
            item?.title?.toLowerCase().includes(value.toLowerCase()) ||
            item?.description?.toLowerCase().includes(value.toLowerCase())
          );
        }

        this.loading = false;
      });
  }

  

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);