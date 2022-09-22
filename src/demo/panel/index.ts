/// <reference path="./utils/typings/globals/IJQueryPanel.d.ts" />

import { TDOMParents } from '../../range/interfaces/types';
import FerSlider from "../../range/View/FerSlider";
import demoPanel from "./demoPanel";

(function ( $ ) {
  $.fn.demoPanel = function(slider: FerSlider) {

    const domParent: TDOMParents = this[0];

    const panel = new demoPanel(domParent, slider);

    return panel;
  }
}(jQuery)); 