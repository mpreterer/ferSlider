/**
 * @jest-environment jsdom
 */
import defaultSettings from "../../../Model/defaultSettings";
import IValidSettings from "../../../interfaces/IValidSettings";
import styleClasses from "../../styleClasses";
import Thumb from "./Thumb";

describe("Thumb:", () => {
  const thumb = new Thumb(defaultSettings);

  beforeEach(() => {
    thumb.updateState(defaultSettings);
  });

  describe("updateState:", () => {
    test("должен обновить состояние ползунка", () => {
      const newSettings: IValidSettings = {
        ...defaultSettings,
        ...{ isVertical: true },
      };

      thumb.updateState(newSettings);

      expect(
        thumb
          .getDom()
          .classList.contains(`${styleClasses.THUMB_VERTICAL}`),
      ).toBeTruthy();
    });
  });

  describe("getDom:", () => {
    test("должен вернуть DOM ползунка", () => {
      expect(thumb.getDom()).toEqual(expect.any(HTMLDivElement));
    });
  });

  describe("getThumbPosition:", () => {
    test("должен вернуть позицию ползунка относительно заданной величины", () => {
      expect(thumb.getThumbPosition(100)).toEqual(expect.any(Number));
    });
  });

  describe("setValue:", () => {
    test("должен задавать значение ползунка", () => {
      thumb.setValue(10);

      expect(thumb.getDom().style.left).toEqual("1%");
    });
  });

  describe("setActive:", () => {
    test("должен задавать активное состояние ползунка", () => {
      thumb.setActive();

      const isActive = thumb
        .getDom()
        .classList.contains(`${styleClasses.THUMB}_active`);

      expect(isActive).toBeTruthy();
    });
  });

  describe("removeActive:", () => {
    test("должен отключать активное состояние ползунка", () => {
      thumb.removeActive();

      const isActive = thumb
        .getDom()
        .classList.contains(`${styleClasses.THUMB}_active`);

      expect(isActive).toBeFalsy();
    });
  });
});
