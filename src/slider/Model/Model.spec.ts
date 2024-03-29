import IValidSettings from '../interfaces/IValidSettings';
import { EventList, TUpdateThumb, UpdateValues } from '../interfaces/types';
import defaultSettings from './defaultSettings';
import Model from './Model';

describe("Model:", () => {
  let model: Model;

  beforeEach(() => {
    model = new Model(defaultSettings);
  });

  test('Возвращает экземпляр класса', () => {
    expect(model).toBeInstanceOf(Model);
  });

  describe("updateSettings:", () => {
    test("Обновляются настройки слайдера на вводимые", () => {
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
      };

      model.updateSettings(startSettings);

      expect(model.settings).toStrictEqual(startSettings);
    });

    test('должен прировнять входящие значения, если минимальное больше максимального', () => {
      const newOptions: IValidSettings = {
        ...defaultSettings,
        ...{
          isRange: true,
          valueFrom: 33,
          valueTo: 10,
        },
      };
      const { valueTo } = newOptions;

      model.updateSettings(newOptions);

      expect(model.settings.valueFrom).toEqual(valueTo);
      expect(model.settings.valueTo).toEqual(valueTo);
    });

    test('Не будет принимать не валидные значения', () => {
      const newSettings = {
        ...defaultSettings,
        ...{
          maxValue: NaN,
          minValue: NaN,
          step: NaN,
          valueFrom: NaN,
          valueTo: NaN,
          isRange: true,
        },
      }

      model.updateSettings(newSettings);
      expect(model.settings.maxValue).toBe(defaultSettings.maxValue);
      expect(model.settings.maxValue).toBe(defaultSettings.maxValue);
      expect(model.settings.valueFrom).toBe(defaultSettings.valueFrom);
      expect(model.settings.step).toBe(defaultSettings.step);
      expect(model.settings.valueTo).toBe(defaultSettings.valueTo);
    });
  });

  describe("updateValues:", () => {
    test("Обновление valueFrom на проверенное", () => {
      const thumb: TUpdateThumb = { handle: "valueFrom", value: 10 };

      model.updateValues(thumb);
      const UpdateValueSettings = model.settings;

      expect(UpdateValueSettings.valueFrom).toBe(10);
    });

    test("Обновление значения с учётом знаков после запятой", () => {
      const newSettings = {
        ...defaultSettings,
        ...{
          step: 0.4,
        },
      }

      model.updateSettings(newSettings);
      const thumb: TUpdateThumb = { handle: "valueFrom", value: 72.2 };

      model.updateValues(thumb);
      const UpdateValueSettings = model.settings;

      expect(UpdateValueSettings.valueFrom).toBe(72.4);
    });

    test('должен обновлять текущее значение слайдера', () => {
      const newFrom:UpdateValues = { handle: 'valueFrom', value: 23 };
      const newTo:UpdateValues = { handle: 'valueTo', value: 25 };
      const newSettings: IValidSettings = {
        ...defaultSettings,
        ...{
          isRange: true,
        },
      };

      model.updateSettings(newSettings);

      model.updateValues(newFrom);
      model.updateValues(newTo);

      expect(model.settings.valueFrom).toEqual(newFrom.value);
      expect(model.settings.valueTo).toEqual(newTo.value);
    });

    test(`Оповещение наблюдателей 
      event currentValueChanged 
      об обновлении thumb`, () => {
      const subscriber = jest.fn();
      model.subscribe(EventList.updateValues, subscriber);

      const thumb: TUpdateThumb = { handle: "valueFrom", value: 65 };
      model.updateValues(thumb);

      expect(subscriber).toHaveBeenCalledWith(thumb);
    });
  });

  describe('getValidStep:', () => {
    test('должен преобразовать отрицательное значение на максимальный шаг', () => {
      const { step, min, max } = {
        step: -10,
        min: -99,
        max: -1,
      };

      expect(Model.getValidStep(min, max, step)).toEqual(98);
    });

    test('должен преобразовать нуль-значение на максимальный шаг', () => {
      const { step, min, max } = {
        step: 0,
        min: 0,
        max: 0.1,
      };

      expect(Model.getValidStep(min, max, step)).toEqual(0.1);
    });

    test('должен преобразовать значение в максимальный шаг, если оно больше максимального значения слайдера и неравно нулю', () => {
      const { step, min, max } = {
        step: 100.1,
        min: 0,
        max: 100,
      };

      expect(Model.getValidStep(min, max, step)).toEqual(100);
    });
  });

  describe('getDiapason:', () => {
    test('Вернёт минимальное значение, если текущее значение меньше или равно минимальному', () => {
      const { value, min, max } = {
        value: -0.1,
        min: 0,
        max: 100,
      };

      expect(Model.getDiapason(value, min, max)).toEqual(min);
    });

    test('Вернёт максимальное значение, если текущее значение больше или равно максимальному', () => {
      const { value, min, max } = {
        value: 100.1,
        min: 0,
        max: 100,
      };

      expect(Model.getDiapason(value, min, max)).toEqual(max);
    });

    test('Вернёт текущее значение, если оно в диапазоне значений', () => {
      const { value, min, max } = {
        value: 50,
        min: 0,
        max: 100,
      };

      expect(Model.getDiapason(value, min, max)).toEqual(value);
    });
  });

  describe('getDiapason:', () => {
    test('getModelSettings вернет дефолтную настройку', () => {
      expect(model.getModelSettings()).toStrictEqual(defaultSettings);
    });

    test('getModelSettings новые настройки', () => {
      const newSettings = {
        ...defaultSettings,
        ...{
          isRange: true,
          valueTo: 123,
          valueFrom: 10,
          isTip: false,
        },
      }
      model.updateSettings(newSettings);

      expect(model.getModelSettings()).toBe(newSettings);
    });
  });
});
