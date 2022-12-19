import { TDOMParents } from '../../slider/interfaces/types';
import FerSlider from '../../slider/View/FerSlider';
import DemoPanel from './DemoPanel';

/// <reference path="./utils/typings/globals/IJQueryPanel.d.ts" />

(function ( $ ) {
  $.fn.DemoPanel = function(slider: FerSlider) {

    const domParent: TDOMParents = this[0];

    const panel = new DemoPanel(domParent, slider);

    return panel;
  }
}(jQuery)); 