/// <reference path="./utils/typings/globals/IJQuery.d.ts" />
import IModelSettings from './interfaces/IModelSettings';
import { TDOMParents } from './interfaces/types';
import FerSlider from './View/FerSlider';

(function init ($) {
  const jquery = $;
  jquery.fn.FerSlider = function createDOM (settings: IModelSettings) {
    const domParent: TDOMParents = this[0];

    const range = new FerSlider(domParent, settings);
    return range;
  }
}(jQuery));