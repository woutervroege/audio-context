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
        buffer:{
          observe: true,
          changedHandler: '__bufferChanged',
        }
        //detune: {
          //TODO
        //},
        //loop: {
          //TODO
        //},
        //loopEnd: {
          //TODO
        //},
        //loopStart: {
          //TODO
        //},
        //playbackRate: {
          //TODO
        //},
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['node', 'buffer']
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createBufferSource';
  }

  disconnectedCallback() {
    return this.stop();
  }

  start() {
    return this.node?.start(...arguments);
  }

  stop() {
    return this.node?.stop(...arguments);
  }

  __assignBuffer() {
    if(! (this.node && this.buffer) ) return;
    if(this.__bufferAssigned ===  true) return;
    this.__bufferAssigned = true;
    this.node.buffer = this.buffer;
  }

  __bufferIdChanged(oldId, newId) {
    this.buffer = this.getRootNode().querySelector('#' + newId);
  }

  __bufferChanged(oldVal, newVal) {
    this.__bufferAssigned = false;
    if(!this.node) return;
    if(newVal) this.node.buffer = null;
    this.__dispatchPropChangeEvent('buffer');
  }

}

window.customElements.define('audio-buffer-source-node', AudioBufferSourceNode);