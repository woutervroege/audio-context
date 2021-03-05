import { BaseNodeMixin } from './base-node-mixin.js';

class WaveShaperNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      // ...{
      //   curve: {
      //     observe: true,
      //     DOM: true,
      //   },
      //   oversample: {
      //     observe: true,
      //     DOM: true,
      //   }
      // }
    }
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{
        __curveChanged: ['node', 'curve'],
        __oversampleChanged: ['node', 'oversample'],
      }
    };
  }
  

  static get __nodeCreationMethod() {
    return 'createWaveShaper';
  }

  constructor() {
    super();
    this.oversample = '2x';
  }

  get curve() {
    return this.node?.curve || this['#curve'];
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
    console.info('__curveChanged', this.node, this.curve, this.oversample);
    if(!this.node) return;
    this.node.curve = this['#curve'];
    this.__dispatchPropChangeEvent('curve');
  }

  __oversampleChanged() {
    if(!this.node) return;
    this.node.oversample = this['#oversample'];
    this.__dispatchPropChangeEvent('oversample');
  }

}

window.customElements.define('wave-shaper-node', WaveShaperNode);