import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxImage extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.created = '';
    this.lastUpdated = '';
    this.logo = '';
    this.slug = '';
  }

  static get properties() {
    return {
        title: { type: String },
        description: { type: String },
        created: { type: String },
        lastUpdated: { type: String },
        logo: { type: String },
        slug: { type: String },
        base: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
    
      .image {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 320px;
        border-radius: var(--ddd-radius-lg);
        overflow: hidden;
        padding: 10px;
        background-color: #f9f9f9;
        box-shadow: var(--ddd-boxShadow-xl);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
        outline: none;
        min-height: 500px;
        margin: 10px;
      }

      .image:hover img {
        transform: scale(1.01);
      }

      .image-container {
        width: flex;
        overflow: hidden;
        border-radius: var(--ddd-radius-lg);
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
        border-radius: var(--ddd-radius-lg);
        transition: transform 0.3s ease;
      }

      .image:hover {
        background-color: var(--ddd-theme-default-discoveryCoral);
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .card:hover img {
        transform: scale(1.0);
      }

      .info {
        margin-top: 10px;
        font-size: 20px;
        font-weight: 600;
        color: #333;
        text-align: center;
        line-height: 1.5;
      }

      .secondary {
        font-size: 16px;
        color: #555;
        margin-top: 6px;
        line-height: 1.4;
        text-align: center;
      }

      .metadata {
        font-size: 14px;
        color: #777;
        margin-top: 12px;
        line-height: 1.2;
        text-align: center;
      }

    `];
  }

  render() {
    const updatedDate = new Date(parseInt(this.lastUpdated) * 1000).toLocaleDateString();
    
    if (this.logo == '') {
      this.logo = "https://haxtheweb.org/files/HAX.psu%20World%20changer-circle1.png";
    }

    return html`
      <div
        class="image"
        tabindex="0"
        @click="${this.openSlug}"
        @keyup="${this.onKeyup}"
        >
        <div class="image-container">
          <img src="${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="secondary">${this.description}</div>
        ${this.created != '' ? html`<div class="metadata">Created: ${this.created}</div>` : ``}
        <div class="metadata">Updated: ${updatedDate}</div>
      </div>
    `;
  }

  onKeyup(e) {
    if (e.key === 'Enter') {
      this.openSlug();
      this.openInNewTab();
    }
  }

  openSlug() {
    const url = this.slug ? `${this.base || ''}/${this.slug}` : this.base;
    if (url) window.open(url, '_blank');
  }

  static get tag() {
    return "hax-image";
  }
}

customElements.define(HaxImage.tag, HaxImage);