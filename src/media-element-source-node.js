import { BaseNodeMixin } from './base-node-mixin.js';

class MediaElementSourceNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        mediaElement: {
          observe: true,
          changedHandler: '__create'
        }
      }
    }
  }

  static get __nodeCreationMethod() {
    return 'createMediaElementSource';
  }

  __create() {
    if(!this.mediaElement) return;
    this.node = this.context[this.constructor.__nodeCreationMethod](this.mediaElement);
  }

}

window.customElements.define('media-element-source-node', MediaElementSourceNode);