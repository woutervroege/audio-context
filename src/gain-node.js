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
        },
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __gainChanged: ['node', 'gain'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createGain';
  }

  constructor() {
    super();
    this.gain = 1.0;
  }

  get gain() {
    return this.node?.gain.value || this['#gain'];
  }

  set gain(gain) {
    const oldVal = this.gain;
    this['#gain'] = parseFloat(gain);
    this.propertyChangedCallback('gain', oldVal, this.gain);
  }

  __gainChanged() {
    this.__setNodeParam('gain');
  }
  
}

window.customElements.define('gain-node', GainNode);