/**
 * @jest-environment jsdom
 */
import IValidSettings from '../../../interfaces/IValidSettings';
import defaultSettings from '../../../Model/defaultSettings';
import styleClasses from '../../styleClasses';
import Step from './Step';

describe("Step:", () => {
  const step = new Step(defaultSettings);

  beforeEach(() => {
    step.updateState(defaultSettings);
  });

  describe("updateState:", () => {
    test("должен обновлять состояние шкалы", () => {
      const newOptions: IValidSettings = {
        ...defaultSettings,
        ...{ isVertical: true },
      };

      step.updateState(newOptions);

      expect(
        step.getDom().classList.contains(`${styleClasses.STEP_VERTICAL}`),
      ).toBeTruthy();
    });
  });

  describe("getDom:", () => {
    test("должен вернуть DOM шкалы", () => {
      expect(step.getDom()).toEqual(expect.any(HTMLUListElement));
    });
  });

  describe("getItems count:", () => {
    test("должен вернуть значения шкалы", () => {
      expect(step.getItems().length).toEqual(6);
    });
  });

  describe("getItems:", () => {
    test("должен вернуть DOMs значений шкалы", () => {
      step.getItems().forEach((item) => {
        expect(item).toEqual(expect.any(HTMLLIElement));
      });
    });
  });

  describe("renderSteps:", () => {
    test("должен вернуть 5 элементов шкалы при большом диапазоне", () => {
      const newSettings = {
        ...defaultSettings,
        ...{
          maxValue: 1000000,
        },
      }

      step.updateState(newSettings);
      expect(step.getItems().length).toEqual(5);
    });
  });
});
