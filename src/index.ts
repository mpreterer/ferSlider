import ferSlider from "./View/components/slider/ferSlider";
import IModelOptions from "./interfaces/IModelOptions";
/// <reference path="./typings/globals/jquery/index.d.ts" />

declare global {
    interface JQuery {
        ferSlider(options: IModelOptions): ferSlider;
    }
}

(function ($) {
    $.fn.ferSlider = function (options: IModelOptions) {
  
      const domParent:HTMLDivElement = this[0];
      const slider = new ferSlider(domParent, options)
  
      return ferSlider
    }
}(jQuery));