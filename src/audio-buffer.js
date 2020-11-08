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
        },

        buffer: {
          observe: true,
          changedHandler: '__bufferChanged'
        },

        __context: {
          observe: true,
        },
  
      }
    };
  }

  static get propertiesChangedHandlers() {
    return {
      ...super.propertiesChangedHandlers,
      ...{      
        __decode: ['arrayBuffer', '__context'],
      }
    };
  }
  
  __decode() {
    if(! (this.arrayBuffer && this.__context) ) return;
    this.__context.decodeAudioData(this.arrayBuffer, data => this.buffer = data );
  }

  __bufferChanged() {
    this.dispatchEvent(new CustomEvent('buffer-changed', {bubbles: true}));
  }

}

window.customElements.define('audio-buffer', AudioBuffer);