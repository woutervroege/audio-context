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
        },
      }
    }
  }

  static get __nodeCreationMethod() {
    return 'createDelay';
  }

  get delayTime() {
    return this.node?.delayTime.value;
  }

  set delayTime(delayTime) {
    this.node.delayTime.value = parseFloat(delayTime);
  }

  get __nodeCreationOptions() {
    const value = this.getAttribute('max-delay-time') || this.maxDelayTime;
    if(!value) return undefined;
    const maxDelayTime = parseFloat(value);
    return (maxDelayTime <= 0 || maxDelayTime >= 180) ? undefined : maxDelayTime;
  }

}

window.customElements.define('delay-node', DelayNode);