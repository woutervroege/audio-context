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
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['node', 'bufferId'],
        __normalizeChanged: ['node', 'normalize'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createConvolver';
  }

  get buffer() {
    const dest = this.__bufferElements.find(node => node.id === this.bufferId);
    return dest?.buffer;
  }

  get normalize() {
    return this.node?.normalize || this['#normalize'];
  }

  set normalize(normalize) {
    const oldVal = this.normalize;
    this['#normalize'] = normalize;
    this.propertyChangedCallback('normalize', oldVal, this.normalize);
  }

  __assignBuffer() {
    if(! (this.node && this.buffer) ) return;
    this.node.buffer = this.buffer;
  }

  __normalizeChanged() {
    if(!this.node) return;
    this.node.normalize = this['#normalize'];
    this.__dispatchPropChangeEvent('normalize');
  }

}

window.customElements.define('convolver-node', ConvolverNode);