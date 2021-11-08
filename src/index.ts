import ferSlider from "./ferSlider";
import IModelOptions from "./interfaces/IModelOptions";

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