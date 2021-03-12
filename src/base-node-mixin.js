import { Properties } from 'html-element-property-mixins';
import { PropertiesChangedCallback } from 'html-element-property-mixins/src/addons';
import { PropertyChangedHandler } from 'html-element-property-mixins/src/addons';
import { PropertiesChangedHandler } from 'html-element-property-mixins/src/addons';

export const BaseNodeMixin = (SuperClass) => class extends PropertiesChangedHandler(PropertiesChangedCallback(PropertyChangedHandler(Properties(SuperClass)))) {

  static get properties() {
    return {
      
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
    };
  }

  constructor() {
    super();
    window.customElements.whenDefined('audio-context').then(this.__create.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    this.__create();
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
    if(!this.context) return; //console.info('context not available yet');
    this.node = this.context[this.constructor.__nodeCreationMethod](this.__nodeCreationOptions);
  }

  __connect() {
    if(! (this.node && this.destinations.length > 0) ) return;
    if(this.__connected === true) return;
    this.__connected = true;
    this.destinations.forEach((dest) => this.node.connect(dest));
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
    if(oldDest) this.__getDestinations(oldDest).forEach((dest) => this.node.disconnect(dest));
    this.__connected = false;
  }

  __nodeChanged(oldVal, newVal) {
    if(newVal && !oldVal) this.__dispatchPropChangeEvent('node', true);
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

};