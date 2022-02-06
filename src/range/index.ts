/// <reference path="./utils/typings/globals/jquery/index.d.ts" />
import ferSlider from "./View/ferSlider";
import { IModelSettings } from "./interfaces/IModelSettings";
import { TDOMParents } from "./interfaces/types";
import defaultSettings from "./Model/defaultSettings";

declare global {
    interface JQuery {
        ferSlider(settings?: IModelSettings): ferSlider;
    }
}

(function ($) {
    $.fn.ferSlider = function(settings?: IModelSettings) {
      const validOptions: IModelSettings = $.extend({}, defaultSettings, settings);
      const domParent: TDOMParents = this[0];

      const range = new ferSlider(domParent, validOptions);
        console.log(domParent)
      return range;
    }
}(jQuery));