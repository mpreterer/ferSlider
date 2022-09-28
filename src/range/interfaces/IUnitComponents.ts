import Step from '../View/components/step/step';
import { TDOMParents } from './types';

interface IUnitComponents {
  slider: HTMLDivElement;
  tip: HTMLDivElement;
  range: HTMLDivElement;
  bar: HTMLDivElement;
  thumbLeft: ITip;
  thumbRight: ITip;
  steps: Step;
  domParent: TDOMParents;
}

interface ITip {
  thumb: HTMLDivElement,
  tip: HTMLDivElement
}

export default IUnitComponents;