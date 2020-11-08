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

      destinationId: {
        observe: true,
        DOM: true,
        attributeName: 'destination-id',
        changedHandler: '__destinationIdChanged'
      },

      __context: {
        observe: true,
      },

      __audioElements: {
        observe: true,
      },

    };
  }

  static get propertiesChangedHandlers() {
    return {
      __create: ['__context'],
      __connect: ['node', '__audioElements', 'destinationId'],
    };
  }

  constructor() {
    super();
    this.__audioElements = [];
    this.__preNodeValues = {};
  }

  get destination() {
    return this.__getDestination(this.destinationId);
  }

  get destinations() {
    return this.__getDestinations(this.destinationId);
  }

  __create() {
    if(! (this.__context) ) return;
    this.node = this.__context[this.constructor.__nodeCreationMethod](this.options);
    this.__init && this.__init();
  }

  __init() {
    for(let propName in this.__preNodeValues) this[propName] = this.__preNodeValues[propName];
    this.__preNodeValues = {};
  }

  __connect() {
    if(! (this.node && this.destinations.length > 0) ) return;
    if(this.__connected === true) return;
    this.__connected = true;
    this.destinations.forEach((dest) => this.node.connect(dest));
  }

  __getDestinations(ids) {
    const destinationIds = ids.split(/,/g);
    return destinationIds.map(id => this.__getDestination(id)).filter(item => item);
  }

  __getDestination(id) {
    const dest = this.__audioElements.find(node => node.id === id);
    return dest?.node;
  }
  __destinationIdChanged(oldDest) {
    if(oldDest) this.__getDestinations(oldDest).forEach((dest) => this.node.disconnect(dest));
    this.__connected = false;
  }

  __nodeChanged(oldVal, newVal) {
    if(newVal && !oldVal) this.__dispatchPropChangeEvent('node', true);
  }

  __dispatchPropChangeEvent(propName, bubbles) {
    this.dispatchEvent(new CustomEvent(`${propName}-changed`, {bubbles: bubbles}));
  }

};