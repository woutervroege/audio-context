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
    if(!this.node) return this.__preNodeValues.threshold;
    return this.node.threshold.value;
  }

  set threshold(threshold) {
    if(!this.node) this.__preNodeValues.threshold = threshold;
    else this.node.threshold.value = parseFloat(threshold);
  }

  get knee() {
    if(!this.node) return this.__preNodeValues.knee;
    return this.node.knee.value;
  }

  set knee(knee) {
    if(!this.node) this.__preNodeValues.knee = knee;
    else this.node.knee.value = parseFloat(knee);
  }

  get ratio() {
    if(!this.node) return this.__preNodeValues.ratio;
    return this.node.ratio.value;
  }

  set ratio(ratio) {
    if(!this.node) this.__preNodeValues.ratio = ratio;
    else this.node.ratio.value = parseFloat(ratio);
  }

  get reduction() {
    if(!this.node) return this.__preNodeValues.reduction;
    return this.node.reduction;
  }
  
  get attack() {
    if(!this.node) return this.__preNodeValues.attack;
    return this.node.attack.value;
  }

  set attack(attack) {
    if(!this.node) this.__preNodeValues.attack = attack;
    else this.node.attack.value = attack;
  }

  get release() {
    if(!this.node) return this.__preNodeValues.release;
    return this.node.release.value;
  }

  set release(release) {
    if(!this.node) this.__preNodeValues.release = release;
    else this.node.release.value = release;
  }


}

window.customElements.define('dynamics-compressor-node', DynamicsCompressorNode);