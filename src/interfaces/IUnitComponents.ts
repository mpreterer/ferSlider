import Bar from '../View/components/bar/Bar';
import Step from '../View/components/step/Step';
import Thumb from '../View/components/thumb/Thumb';
import Tip from '../View/components/tip/Tip';
import Range from '../View/components/range/Range';
import { TDOMParents } from './types';
import Slider from '../View/components/slider/Slider';

interface IUnitComponents {
  slider: Slider;
  tip: Tip;
  range: Range;
  bar: Bar;
  valueFrom: ITip;
  valueTo: ITip;
  steps: Step;
  domParent: TDOMParents;
}

interface ITip {
  thumb: Thumb,
  tip: Tip
}

export default IUnitComponents;