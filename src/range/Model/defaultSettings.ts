import IValidSettings from "../interfaces/IValidSettings";

const defaultSettings: IValidSettings = {
    minValue: 0,
    maxValue: 1000,
    step: 1,
    valueFrom: 50,
    valueTo: 100,
    isRange: false,
    isTip: true,
    isBarRange: true,
    isVertical: false,
    isStep: true
};

export default defaultSettings;