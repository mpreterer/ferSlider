import IValidSettings from "../interfaces/IValidSettings";

const defaultSettings: IValidSettings = {
    minValue: 0,
    maxValue: 100,
    step: 1,
    valueFrom: 50,
    valueTo: 100,
    isRange: false,
    isTip: true,
    isBar: true,
    isVertical: false,
    isStep: false
};

export default defaultSettings;