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
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createGain';
  }

  get gain() {
    return this.node?.gain.value;
  }

  set gain(gain) {
    this.node.gain.value = parseFloat(gain);
  }
  
}

window.customElements.define('gain-node', GainNode);