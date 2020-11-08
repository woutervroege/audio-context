import { Properties } from 'html-element-property-mixins';
import { PropertyChangedHandler } from 'html-element-property-mixins/src/addons/property-changed-handler-mixin';

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
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>';
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.__audioElementsChanged.bind(this));
    this.addEventListener('node-changed', this.__audioElementsChanged.bind(this));
    this.addEventListener('buffer-changed', this.__bufferElementsChanged.bind(this));
  }

  get audioWorklet() {
    return this.context.audioWorklet;
  }

  get baseLatency() {
    return this.context.baseLatency;
  }

  get context() {
    return this.__context;
  }

  set context(context) {
    if(this.__context) return;
    this.__context = context;
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

  __audioElementsChanged() {
    this.dispatchEvent(new CustomEvent('nodes-changed', {composed: true, bubbles: true}));
  }

  __bufferElementsChanged() {
    this.dispatchEvent(new CustomEvent('buffers-changed', {composed: true, bubbles: true}));
  }

}

window.customElements.define('audio-context', AudioContextElement);