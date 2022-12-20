/// <reference path="./utils/typings/globals/IJQuery.d.ts" />
import './styleRange.scss';

import FerSlider from './FerSlider';
import IModelSettings from './interfaces/IModelSettings';
import { TDOMParents } from './interfaces/types';

(function init ($) {
  const jquery = $;
  jquery.fn.FerSlider = function createDOM (settings: IModelSettings) {
    const domParent: TDOMParents = this[0];
    const range = new FerSlider(domParent, settings);

    $(domParent).data('FerSlider', range);
    return range;
  }
}(jQuery));