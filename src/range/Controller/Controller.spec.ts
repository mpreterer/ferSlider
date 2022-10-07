/**
 * @jest-environment jsdom
 */
import IModelSettings from '../interfaces/IModelSettings';
import { UpdateValues } from '../interfaces/types';
import defaultSettings from '../Model/defaultSettings';
import Controller from './Controller';

describe("Controller:", () => {
  describe("update settings:", () => {
    test("Обновление настроек", () => {
      const newSettings: IModelSettings = {
        step: 3,
        isStep: true,
      };

      const mockParent = document.createElement("div");
      const controller = new Controller(mockParent, defaultSettings);

      controller.updateSettings(newSettings);

      expect(controller.settings).toEqual({
        ...defaultSettings,
        ...newSettings,
      });
    });
  });

  describe('updateSettingsValue:', () => {
    test('должен обновлять текущее значение слайдера', () => {
      const newFrom:UpdateValues = { handle: 'thumbLeft', value: 23 };
      const newTo:UpdateValues = { handle: 'thumbRight', value: 25 };

      const mockParent = document.createElement("div");
      const controller = new Controller(mockParent, defaultSettings);

      controller.updateSettings({ isRange: true });
      controller.updateCurrentValue(newFrom);
      controller.updateCurrentValue(newTo);

      expect(controller.settings.valueFrom).toEqual(newFrom.value);
      expect(controller.settings.valueTo).toEqual(newTo.value);
    });
  });
});
