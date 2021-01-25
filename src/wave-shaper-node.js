import { BaseNodeMixin } from './base-node-mixin.js';

class WaveShaperNode extends BaseNodeMixin(HTMLElement) {

  static get properties() {
    return {
      ...super.properties,
      ...{
      curve: {
        observe: true,
        DOM: true,
        changedHandler: function() { this.__dispatchPropChangeEvent('curve') }
      }
      },
      oversample: {
        observe: true,
        DOM: true,
        changedHandler: function() { this.__dispatchPropChangeEvent('oversample') }
      }
    }
  }

  static get __nodeCreationMethod() {
    return 'createWaveShaper';
  }

  get curve() {
    if(!this.node) return;
    return this.node.curve;
  }

  set curve(curve) {
    if(!this.node) return;
    this.node.curve = curve;
  }

  get oversample() {
    if(!this.node) return;
    return this.node.oversample;
  }

  set oversample(oversample) {
    if(!this.node) return;
    this.node.oversample = oversample;
  }
}

window.customElements.define('wave-shaper-node', WaveShaperNode);