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

      :host([loading]) .results {
        opacity: 0.1;
        display: none;
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
    `;
  }


  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search the HaxWeb!</summary>
      <div>
        <input id="input" placeholder="Search" @input="${this.inputChanged}" />
      </div>
      </details>
      <div class="results">
        ${this.items.map((item, index) => html`
          <nasa-image
            title="${item.data?.[0]?.title || ''}"
            logo="${item.links?.[0]?.href || ''}" 
          ></nasa-image>
        `)}
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

        //this.updateGlobalHexColor(data);
        this.loading = false;
      });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);