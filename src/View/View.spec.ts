/**
 * @jest-environment jsdom
 */
import IValidSettings from '../interfaces/IValidSettings';
import { TUpdateThumb } from '../interfaces/types';
import defaultSettings from '../Model/defaultSettings';
import styleClasses from './styleClasses';
import View from './View';

describe('View:', () => {
  describe('updateModelSettings:', () => {
    test('Обновление настроек', () => {
      const newSettings: IValidSettings = {
        minValue: 1,
        maxValue: 101,
        step: 2,
        valueFrom: 0,
        valueTo: 40,
        isRange: true,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: true,
      };

      const getNodes = (body: HTMLElement) => ({
        range: body.querySelector(`.${styleClasses.RANGE}`),
        vertical: body.querySelector(`.${styleClasses.SLIDER_VERTICAL}`),
      })

      const domParent = document.createElement('div');
      const view = new View(domParent, defaultSettings);
      view.updateModelSettings(newSettings);

      const { range, vertical } = getNodes(domParent)

      expect(range).toBeTruthy();
      expect(vertical).toBeFalsy();
    });
  });
  describe('updateCurrentValue:', () => {
    test('Обновление значения позлунков слайдера', () => {
      const newSettings: IValidSettings = {
        minValue: 0,
        maxValue: 100,
        step: 1,
        valueFrom: 0,
        valueTo: 30,
        isRange: true,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: true,
      };
      const newFromValue: TUpdateThumb = {
        handle: 'thumbLeft',
        value: 5,
      }
      const newToValue: TUpdateThumb = {
        handle: 'thumbRight',
        value: 60,
      }

      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);

      view.updateCurrentValue(newToValue);
      view.updateCurrentValue(newFromValue);
      const valueToSelector = (mockParent.querySelector('[data-thumb="2"]'));
      const valueFromSelector = (mockParent.querySelector('[data-thumb="1"]'));

      if (valueToSelector instanceof HTMLElement && valueFromSelector instanceof HTMLElement) {
        const valueTo = valueToSelector.querySelector(`.${styleClasses.TIP}`);
        const valueFrom = valueFromSelector.querySelector(`.${styleClasses.TIP}`)

        if (valueTo instanceof HTMLDivElement && valueFrom instanceof HTMLDivElement) {
          expect(valueTo.innerHTML).toBe(`${newToValue.value}`);
          expect(valueFrom.innerHTML).toBe(`${newFromValue.value}`);
        }
      }
    });
  });

  describe('initSubView, render:', () => {
    test('Валидный DOM слайдера', () => {
      const newSettings: IValidSettings = {
        minValue: 0,
        maxValue: 100,
        step: 1,
        valueFrom: 0,
        valueTo: 30,
        isRange: true,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: true,
      };

      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);

      expect(mockParent.querySelector(`.${styleClasses.SLIDER}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.BAR}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.RANGE}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.THUMB}`)[0]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.THUMB}`)[1]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.STEP}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.TIP}`)[0]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.TIP}`)[1]).toBeInstanceOf(HTMLElement);
    });
  });

  describe('renderSubComponentsStyles:', () => {
    test('Правильно задаются классы и атрибуты для subView элементов', () => {
      const newSettings: IValidSettings = {
        minValue: 0,
        maxValue: 100,
        step: 1,
        valueFrom: 0,
        valueTo: 30,
        isRange: true,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: true,
      };

      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);

      const SLIDER = mockParent.querySelector(`.${styleClasses.SLIDER}`)!;
      const BAR = mockParent.querySelector(`.${styleClasses.BAR}`)!;
      const RANGE = mockParent.querySelector(`.${styleClasses.RANGE}`)!;
      const THUMBS = mockParent.querySelectorAll(`.${styleClasses.THUMB}`)!;
      const TIPS = mockParent.querySelectorAll(`.${styleClasses.TIP}`)!;
      const STEP = mockParent.querySelector(`.${styleClasses.STEP}`)!;
      const STEP_ITEM = mockParent.querySelectorAll(`.${styleClasses.STEP_ITEM}`)!;

      expect(SLIDER.classList.contains(`${styleClasses.SLIDER}`)).toBeTruthy();
      expect(BAR.classList.contains(`${styleClasses.BAR}`)).toBeTruthy();
      expect(RANGE.classList.contains(`${styleClasses.RANGE}`)).toBeTruthy();

      expect(THUMBS[0].classList.contains(`${styleClasses.THUMB}`)).toBeTruthy();
      expect(THUMBS[0].getAttribute(`data-thumb`)).toEqual(`1`);
      expect(TIPS[0].classList.contains(`${styleClasses.TIP}`)).toBeTruthy();

      expect(THUMBS[1].classList.contains(`${styleClasses.THUMB}`)).toBeTruthy();
      expect(THUMBS[1].getAttribute(`data-thumb`)).toEqual(`2`);
      expect(TIPS[1].classList.contains(`${styleClasses.TIP}`)).toBeTruthy();

      expect(STEP.classList.contains(`${styleClasses.STEP}`)).toBeTruthy();
      STEP_ITEM.forEach((item) => {
        expect(item.classList.contains(`${styleClasses.STEP_ITEM}`)).toBeTruthy();
      });
    });

    test('должен удалять лишние dom-элементы subView', () => {
      const newSettings: IValidSettings = {
        ...defaultSettings,
        ...{
          valueFrom: 15,
          isRange: false,
          isBarRange: false,
          isStep: false,
          isTip: false,
        },
      };

      const getNodes = (body: HTMLElement) => ({
        isBarRange: body.querySelector(`.${styleClasses.RANGE}`),
        valueTo: body.querySelectorAll(`.${styleClasses.THUMB}`)[1],
        isStep: body.querySelector(`.${styleClasses.STEP}`),
        isTip: body.querySelector(`.${styleClasses.TIP}`),
      })

      const mockParent = document.createElement('div');
      const view = new View(mockParent, defaultSettings);

      view.updateModelSettings(newSettings);

      const {
        isBarRange,
        valueTo,
        isStep,
        isTip,
      } = getNodes(mockParent);

      expect(isBarRange).toBeFalsy();
      expect(valueTo).toBeFalsy();
      expect(isStep).toBeFalsy();
      expect(isTip).toBeFalsy();
    });

    test('должен добавлять отсутствующие subView dom-элементы', () => {
      const newSettings: IValidSettings = {
        ...defaultSettings,
        ...{
          valueTo: 33,
          isRange: true,
        },
      };

      const mockParent = document.createElement('div');
      const view = new View(mockParent, defaultSettings);

      view.updateModelSettings(newSettings);

      const getNodes = (body: HTMLElement) => ({
        valueFrom: body.querySelectorAll(`.${styleClasses.THUMB}`)[0],
        valueFromTip: body.querySelectorAll(`.${styleClasses.TIP}`)[0],
        valueTo: body.querySelectorAll(`.${styleClasses.THUMB}`)[1],
        valueToTip: body.querySelectorAll(`.${styleClasses.TIP}`)[1],
      })

      const {
        valueFrom,
        valueTo,
        valueToTip,
        valueFromTip,
      } = getNodes(mockParent);

      expect(valueFrom).toBeInstanceOf(HTMLElement);
      expect(valueFromTip).toBeInstanceOf(HTMLElement);
      expect(valueTo).toBeInstanceOf(HTMLElement);
      expect(valueToTip).toBeInstanceOf(HTMLElement);
    });
  });

  describe('setRangePosition:', () => {
    describe('должен корректно задавать стили для DOM range элеменета слайдера:', () => {
      test('при vertical положении', () => {
        const newSettings: IValidSettings = {
          ...defaultSettings,
          ...{
            isVertical: true,
            valueFrom: 99.9,
            maxValue: 100,
          },
        };

        const getNodes = (body: HTMLElement) => ({
          range: body.querySelector(`.${styleClasses.RANGE}`) as HTMLElement,
        })

        const mockParent = document.createElement('div');
        const view = new View(mockParent, defaultSettings);

        view.updateModelSettings(newSettings);

        const { range } = getNodes(mockParent);
        const rangeTopNum = Number((parseFloat(range.style.top).toFixed(1)));
        const rangeBottomNum = parseFloat(range.style.bottom);

        expect(rangeTopNum).toEqual(0.1);
        expect(rangeBottomNum).toEqual(0);
      });

      test('при ltr положении', () => {
        const newOptions: IValidSettings = {
          ...defaultSettings,
          ...{ valueFrom: 30, maxValue: 100 },
        };

        const mockParent = document.createElement('div');
        const view = new View(mockParent, defaultSettings);

        const getNodes = (body: HTMLElement) => ({
          range: body.querySelector(`.${styleClasses.RANGE}`) as HTMLElement,
        })

        view.updateModelSettings(newOptions);

        const { range } = getNodes(mockParent);
        const rangeLeftNum = parseFloat(range.style.left);
        const rangeRightNum = parseFloat(range.style.right);

        expect(rangeLeftNum).toEqual(0);
        expect(rangeRightNum).toEqual(70);
      });
    });
  });
});