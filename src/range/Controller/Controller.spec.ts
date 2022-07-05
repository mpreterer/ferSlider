/**
 * @jest-environment jsdom
 */
import Controller from './Controller';
import defaultSettings from '../Model/defaultSettings';
import { IModelSettings } from '../interfaces/IModelSettings';
 
describe('Controller:', () => {
describe('update settings:', () => {
    test('Обновление настроек', () => {

    const newSettings: IModelSettings = {
        step: 3,
        isStep: true,
    };

    const mockParent = document.createElement('div');
    const controller = new Controller(mockParent, defaultSettings);

    controller.updateSettings(newSettings);

    expect(controller.settings).toEqual({ ...defaultSettings, ...newSettings });
    });
});
}); 