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
    return this.node?.frequency.value;
  }

  set frequency(frequency) {
    this.node.frequency.value = parseFloat(frequency);
  }

  get detune() {
    return this.node?.detune.value;
  }

  set detune(detune) {
    this.node.detune.value = parseFloat(detune);
  }

  get Q() {
    return this.node?.Q.value;
  }

  set Q(Q) {
   this.node.Q.value = parseFloat(Q);
  }

  get gain() {
    return this.node?.gain.value;
  }

  set gain(gain) {
    this.node.gain.value = parseFloat(gain);
  }

  get type() {
    return this.node?.type;
  }

  set type(type) {
    this.node.type = type;
  }

}

window.customElements.define('biquad-filter-node', BiquadFilterNode);