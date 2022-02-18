import IValidSettings from "../interfaces/IValidSettings";

const defaultModelSettings: IValidSettings = {
  minValue: 0,
  maxValue: 400,
  step: 1,
  valueFrom: 0,
  valueTo: 100,
  isRange: true,
  isTip: true,
  isBarRange: true,
  isVertical: false,
  isStep: true
}

export default defaultModelSettings;