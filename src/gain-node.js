import { BaseNodeMixin } from './base-node-mixin.js';
import { NumberConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class GainNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        gain: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('gain'); }
        },

        outputhidden: {
          observe: true,
          DOM: true,
          changedHandler: function() { this.__dispatchPropChangeEvent('outputhidden'); }
        },
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createGain';
  }

  get gain() {
    if(!this.node) return this.__preNodeValues.gain;
    return this.node.gain.value;
  }

  set gain(gain) {
    if(!this.node) this.__preNodeValues.gain = gain;
    else this.node.gain.value = parseFloat(gain);
  }
  
}

window.customElements.define('gain-node', GainNode);