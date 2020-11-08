import { Properties } from 'html-element-property-mixins';
import { PropertyChangedHandler } from 'html-element-property-mixins/src/addons/property-changed-handler-mixin';
const CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

class AudioContextElement extends PropertyChangedHandler(Properties(HTMLElement)) {

  static get properties() {
    return {
      context: {
        observe: true,
        changedHandler: '__contextChanged'
      },
    };
  }
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>';
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.__audioElementsChanged.bind(this));
    this.addEventListener('node-changed', this.__audioElementsChanged.bind(this));
    this.addEventListener('buffer-changed', this.__bufferElementsChanged.bind(this));
  }

  get audioElements() {
    return [...this.children].filter(child => child?.node ? this.__getConstructorChain(child?.node).has('AudioNode') : false);
  }

  get bufferElements() {
    return [...this.children].filter(child => child.localName === 'audio-buffer');
  }

  get context() {
    return CONTEXT;
  }

  get audioWorklet() {
    return this.context.audioWorklet;
  }

  get baseLatency() {
    return this.context.baseLatency;
  }

  close() {
    return this.context.close();
  }

  createMediaElementSource() {
    return this.context.createMediaElementSource();
  } 

  createMediaStreamDestination() {
    return this.context.createMediaStreamDestination();
  } 

  createMediaStreamSource() {
    return this.context.createMediaStreamSource();
  } 

  get currentTime() {
    return this.context.currentTime;
  }

  get destination() {
    return this.context.destination;
  }

  getOutputTimestamp() {
    return this.context.getOutputTimestamp;
  }

  get listener() {
    return this.context.listener;
  }

  get onstatechange() {
    return this.context.onstatechange;
  }

  resume() {
    return this.context.resume();
  }

  get sampleRate() {
    return this.context.sampleRate;
  }

  get state() {
    return this.context.state;
  }

  suspend() {
    return this.context.suspend();
  }

  __contextChanged() {
    this.__updateChildren();
    this.dispatchEvent(new CustomEvent('context-changed'));
  }

  __audioElementsChanged() {
    this.__updateChildren();
    this.dispatchEvent(new CustomEvent('nodes-changed', {composed: true, bubbles: true}));
  }

  __bufferElementsChanged() {
    this.__updateChildren();
    this.dispatchEvent(new CustomEvent('buffers-changed', {composed: true, bubbles: true}));
  }

  __updateChildren() {
    [...this.children].map(node => {
      node.__audioElements = [...this.audioElements];
      node.__bufferElements = [...this.bufferElements];
      node.__context = this.context;
    });
  }

  __getConstructorChain(obj=this.node, names=new Set()) {
    const prototype = Object.getPrototypeOf(obj);
    if(!prototype?.constructor) return names;
    names.add(prototype.constructor.name);
    return this.__getConstructorChain(prototype, names);
  }

}

window.customElements.define('audio-context', AudioContextElement);