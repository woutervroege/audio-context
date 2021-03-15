class AudioDestinationNode extends HTMLElement {

  get context() {
    return this.closest('audio-context')?.context;
  }

  get node() {
    return this.context?.destination;
  }

}

window.customElements.define('audio-destination-node', AudioDestinationNode);