/**
 * @jest-environment jsdom
 */
import IModelSettings from '../interfaces/IModelSettings';
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
});
