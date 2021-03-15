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
        },
        knee: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
        ratio: {
          observe: true,
          DOM: true,
          fromAttributeConverter: NumberConverter.fromAttribute,
        },
        attack: {
          observe: true,
          DOM: true,
        },
        release: {
          observe: true,
          DOM: true,
        },
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __thresholdChanged: ['node', 'threshold'],
        __kneeChanged: ['node', 'knee'],
        __ratioChanged: ['node', 'ratio'],
        __attackChanged: ['node', 'attack'],
        __releaseChanged: ['node', 'release']
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createDynamicsCompressor';
  }

  constructor() {
    super();
    this.threshold = -24;
    this.knee = 30;
    this.ratio = 12;
    this.attack = 0.003000000026077032;
    this.release = 0.25;
  }

  get threshold() {
    return this.node?.threshold.value || this['#threshold'];
  }
  
  set threshold(threshold) {
    const oldVal = this.threshold;
    this['#threshold'] = parseFloat(threshold);
    this.propertyChangedCallback('threshold', oldVal, this.threshold);
  }
  
  get knee() {
    return this.node?.knee.value || this['#knee'];
  }
  
  set knee(knee) {
    const oldVal = this.knee;
    this['#knee'] = parseFloat(knee);
    this.propertyChangedCallback('knee', oldVal, this.knee);
  }
  
  get ratio() {
    return this.node?.ratio.value || this['#ratio'];
  }
  
  set ratio(ratio) {
    const oldVal = this.ratio;
    this['#ratio'] = parseFloat(ratio);
    this.propertyChangedCallback('ratio', oldVal, this.ratio);
  }
  
  get attack() {
    return this.node?.attack.value || this['#attack'];
  }
  
  set attack(attack) {
    const oldVal = this.attack;
    this['#attack'] = attack;
    this.propertyChangedCallback('attack', oldVal, this.attack);
  }
  
  get release() {
    return this.node?.release.value || this['#release'];
  }
  
  set release(release) {
    const oldVal = this.release;
    this['#release'] = release;
    this.propertyChangedCallback('release', oldVal, this.release);
  }

  get reduction() {
    return this.node?.reduction;
  }

  __thresholdChanged() {
    this.__setNodeParam('threshold')
  }
  
  __kneeChanged() {
    this.__setNodeParam('knee')
  }
  
  __ratioChanged() {
    this.__setNodeParam('ratio')
  }
  
  __attackChanged() {
    this.__setNodeParam('attack')
  }
  
  __releaseChanged() {
    this.__setNodeParam('release')
  }

}

window.customElements.define('dynamics-compressor-node', DynamicsCompressorNode);