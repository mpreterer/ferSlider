import Step from '../View/components/step/Step';
import { TDOMParents } from './types';

interface IUnitComponents {
  slider: HTMLDivElement;
  tip: HTMLDivElement;
  range: HTMLDivElement;
  bar: HTMLDivElement;
  valueFrom: ITip;
  valueTo: ITip;
  steps: Step;
  domParent: TDOMParents;
}

interface ITip {
  thumb: HTMLDivElement,
  tip: HTMLDivElement
}

export default IUnitComponents;