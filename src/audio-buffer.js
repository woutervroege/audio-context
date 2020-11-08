import { Properties } from 'html-element-property-mixins';
import { PropertiesChangedCallback } from 'html-element-property-mixins/src/addons';
import { PropertyChangedHandler } from 'html-element-property-mixins/src/addons';
import { PropertiesChangedHandler } from 'html-element-property-mixins/src/addons';

class AudioBuffer extends PropertiesChangedHandler(PropertiesChangedCallback(PropertyChangedHandler(Properties(HTMLElement)))) {

  static get properties() {
    return {
      ...super.properties,
      ...{   

        arrayBuffer: {
          observe: true,
          changedHandler: '__decode'
        },

        buffer: {
          observe: true,
          changedHandler: '__bufferChanged'
        },
  
      }
    };
  }

  get context() {
    return this.closest('audio-context')?.context;
  }
  
  __decode() {
    if(! (this.arrayBuffer) ) return;
    this.context.decodeAudioData(this.arrayBuffer, data => this.buffer = data );
  }

  __bufferChanged() {
    this.dispatchEvent(new CustomEvent('buffer-changed', {bubbles: true}));
  }

}

window.customElements.define('audio-buffer', AudioBuffer);