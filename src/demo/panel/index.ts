/// <reference path="../../range/utils/typings/index.d.ts" />

import { TDOMParents } from '../../range/interfaces/types';
import ferSlider from "../../range/View/ferSlider";
import demoPanel from "./demoPanel";

// declare global {
//   interface JQuery {
//     ferSlider(slider: demoPanel): demoPanel;
//   }
// } 

(function ( $ ) {
  $.fn.demoPanel = function(slider: ferSlider) {

    const domParent: TDOMParents = this[0];

    const panel = new demoPanel(domParent, slider);

    return panel;
  }
}(jQuery)); 