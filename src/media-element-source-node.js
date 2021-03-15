import { BaseNodeMixin } from './base-node-mixin.js';

class MediaElementSourceNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        src: {
          observe: true,
          DOM: true,
          changedHandler: '__srcChanged'
        },
        mediaElement: {
          observe: true,
          DOM: true,
          attributeName: 'media-element',
          changedHandler: '__create'
        }
      }
    }
  }

  static get __nodeCreationMethod() {
    return 'createMediaElementSource';
  }

  __create() {
    if(!this.context || !this.mediaElement) return;
    this.node = this.context[this.constructor.__nodeCreationMethod](this.mediaElement);
  }

  __srcChanged(oldSrc, newSrc) {
    if(!newSrc) return;
    this.mediaElement = this.getRootNode().querySelector('#' + newSrc);
  }

}

window.customElements.define('media-element-source-node', MediaElementSourceNode);