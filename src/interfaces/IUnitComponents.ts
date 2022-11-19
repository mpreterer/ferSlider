import Bar from '../View/components/bar/Bar';
import Step from '../View/components/step/Step';
import Thumb from '../View/components/thumb/Thumb';
import Tip from '../View/components/tip/Tip';
import Range from '../View/components/range/Range';
import { TDOMParents } from './types';

interface IUnitComponents {
  slider: HTMLDivElement;
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