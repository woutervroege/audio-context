import { Properties } from 'html-element-property-mixins';

class AudioDestinationNode extends Properties(HTMLElement) {

  get node() {
    return this.__context?.destination;
  }

}

window.customElements.define('audio-destination-node', AudioDestinationNode);