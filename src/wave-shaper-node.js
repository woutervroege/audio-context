import { BaseNodeMixin } from './base-node-mixin.js';

class WaveShaperNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
        curve: {
          observe: true,
          DOM: true,
        },
        oversample: {
          observe: true,
          DOM: true,
        }
      }
    }
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __normalizeChanged: ['node', 'normalize'],
        __oversampleChanged: ['node', 'oversample'],
      }
    };
  }

  static get __nodeCreationMethod() {
    return 'createWaveShaper';
  }

  get curve() {
    return this.node?.curve.value || this['#curve'];
  }

  set curve(curve) {
    const oldVal = this.curve;
    this['#curve'] = curve;
    this.propertyChangedCallback('curve', oldVal, this.curve);
  }

  get oversample() {
    return this.node?.oversample.value || this['#oversample'];
  }

  set oversample(oversample) {
    const oldVal = this.oversample;
    this['#oversample'] = oversample;
    this.propertyChangedCallback('oversample', oldVal, this.oversample);
  }

  __curveChanged() {
    this.__setNodeParam('curve')
  }

  __oversampleChanged() {
    this.__setNodeParam('oversample')
  }

}

window.customElements.define('wave-shaper-node', WaveShaperNode);