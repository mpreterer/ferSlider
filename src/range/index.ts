/// <reference path="./utils/typings/globals/IJQuery.d.ts" />
import ferSlider from "./View/ferSlider";
import { IModelSettings } from "./interfaces/IModelSettings";
import { TDOMParents } from "./interfaces/types";
import defaultSettings from "./Model/defaultSettings";

(function ($) {
  $.fn.ferSlider = function (settings?: IModelSettings) {
    const validOptions: IModelSettings = $.extend({}, defaultSettings, settings);
    const domParent: TDOMParents = this[0];

    const range = new ferSlider(domParent, validOptions);
    return range;
  }
}(jQuery));