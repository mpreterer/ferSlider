/**
 * @jest-environment jsdom
 */
import IValidSettings from '../../../interfaces/IValidSettings';
import defaultSettings from '../../../Model/defaultSettings';
import styleClasses from '../../styleClasses';
import Tip from './Tip';

describe("Tip:", () => {
  const tip = new Tip(defaultSettings);

  beforeEach(() => {
    tip.updateState(defaultSettings);
  });

  describe("updateState:", () => {
    test("должен обновлять состояние tip", () => {
      const newSettings: IValidSettings = {
        ...defaultSettings,
        ...{ isVertical: true },
      };

      tip.updateState(newSettings);

      expect(
        tip.getDom().classList.contains(`${styleClasses.TIP_VERTICAL}`),
      ).toBeTruthy();
    });
  });

  describe("getDom:", () => {
    test("должен вернуть DOM tip", () => {
      expect(tip.getDom()).toEqual(expect.any(HTMLDivElement));
    });
  });

  describe("setValue:", () => {
    test("должен задавать значение подсказки", () => {
      tip.setTipValue('100');

      expect(tip.getDom().textContent).toEqual("100");
    });
  });
});
