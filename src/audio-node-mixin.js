import { Properties } from 'html-element-property-mixins';
import { PropertiesChangedCallback } from 'html-element-property-mixins/src/addons';
import { PropertyChangedHandler } from 'html-element-property-mixins/src/addons';
import { PropertiesChangedHandler } from 'html-element-property-mixins/src/addons';

export const AudioNodeMixin = (SuperClass) => class extends PropertiesChangedHandler(PropertiesChangedCallback(PropertyChangedHandler(Properties(SuperClass)))) {

  static get properties() {
    return {

      channelCount: {
        observe: true,
        DOM: true
      },

      channelCountMode: {
        observe: true,
        DOM: true
      },

      channelInterpretation: {
        observe: true,
        DOM: true
      },
      
      node: {
        observe: true,
        changedHandler: '__nodeChanged'
      },

      dest: {
        observe: true,
        DOM: true,
        changedHandler: '__destChanged'
      },

    };
  }

  static get propertiesChangedHandlers() {
    return {
      __connect: ['node', 'dest'],
      __channelCountChanged: ['node', 'channelCount'],
      __channelCountModeChanged: ['node', 'channelCountMode'],
      __channelInterpretationChanged: ['node', 'channelInterpretation'],
    };
  }

  constructor() {
    super();
    this.channelCount = 2;
    this.channelCountMode = 'max';
    this.channelInterpretation = 'speakers';
    window.customElements.whenDefined('audio-context').then(this.__create.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    this.__create();
  }

  connect() {
    return this.node?.connect(...arguments);
  }

  disconnect() {
    return this.node?.disconnect(...arguments);
  }

  get numberOfInputs() {
    return this.node?.numberOfInputs || 0;
  }

  get numberOfOutputs() {
    return this.node?.numberOfOutputs || 0;  
  }

  get channelCount() {
    return this.node?.channelCount || this['#channelCount'];
  }

  set channelCount(channelCount) {
    const oldVal = this.channelCount;
    this['#channelCount'] = channelCount;
    this.propertyChangedCallback('channelCount', oldVal, this.channelCount);
  }

  get channelCountMode() {
    return this.node?.channelCountMode || this['#channelCountMode'];
  }

  set channelCountMode(channelCountMode) {
    const oldVal = this.channelCountMode;
    this['#channelCountMode'] = channelCountMode;
    this.propertyChangedCallback('channelCountMode', oldVal, this.channelCountMode);
  }

  get channelInterpretation() {
    return this.node?.channelInterpretation || this['#channelInterpretation'];
  }

  set channelInterpretation(channelInterpretation) {
    const oldVal = this.channelInterpretation;
    this['#channelInterpretation'] = channelInterpretation;
    this.propertyChangedCallback('channelInterpretation', oldVal, this.channelInterpretation);
  }

  get destinations() {
    return this.__getDestinations(this.dest);
  }

  get context() {
    return this.closest('audio-context')?.context;
  }

  get node() {
    return this.__node;
  }

  set node(node) {
    if(this.__node) return;
    this.__node = node;
  }

  get __audioElements() {
    return [...this.closest('audio-context').children].filter(child => child?.node ? this.__getConstructorChain(child?.node).has('AudioNode') : false);
  }

  get __bufferElements() {
    return [...this.closest('audio-context').children].filter(child => child.localName === 'audio-buffer');
  }

  __create() {
    if(!this.context || !this.constructor.__nodeCreationMethod) return;
    this.node = this.context[this.constructor.__nodeCreationMethod](this.__nodeCreationOptions);
  }

  __connect() {
    if(! (this.node && this.destinations.length > 0) ) return;
    if(this.__connected === true) return;
    this.__connected = true;
    this.destinations.forEach((dest) => this.connect(dest));
  }

  __getDestinations(ids='') {
    const dests = ids.split(/,/g);
    return dests.map(id => this.__getDestination(id)).filter(item => item);
  }

  __getDestination(id) {
    const dest = this.__audioElements.find(node => node.id === id);
    return dest?.node;
  }
  __destChanged(oldDest) {
    if(oldDest) this.__getDestinations(oldDest).forEach((dest) => this.disconnect(dest));
    this.__connected = false;
  }

  __nodeChanged(oldVal, newVal) {
    if(newVal && !oldVal) this.__dispatchPropChangeEvent('node');
  }

  __dispatchPropChangeEvent(propName, bubbles) {
    this.dispatchEvent(new CustomEvent(`${propName}-changed`, {bubbles: bubbles}));
  }

  __getConstructorChain(obj=this.node, names=new Set()) {
    const prototype = Object.getPrototypeOf(obj);
    if(!prototype?.constructor) return names;
    names.add(prototype.constructor.name);
    return this.__getConstructorChain(prototype, names);
  }

  __setNodeParam(propName) {
    if(!this.node) return;
    this.node[propName].value = this['#' + propName];
    this.__dispatchPropChangeEvent(propName);
  }

  __channelCountChanged() {
    if(!this.node) return;
    this.node.channelCount = this['#channelCount'];
    this.__dispatchPropChangeEvent('channelCount');
  }

  __channelCountModeChanged() {
    if(!this.node) return;
    this.node.channelCountMode = this['#channelCountMode'];
    this.__dispatchPropChangeEvent('channelCountMode');
  }

  __channelInterpretationChanged() {
    if(!this.node) return;
    this.node.channelInterpretation = this['#channelInterpretation'];
    this.__dispatchPropChangeEvent('channelInterpretation');
  }

};