import { Properties } from 'html-element-property-mixins';

class AudioDestinationNode extends Properties(HTMLElement) {

  get context() {
    return this.closest('audio-context')?.context;
  }

  get node() {
    return this.context.destination;
  }

}

window.customElements.define('audio-destination-node', AudioDestinationNode);