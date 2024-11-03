import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        lastUpdated: { type: String },
        logo: { type: String }
    };
  }

  static get styles() {
    return css`
    
      .image {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 320px;
        border-radius: 12px;
        overflow: hidden;
        padding: 16px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
        outline: none;
        /* Height for golden ratio (approx. 1.618) */
        height: 512px;
      }

      .image:hover img {
        transform: scale(1.01);
      }

      .image-container {
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        background-color: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
      }

      img {
        width: 70%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s ease;
      }

      .secondary {
        font-size: 16px;
        color: #555;
        margin-top: 6px;
        line-height: 1.4;
        text-align: center;
      }

    `;
  }

  render() {
    const createdDate = new Date(parseInt(this.created) * 1000).toLocaleDateString();
    const updatedDate = new Date(parseInt(this.lastUpdated) * 1000).toLocaleDateString();
    
    if (this.logo == '') {
      this.logo = "/files/HAX.psu%20World%20changer-circle1.png";
  }
  
    return html`
      <div
        class="image"
        tabindex="0"
        @click="${this.openSlug}"
        @keyup="${this.onKeyup}"
      >
        <div class="image-container">
          <img src="https://haxtheweb.org/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="secondary">${this.description}</div>
        <div class="metadata">Created: ${createdDate}</div>
        <div class="metadata">Updated: ${updatedDate}</div>
      </div>
    `;
  }

  onKeyup(e) {
    if (e.key === 'Enter') {
      this.openInNewTab();
      this.openSlug();
    }
  }

  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);