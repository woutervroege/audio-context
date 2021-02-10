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
        },
      }
    }
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __delayTimeChanged: ['node', 'delayTime'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createDelay';
  }

  get delayTime() {
    return this.node?.delayTime.value || this['#delayTime'];
  }

  set delayTime(delayTime) {
    const oldVal = this.delayTime;
    this['#delayTime'] = parseFloat(delayTime);
    this.propertyChangedCallback('delayTime', oldVal, this.delayTime);
  }

  get __nodeCreationOptions() {
    const value = this.getAttribute('max-delay-time') || this.maxDelayTime;
    if(!value) return undefined;
    const maxDelayTime = parseFloat(value);
    return (maxDelayTime <= 0 || maxDelayTime >= 180) ? undefined : maxDelayTime;
  }

  __delayTimeChanged() {
    this.__setNodeParam('delayTime')
  }

}

window.customElements.define('delay-node', DelayNode);