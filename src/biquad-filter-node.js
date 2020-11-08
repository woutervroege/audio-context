import { BaseNodeMixin } from './base-node-mixin.js';
import { NumberConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class BiquadFilterNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        frequency: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('frequency'); }
        },
        detune: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('detune'); }
        },
        Q: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('q'); }
        },
        gain: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('gain'); }
        },
        type: {
          observe: true,
          DOM: true,
          changedHandler: function() { this.__dispatchPropChangeEvent('type'); }
        },
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createBiquadFilter';
  }

  get frequency() {
    if(!this.node) return this.__preNodeValues?.frequency;
    return this.node.frequency.value;
  }

  set frequency(frequency) {
    if(!this.node) this.__preNodeValues.frequency = frequency;
    else this.node.frequency.value = parseFloat(frequency);
  }

  get detune() {
    if(!this.node) return this.__preNodeValues?.detune;
    return this.node.detune.value;
  }

  set detune(detune) {
    if(!this.node) this.__preNodeValues.detune = detune;
    else this.node.detune.value = parseFloat(detune);
  }

  get Q() {
    if(!this.node) return this.__preNodeValues?.Q;
    return this.node.Q.value;
  }

  set Q(Q) {
    if(!this.node) this.__preNodeValues.Q = Q;
    else this.node.Q.value = parseFloat(Q);
  }

  get gain() {
    if(!this.node) return this.__preNodeValues?.gain;
    return this.node.gain.value;
  }

  set gain(gain) {
    if(!this.node) this.__preNodeValues.gain = gain;
    else this.node.gain.value = parseFloat(gain);
  }

  get type() {
    if(!this.node) return this.__preNodeValues?.type;
    return this.node.type;
  }

  set type(type) {
    if(!this.node) this.__preNodeValues.type = type;
    else this.node.type = type;
  }

}

window.customElements.define('biquad-filter-node', BiquadFilterNode);