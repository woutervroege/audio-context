import { BaseNodeMixin } from './base-node-mixin.js';
import { BooleanConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class ConvolverNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        normalize: {
          observe: true,
          DOM: true,
          fromAttributeConverter: BooleanConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('normalize'); }
        },
        bufferId: {
          observe: true,
          DOM: true,
          attributeName: 'buffer-id',
        },
        __bufferElements: {
          observe: true,
        }
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['__bufferElements', 'node', 'bufferId'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createConvolver';
  }

  constructor() {
    super();
    this.__bufferElements = [];
  }

  get buffer() {
    const dest = this.__bufferElements.find(node => node.id === this.bufferId);
    return dest?.buffer;
  }

  get normalize() {
    if(!this.node) return this.__preNodeValues.normalize;
    return this.node.normalize;
  }

  set normalize(normalize) {
    if(!this.node) this.__preNodeValues.normalize = normalize;
    else this.node.normalize = normalize;
  }

  __assignBuffer() {
    if(! (this.__bufferElements && this.node && this.bufferId) ) return;
    this.node.buffer = this.buffer;
  }

}

window.customElements.define('convolver-node', ConvolverNode);