/**
 * @jest-environment jsdom
 */
import IValidSettings from '../../../interfaces/IValidSettings';
import defaultSettings from '../../../Model/defaultSettings';
import styleClasses from '../../styleClasses';
import Bar from './Bar';

// фикс для распознования PointerEvent
class MockPointerEvent {}

describe("Bar:", () => {
  const bar = new Bar(defaultSettings);

  /* Фикс получения размера DOM элемента */
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get () { return parseFloat(window.getComputedStyle(this).width) || 0; },
    },
  });

  beforeEach(() => {
    bar.updateState(defaultSettings);
    global.window.PointerEvent = MockPointerEvent as any;
  });

  describe("updateState:", () => {
    test("должен обновлять состояние бара", () => {
      const newOptions: IValidSettings = {
        ...defaultSettings,
        ...{ isVertical: true },
      };

      bar.updateState(newOptions);

      expect(
        bar.getDom().classList.contains(`${styleClasses.BAR_VERTICAL}`),
      ).toBeTruthy();
    });
  });

  describe("getDom:", () => {
    test("должен вернуть DOM бара", () => {
      expect(bar.getDom()).toEqual(expect.any(HTMLDivElement));
    });
  });

  describe("getLength:", () => {
    test("должен вернуть длину бара", () => {
      bar.getDom().style.width = '375px';

      expect(bar.getLength()).toEqual(375);
    });
  });

  describe("getOffset:", () => {
    test("должен вернуть отступ бара", () => {
      expect(bar.getOffset()).toEqual(expect.any(Number));
    });
  });

  describe("getValidatedCoords:", () => {
    test("должен вернуть координаты относительно положения слайдера", () => {
      const mockEvent = new PointerEvent('pointerdown')

      expect(bar.getValidatedCoords(mockEvent)).toEqual(expect.any(Number));
    });
  });
});
