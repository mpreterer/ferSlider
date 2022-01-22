import IValidSettings from "../interfaces/IValidSettings";

const defaultModelSettings: IValidSettings = {
  minValue: 0,
  maxValue: 100,
  step: 1,
  valueFrom: 0,
  valueTo: 100,
  isRange: false,
  isTip: true,
  isBar: true,
  isVertical: false,
  isStep: false
}

export default defaultModelSettings;