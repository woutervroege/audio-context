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

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __frequencyChanged: ['node', 'frequency'],
        __detuneChanged: ['node', 'detune'],
        __QChanged: ['node', 'Q'],
        __gainChanged: ['node', 'gain'],
        __typeChanged: ['node', 'type'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createBiquadFilter';
  }

  get frequency() {
    return this.node?.frequency.value || this['#frequency'];
  }

  set frequency(frequency) {
    const oldVal = this.frequency;
    this['#frequency'] = parseFloat(frequency);
    this.propertyChangedCallback('frequency', oldVal, this.frequency);
  }

  get detune() {
    return this.node?.detune.value || this['#detune'];
  }

  set detune(detune) {
    const oldVal = this.detune;
    this['#detune'] = parseFloat(detune);
    this.propertyChangedCallback('detune', oldVal, this.detune);
  }

  get Q() {
    return this.node?.Q.value || this['#Q'];
  }

  set Q(Q) {
    const oldVal = this.Q;
    this['#Q'] = parseFloat(Q);
    this.propertyChangedCallback('Q', oldVal, this.Q);
  }

  get gain() {
    return this.node?.gain.value || this['#gain'];
  }

  set gain(gain) {
    const oldVal = this.gain;
    this['#gain'] = parseFloat(gain);
    this.propertyChangedCallback('gain', oldVal, this.gain);
  }

  get type() {
    return this.node?.type.value || this['#type'];
  }

  set type(type) {
    const oldVal = this.type;
    this['#type'] = type;
    this.propertyChangedCallback('type', oldVal, this.type);
  }

  __frequencyChanged() {
    this.__setNodeParam('frequency')
  }

  __detuneChanged() {
    this.__setNodeParam('detune')
  }

  __QChanged() {
    this.__setNodeParam('Q')
  }

  __gainChanged() {
    this.__setNodeParam('gain')
  }

  __typeChanged() {
    this.__setNodeParam('type')
  }

}

window.customElements.define('biquad-filter-node', BiquadFilterNode);