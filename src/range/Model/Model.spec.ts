import defaultModelSettings from '../utils/defaultModelSettings';
import { TUpdateThumb } from '../interfaces/types';
import Model from './Model';
import IValidSettings from '../interfaces/IValidSettings';

describe('Model:', () => {
  const settings = defaultModelSettings;
  const model = new Model(settings);

  describe('updateModelSettings:', () => {
    test('Обновляются настройки слайдера на вводимые', () => {
      const startSettings: IValidSettings = {
        minValue: 0,
        maxValue: 100,
        step: 1,
        valueFrom: 0,
        valueTo: 40,
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false,
      }

      model.updateModelSettings(startSettings);

      expect(model.settings).toStrictEqual(startSettings);
    });
  });

  describe('updateCurrentValueSettings:', () => {
    test('Обновление valueFrom на проверенное', () => {
      const thumb: TUpdateThumb = { handle: 'thumbLeft', value: 10 };

      model.updateCurrentValueSettings(thumb);
      const UpdateValueSettings = model.settings;

      expect(UpdateValueSettings.valueFrom).toBe(10);
    });

    test('Оповещение наблюдателей event currentValueChanged об обновлении thumb', () => {
      const subscriber = jest.fn();
      model.events.currentValueChanged.subscribe(subscriber);

      const thumb: TUpdateThumb = { handle: 'thumbLeft', value: 65 };
      model.updateCurrentValueSettings(thumb);

      expect(subscriber).toHaveBeenCalledWith(thumb);
    });
  });
});