import { BaseNodeMixin } from './base-node-mixin.js';
import { NumberConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class DelayNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        delayTime: {
          observe: true,
          DOM: true,
          attributeName: 'delay-time',
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('delay-time'); }
        }
      },
      maxDelayTime: {
        observe: true,
        DOM: true,
        attributeName: 'max-delay-time',
        fromAttributeConverter: NumberConverter.fromAttribute,
        changedHandler: function() { this.__dispatchPropChangeEvent('max-delay-time'); }
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createDelay';
  }

  get options() {
    return this.maxDelayTime;
  }

  get delayTime() {
    if(!this.node) return this.__preNodeValues.delayTime;
    return this.node.delayTime.value;
  }

  set delayTime(delayTime) {
    if(!this.node) this.__preNodeValues.delayTime = delayTime;
    else this.node.delayTime.value = parseFloat(delayTime);
  }

  get maxDelayTime() {
    if(this.node) return this.node.delayTime.maxValue;
    return this.__maxDelayTime;
  }

  set maxDelayTime(maxDelayTime) {
    this.__maxDelayTime = parseFloat(maxDelayTime);
  }

}

window.customElements.define('delay-node', DelayNode);