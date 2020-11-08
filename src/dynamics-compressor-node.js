import { BaseNodeMixin } from './base-node-mixin.js';
import { NumberConverter } from 'html-element-property-mixins/src/utils/attribute-converters';

class DynamicsCompressorNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        threshold: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('threshold'); }
        },
        knee: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('knee'); }
        },
        ratio: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
          changedHandler: function() { this.__dispatchPropChangeEvent('ratio'); }
        },
        attack: {
          observe: true,
          DOM: true,
          changedHandler: function() { this.__dispatchPropChangeEvent('attack'); }
        },
        release: {
          observe: true,
          DOM: true,
          changedHandler: function() { this.__dispatchPropChangeEvent('release'); }
        },
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createDynamicsCompressor';
  }

  get threshold() {
    return this.node?.threshold.value;
  }

  set threshold(threshold) {
    this.node.threshold.value = parseFloat(threshold);
  }

  get knee() {
    return this.node?.knee.value;
  }

  set knee(knee) {
    this.node.knee.value = parseFloat(knee);
  }

  get ratio() {
    return this.node?.ratio.value;
  }

  set ratio(ratio) {
    this.node.ratio.value = parseFloat(ratio);
  }

  get reduction() {
    return this.node?.reduction;
  }
  
  get attack() {
    return this.node?.attack.value;
  }

  set attack(attack) {
    this.node.attack.value = attack;
  }

  get release() {
    return this.node?.release.value;
  }

  set release(release) {
    this.node.release.value = release;
  }

}

window.customElements.define('dynamics-compressor-node', DynamicsCompressorNode);