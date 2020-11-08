import { BaseNodeMixin } from './base-node-mixin.js';

class AudioBufferSourceNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        bufferId: {
          observe: true,
          DOM: true,
          attributeName: 'buffer-id',
          changedHandler: '__bufferIdChanged'
        },
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['node', 'bufferId']
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createBufferSource';
  }

  disconnectedCallback() {
    this.node.stop();
  }

  get buffer() {
    const dest = this.__bufferElements.find(node => node.id === this.bufferId);
    return dest?.buffer;
  }

  __assignBuffer() {
    if(! (this.node && this.buffer) ) return;
    if(this.__bufferAssigned ===  true) return;
    this.__bufferAssigned = true;
    this.node.buffer = this.buffer;
  }

  __bufferIdChanged(oldVal, newVal) {
    this.__bufferAssigned = false;
    if(!this.node) return;
    if(newVal) this.node.buffer = null;
  }

}

window.customElements.define('audio-buffer-source-node', AudioBufferSourceNode);