import { AudioNodeMixin } from './audio-node-mixin.js';
import { BooleanConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class ConvolverNode extends AudioNodeMixin(HTMLElement) {

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
          changedHandler: '__bufferIdChanged'
        },
        buffer:{
          observe: true,
          changedHandler: function() { this.__dispatchPropChangeEvent('buffer'); }
        }
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __assignBuffer: ['node', 'buffer'],
        __normalizeChanged: ['node', 'normalize'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createConvolver';
  }

  constructor() {
    super();
    this.normalize = true;
  }

  get normalize() {
    return this.node?.normalize || this['#normalize'];
  }

  set normalize(normalize) {
    const oldVal = this.normalize;
    this['#normalize'] = normalize;
    this.propertyChangedCallback('normalize', oldVal, this.normalize);
  }

  __bufferIdChanged(oldId, newId) {
    this.buffer = this.getRootNode().querySelector('#' + newId);
  }

  __assignBuffer() {
    if(! (this.node) ) return;
    this.node.buffer = this.buffer;
  }

  __normalizeChanged() {
    if(!this.node) return;
    this.node.normalize = this['#normalize'];
    this.__dispatchPropChangeEvent('normalize');
  }

}

window.customElements.define('convolver-node', ConvolverNode);