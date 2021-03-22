import { AudioNodeMixin } from './audio-node-mixin.js';

class MediaElementSourceNode extends AudioNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        for: {
          observe: true,
          DOM: true,
          changedHandler: '__forChanged'
        },
        mediaElement: {
          observe: true,
          DOM: true,
          attributeName: 'media-element',
          changedHandler: '__create'
        }
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createMediaElementSource';
  }

  __create() {
    if(!this.context || !this.mediaElement) return;
    this.node = this.context[this.constructor.__nodeCreationMethod](this.mediaElement);
  }

  __forChanged(oldFor, newFor) {
    if(!newFor) return;
    this.mediaElement = this.getRootNode().querySelector('#' + newFor);
  }

}

window.customElements.define('media-element-source-node', MediaElementSourceNode);