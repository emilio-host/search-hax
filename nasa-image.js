import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaImage extends DDDSuper (LitElement) {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.secondary_creator = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        secondary_creator: { type: String }
    };
  }

  openInNewTab() {
    window.open(this.source, '_blank');
  }

  static get styles() {
    return [css`
    
    .image {
    display: inline-block;
    width: 240px;
    height: 190px;
    cursor: pointer;
    overflow: hidden;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .image div {
    max-width: 200px;
    font-size: 16px;
    font-weight: bold;
    }

    .image img {
    display: block;
    width: 240px;
    height: 140px;
    }

    .image:hover {
      background-color: lightblue;
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

    .image:hover img {
      transform: scale(1.01);
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 140px;
      overflow: hidden;
    }

    .image:hover .secondary {
      color: --ddd-theme-default-slateMaxLight;
    }

    .secondary {
      font-size: 12px;
      color: #555;
    }

    `];
  }

  render() {
    return html`
    <div class="image" tabindex="0" @keyup="${this.onKeyup}">
        <img src="${this.source}" @click="${this.openInNewTab}"/>
        <div>${this.title}</div>
        <div class="secondary">${this.secondary_creator}</div>
    </div>
    `;
  }

  onKeyup(e) {
    if (e.key === 'Enter') {
      this.openInNewTab();
    }
  }


  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);