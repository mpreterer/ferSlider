/**
 * @jest-environment jsdom
 */
import $ from 'jquery';
import View from './View';
import defaultModelSettings from '../utils/defaultModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import styleClasses from './styleClasses';
import { TUpdateThumb } from '../interfaces/types';

describe('View:', () => {

  describe('updateModelSettings:', () => {
    test('Обновление настроек', () => {
      const newSettings: IValidSettings = {
        minValue: 1,
        maxValue: 101,
        step: 2,
        valueFrom: 0,
        valueTo: 40,
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false
      };

      const mockParent = document.createElement('div');
      const view = new class mockView extends View {

        get settings(): IValidSettings {
          //@ts-ignore
          return this.modelSettings;
        }
        constructor(){
          super(mockParent, defaultModelSettings);
        }
      };
      view.updateModelSettings(newSettings);
  
      expect(view.settings).toStrictEqual(newSettings);
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
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false
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

      const valueTo = (mockParent.querySelector('[data-thumb="2"]') as HTMLElement).querySelector(`.${styleClasses.THUMB}`) as HTMLDivElement;
      const valueFrom = (mockParent.querySelector('[data-thumb="1"]') as HTMLElement).querySelector(`.${styleClasses.THUMB}`) as HTMLDivElement;
      expect(valueTo.innerHTML).toBe('5');
      expect(valueFrom.innerHTML).toBe('60');
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
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false
      };

      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);

      expect(mockParent.querySelector(`.${styleClasses.SLIDER}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.BAR}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.RANGE}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.THUMB}`)[1]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.THUMB}`)[2]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelector(`.${styleClasses.STEP}`)).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.TIP}`)[1]).toBeInstanceOf(HTMLElement);
      expect(mockParent.querySelectorAll(`.${styleClasses.TIP}`)[2]).toBeInstanceOf(HTMLElement);
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
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false
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
      expect(THUMBS[0].getAttribute(`data-index`)).toEqual(`0`);
      expect(TIPS[0].classList.contains(`${styleClasses.TIP}`)).toBeTruthy();

      expect(THUMBS[1].classList.contains(`${styleClasses.THUMB}`)).toBeTruthy();
      expect(THUMBS[1].getAttribute(`data-index`)).toEqual(`1`);
      expect(TIPS[1].classList.contains(`${styleClasses.TIP}`)).toBeTruthy();

      expect(STEP.classList.contains(`${styleClasses.STEP}`)).toBeTruthy();
        STEP_ITEM.forEach((item) => {
        expect(item.classList.contains(`${styleClasses.STEP_ITEM}`)).toBeTruthy();
      });
    });
  });

  describe('Draggable:', () => {
    test('Методы уведомляют о взаимодействии со слайдером', () => {

      const newSettings: IValidSettings = {
        minValue: 0,
        maxValue: 100,
        step: 1,
        valueFrom: 0,
        valueTo: 30,
        isRange: false,
        isTip: true,
        isBarRange: true,
        isVertical: false,
        isStep: false
      };

      const mockParent = document.createElement('div');
      const view = new View(mockParent, newSettings);
      const jfn = jest.fn();

      view.events.slide.subscribe(jfn);

      const itemStep = mockParent.querySelector(`.${styleClasses.STEP_ITEM}`) as HTMLElement;
      const bar = mockParent.querySelector(`.${styleClasses.BAR}`) as HTMLElement;

      $(itemStep).trigger("click");
      $(bar).trigger("click");

      expect(jfn).toBeCalledTimes(2);
    });
  });
});