/**
 * @jest-environment jsdom
 */
import $ from 'jquery';
import View from './View';
import IValidSettings from '../interfaces/IValidSettings';
import styleClasses from './styleClasses';
import { TUpdateThumb } from '../interfaces/types';
import defaultSettings from '../Model/defaultSettings';

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
        isStep: true
      };

      const getNodes = (body: HTMLElement) => ({
        isRange: body.querySelector(`.${styleClasses.RANGE}`),
        isVertical: body.querySelector(`.${styleClasses.SLIDER_VERTICAL}`)
      })

      const domParent = document.createElement('div');
      const view = new View(domParent, defaultSettings);
      view.updateModelSettings(newSettings);

      const { isRange, isVertical } = getNodes(domParent)

      expect(isRange).toBeTruthy();
      expect(isVertical).toBeFalsy();
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
        isStep: true
      };
      const newFromValue: TUpdateThumb = {
        handle: 'thumbLeft',
        value: 5
      }
      const newToValue: TUpdateThumb = {
        handle: 'thumbRight',
        value: 60
      }
      
      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);

      view.updateCurrentValue(newToValue);
      view.updateCurrentValue(newFromValue);
      const valueToSelector = (mockParent.querySelector('[data-thumb="2"]'));
      const valueFromSelector = (mockParent.querySelector('[data-thumb="1"]'));
      
      if (valueToSelector instanceof HTMLElement && valueFromSelector instanceof HTMLElement){
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
        isStep: true
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
        isStep: true
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
  });
});