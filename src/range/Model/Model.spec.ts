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
        isStep: false
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
      
      //@ts-ignore
      expect(subscriber).toHaveBeenCalledWith(thumb);
    });
  });

  describe('getValidStep:', () => {

    test('Замена значения < 0 на max шаг', () => {
      const { step, min, max } = {
        step: -15,
        min: -700,
        max: -1
      };
      const maxStep = max - min;

      //@ts-ignore
      expect(model.getValidStep(min, max, step)).toEqual(maxStep);
    });

    test('Преобразование ноль на max шаг', () => {
      const { step, min, max } = {
        step: 0,
        min: 0,
        max: 0.1
      };

      const maxStep = max - min;

      //@ts-ignore
      expect(model.getValidStep(min, max, step)).toEqual(maxStep);
    });

    test('Преобразование значения в максимальный шаг, если оно больше максимального значения слайдера и неравно нулю', () => {
      const { step, min, max } = {
        step: 100.1,
        min: 0,
        max: 100
      };

      const maxStep = max - min;

      //@ts-ignore
      expect(model.getValidStep(min, max, step)).toEqual(maxStep);
    });
  });

  describe('getCorrectDiapason:', () => {

    test('Вернет min, если данное значение < или = min у слайдера', () => {
      const { value, min, max } = {
        value: -1.2,
        min: 0,
        max: 100
      };

      //@ts-ignore
      expect(model.getDiapason(value, min, max)).toEqual(min);
    });

    test('Возвращает max, если текущее значение > или = max значению слайдера', () => {
      const { value, min, max } = {
        value: 100.1,
        min: 0,
        max: 100
      };

      //@ts-ignore
      expect(model.getDiapason(value, min, max)).toEqual(max);
    });

    test('Возвращает текущее значение, если оно есть срдеи значений слайдера', () => {
      const { value, min, max } = {
        value: 20,
        min: 0,
        max: 99
      };

      //@ts-ignore
      expect(model.getDiapason(value, min, max)).toEqual(value);
    });
  });

  describe('getValueWithStep:', () => {

    test('Возвращает валидное значение с шагом', () => {
      const { value, min, step } = {
        value: 50,
        min: 25,
        step: 4
      };

      //@ts-ignore
      expect(model.getValueWithStep(value, min, step)).toEqual(49);
    });
  });

  describe('getMiddleValue:', () => {

    test('Возвращает данное значения, если min < max', () => {
      const { minValue, maxValue } = {
        minValue: 0,
        maxValue: 100
      };

      //@ts-ignore
      expect(model.getMiddleValue(minValue, maxValue)).toEqual({ minValue: minValue, maxValue: maxValue });
    });

    test('min станет max, если min > max', () => {
      const { min, max } = {
        min: 0,
        max: -4
      };

      //@ts-ignore
      expect(model.getMiddleValue(min, max)).toEqual({ minValue: max, maxValue: max });
    });
   
  });

  describe('getValidCurrentValue:', () => {
    test('Возвращает данное значение, если оно среди значений слайдера', () => {
      const { min, max, currentValue, isRange } = {
        min: 0,
        max: 100,
        currentValue: 67,
        isRange: false
      };

      //@ts-ignore
      expect(model.getValidCurrentValue(currentValue, isRange, min, max)).toEqual(currentValue);
    });

    test('Возвращает середину по умолчанию', () => {
      const { minValue, maxValue, valueFrom, isRange } = {
        minValue: 0,
        maxValue: 100,
        valueFrom: '12',
        isRange: false
      };

      const middleDiapason = (maxValue - minValue) / 2;

      //@ts-ignore
      expect(model.getValidCurrentValue(valueFrom, isRange, minValue, maxValue)).toEqual(middleDiapason);
    });

    test('Возвращает данные значения, если они в среди значений слайдера, если isRange:true', () => {
      const { min, max, currentValue, isRange } = {
        min: 0,
        max: 100,
        currentValue: { minValue: 10, maxValue: 90 },
        isRange: true
      };

      //@ts-ignore
      expect(model.getValidCurrentValue(currentValue, isRange, min, max)).toEqual(`${currentValue.minValue}`);
    });

    test('Приравнивается данное значения, если min > max', () => {
      const { min, max, currentValue, type } = {
        min: 0,
        max: 100,
        currentValue: { minValue: 50, maxValue: 10 },
        type: true
      };

      //@ts-ignore
      expect(model.getValidCurrentValue(currentValue, type, min, max)).toEqual(currentValue.minValue);
    });
  });
});