import { TDOMParents } from '../../range/interfaces/types';
import FerSlider from '../../range/View/FerSlider';
import demoPanel from './demoPanel';

/// <reference path="./utils/typings/globals/IJQueryPanel.d.ts" />

(function ( $ ) {
  $.fn.demoPanel = function(slider: FerSlider) {

    const domParent: TDOMParents = this[0];

    const panel = new demoPanel(domParent, slider);

    return panel;
  }
}(jQuery)); 