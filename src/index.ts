// import ferSlider from "./ferSlider";

(function ($) {
    $.fn.ferSlider = function (options: IModelOptions) {
  
      const domParent:HTMLDivElement = this[0];
  
      const ferSlider = new ferSlider(domParent, options)
  
      return ferSlider
    }
}(jQuery));