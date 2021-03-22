import { BaseNodeMixin } from './base-node-mixin.js';
import { BooleanConverter, NumberConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

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
        },
        detune: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
        loop: {
          observe: true,
          DOM: true,
          fromAttributeConverter: BooleanConverter.fromAttribute,
        },
        loopEnd: {
          observe: true,
          DOM: true,
          attributeName: 'loop-end',
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
        loopStart: {
          observe: true,
          DOM: true,
          attributeName: 'loop-start',
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
        playbackRate: {
          observe: true,
          DOM: true,
          attributeName: 'playback-rate',
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['node', 'buffer'],
        __detuneChanged: ['node', 'detune'],
        __loopChanged: ['node', 'loop'],
        __loopEndChanged: ['node', 'loopEnd'],
        __loopStartChanged: ['node', 'loopStart'],
        __playbackRateChanged: ['node', 'playbackRate'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createBufferSource';
  }

  constructor() {
    super();
    this.detune = 0;
    this.loop = false;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.playbackRate = 1;
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

  get detune() {
    return this.node?.detune.value || this['#detune'];
  }
  
  set detune(detune) {
    const oldVal = this.detune;
    this['#detune'] = detune;
    this.propertyChangedCallback('detune', oldVal, this.detune);
  }

  get loop() {
    return this.node?.loop || this['#loop'];
  }
  
  set loop(loop) {
    const oldVal = this.loop;
    this['#loop'] = loop;
    this.propertyChangedCallback('loop', oldVal, this.loop);
  }

  get loopEnd() {
    return this.node?.loopEnd || this['#loopEnd'];
  }
  
  set loopEnd(loopEnd) {
    const oldVal = this.loopEnd;
    this['#loopEnd'] = loopEnd;
    this.propertyChangedCallback('loopEnd', oldVal, this.loopEnd);
  }

  get loopStart() {
    return this.node?.loopStart || this['#loopStart'];
  }
  
  set loopStart(loopStart) {
    const oldVal = this.loopStart;
    this['#loopStart'] = loopStart;
    this.propertyChangedCallback('loopStart', oldVal, this.loopStart);
  }

  get playbackRate() {
    return this.node?.playbackRate.value || this['#playbackRate'];
  }
  
  set playbackRate(playbackRate) {
    const oldVal = this.playbackRate;
    this['#playbackRate'] = playbackRate;
    this.propertyChangedCallback('playbackRate', oldVal, this.playbackRate);
  }

  __detuneChanged() {
    this.__setNodeParam('detune');
  }
  
  __loopChanged() {
    if(!this.node) return;
    this.node.loop = this['#loop'];
    this.__dispatchPropChangeEvent('loop');
  }

  __loopEndChanged() {
    if(!this.node) return;
    this.node.loopEnd = this['#loopEnd'];
    this.__dispatchPropChangeEvent('loopEnd');
  }

  __loopStartChanged() {
    if(!this.node) return;
    this.node.loopStart = this['#loopStart'];
    this.__dispatchPropChangeEvent('loopStart');
  }

  __playbackRateChanged() {
    this.__setNodeParam('playbackRate');
  }

}

window.customElements.define('audio-buffer-source-node', AudioBufferSourceNode);