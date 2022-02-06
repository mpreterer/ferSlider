import IValidSettings from "../interfaces/IValidSettings";

const defaultSettings: IValidSettings = {
    minValue: 0,
    maxValue: 100,
    step: 1,
    valueFrom: 50,
    valueTo: 100,
    isRange: true,
    isTip: true,
    isBar: true,
    isVertical: false,
    isStep: true
};

export default defaultSettings;