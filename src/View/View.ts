import { bind } from 'decko';

import IUnitComponents from '../interfaces/IUnitComponents';
import IValidSettings from '../interfaces/IValidSettings';
import { TDOMParents, THandles, TUpdateThumb } from '../interfaces/types';
import Observer from '../Observer/Observer';
import Bar from './components/bar/Bar';
import Range from './components/range/Range';
import Slider from './components/slider/Slider';
import Step from './components/step/Step';
import Thumb from './components/thumb/Thumb';
import Tip from './components/tip/Tip';
import styleClasses from './styleClasses';

class View extends Observer {
  constructor (domParent: TDOMParents, modelSettings: IValidSettings) {
    super();

    this.modelSettings = modelSettings;
    this.initSubViewComponents(domParent);
  }

  public updateSettings (newModelOptions: IValidSettings) {
    this.modelSettings = newModelOptions;
    this.render();
  }

  public updateValues (thumb: TUpdateThumb) {
    if (!Number.isNaN(thumb.value)) {
      this.modelSettings = {
        ...this.modelSettings,
        ...{ [thumb.handle]: thumb.value },
      }
      this.setPositionComponents(thumb.handle, thumb.value);
    }
  }

  private render () {
    const {
      isTip,
      isStep,
      isRange,
      isBarRange,
    } = this.modelSettings;
    const { components } = this;

    const hasSlider = components.domParent.contains(components.slider);
    const hasBar = components.slider.contains(components.bar.getDom());
    const hasFromThumb = components.bar.getDom().contains(components.valueFrom.thumb.getDom());
    const hasToThumb = components.bar.getDom().contains(components.valueTo.thumb.getDom());
    const hasTip = components.valueFrom.thumb.getDom().contains(components.valueFrom.tip.getDom())
      && components.valueTo.thumb.getDom().contains(components.valueTo.tip.getDom());
    const hasRange = components.bar.getDom().contains(components.range);
    const hasStep = components.slider.contains(components.steps.getDom());

    const isRenderStep = isStep && !hasStep;
    const isRenderFromThumb = isRange && !hasFromThumb;
    const isRenderToThumb = isRange && !hasToThumb;
    const isRenderRange = isBarRange && !hasRange;
    const isRenderTips = isTip && !hasTip;

    const removeStep = !isStep && hasStep;
    const removeToThumb = !isRange && hasToThumb;
    const removeRange = !isBarRange && hasRange;
    const removeTips = !isTip && hasTip;

    if (!hasBar) {
      components.slider.appendChild(components.bar.getDom());
    }

    if (isStep) {
      this.renderSteps();
    }

    if (isRenderStep) {
      components.slider.appendChild(components.steps.getDom());
    }

    if (removeStep) {
      components.slider.removeChild(components.steps.getDom());
    }

    if (isRenderFromThumb) {
      components.bar.getDom().appendChild(components.valueFrom.thumb.getDom());
    }

    if (isRenderToThumb) {
      components.bar.getDom().appendChild(components.valueTo.thumb.getDom());
    } else {
      components.bar.getDom().appendChild(components.valueFrom.thumb.getDom());
    }

    if (removeToThumb) {
      components.bar.getDom().removeChild(components.valueTo.thumb.getDom());
    }

    if (isRenderRange) {
      components.bar.getDom().appendChild(components.range);
    }

    if (removeRange) {
      components.bar.getDom().removeChild(components.range);
    }

    if (isRenderTips) {
      components.valueFrom.thumb.getDom().appendChild(components.valueFrom.tip.getDom());
      components.valueTo.thumb.getDom().appendChild(components.valueTo.tip.getDom());
    }

    if (removeTips) {
      components.valueFrom.thumb.getDom().removeChild(components.valueFrom.tip.getDom());
      components.valueTo.thumb.getDom().removeChild(components.valueTo.tip.getDom());
    }

    this.renderSubComponentsStyles();
    this.setCurrentValue();

    if (!hasSlider) {
      components.domParent.appendChild(components.slider);
    }
  }

  private modelSettings: IValidSettings;

  private components: IUnitComponents;

  private dragThumb: THandles | null;

  private initSubViewComponents (htmlParent: TDOMParents) {
    const { modelSettings } = this;

    this.components = {
      domParent: htmlParent,
      slider: new Slider().getDom(),
      bar: new Bar(modelSettings),
      range: new Range().getDom(),
      valueFrom: {
        thumb: new Thumb(modelSettings),
        tip: new Tip(modelSettings),
      },
      valueTo: {
        thumb: new Thumb(modelSettings),
        tip: new Tip(modelSettings),
      },
      steps: new Step(),
      tip: new Tip(modelSettings),
    };

    this.render();
    this.initThumbsListeners();
  }

  private renderSubComponentsStyles () {
    const { isVertical } = this.modelSettings;
    const { components } = this;
    const { modelSettings } = this;
    const sideStart = isVertical ? "left" : "bottom";
    const sideFinish = isVertical ? "right" : "top";
    const beforeOrient = !!isVertical;

    components.slider.setAttribute("class", `${styleClasses.SLIDER}`);
    components.valueFrom.thumb.getDom().setAttribute("data-thumb", "1");
    components.valueTo.thumb.getDom().setAttribute("data-thumb", "2");

    components.valueFrom.thumb.updateState(modelSettings);
    components.valueTo.thumb.updateState(modelSettings);
    components.valueFrom.tip.updateState(modelSettings);
    components.valueTo.tip.updateState(modelSettings);
    components.bar.updateState(modelSettings);

    if (beforeOrient) {
      components.range.classList.remove(`${styleClasses.RANGE_HORIZONTAL}`);
      components.steps
        .getDom()
        .classList.remove(`${styleClasses.STEP_HORIZONTAL}`);

      components.steps.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });
    } else {
      components.range.classList.remove(`${styleClasses.RANGE_VERTICAL}`);
      components.steps
        .getDom()
        .classList.remove(`${styleClasses.STEP_VERTICAL}`);

      components.steps.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });
    }

    components.range.style[sideStart] = "0";
    components.range.style[sideFinish] = "0";

    if (isVertical) {
      components.slider.classList.add(`${styleClasses.SLIDER_VERTICAL}`);
      components.range.classList.add(`${styleClasses.RANGE_VERTICAL}`);
      components.steps.getDom().classList.add(`${styleClasses.STEP_VERTICAL}`);
      components.steps.getItems().forEach((item) => {
        item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    } else {
      components.slider.classList.add(`${styleClasses.SLIDER_HORIZONTAL}`);
      components.range.classList.add(`${styleClasses.RANGE_HORIZONTAL}`);
      components.steps
        .getDom()
        .classList.add(`${styleClasses.STEP_HORIZONTAL}`);
      components.steps.getItems().forEach((item) => {
        item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    }
  }

  private setCurrentValue () {
    const { valueFrom, valueTo, isRange } = this.modelSettings;

    if (isRange) {
      this.setPositionComponents("valueFrom", valueFrom);
      this.setPositionComponents("valueTo", valueTo);
    } else {
      this.setPositionComponents("valueFrom", valueFrom);
    }
  }

  private setActiveThumb (thumb: THandles) {
    const { components } = this;
    const activeThumb = `${styleClasses.THUMB}_active`;

    if (!components[thumb].thumb.getDom().classList.contains(`${activeThumb}`)) {
      components.valueFrom.thumb.getDom().classList.remove(`${activeThumb}`);
      components.valueTo.thumb.getDom().classList.remove(`${activeThumb}`);
      components[thumb].thumb.getDom().classList.add(`${activeThumb}`);
    }
  }

  private convertCoordsToValue (coords: number): number {
    const { maxValue, minValue } = this.modelSettings;
    const barLength = this.components.bar.getLength();
    const value = Number(
      ((coords * (maxValue - minValue)) / barLength + minValue).toFixed(10),
    );

    return value;
  }

  private getValidatedCoords (event: PointerEvent): number {
    const { isVertical } = this.modelSettings;
    const coords = isVertical ? "clientY" : "clientX";
    const barOffset = this.components.bar.getOffset();
    const result = isVertical
      ? barOffset - event[coords]
      : event[coords] - barOffset;

    return result;
  }

  private changePositionThumb (event: PointerEvent): THandles {
    const { isRange } = this.modelSettings;
    const { components } = this;
    const length = components.bar.getLength();
    const valueFromValue = components.valueFrom.thumb.getThumbPosition(length);
    const mouseCoords = this.getValidatedCoords(event);

    if (!isRange) return "valueFrom";

    const valueToValue = components.valueTo.thumb.getThumbPosition(length);
    const rangeMiddle = (valueToValue - valueFromValue) / 2;
    const valueFromRangeMiddle = mouseCoords - valueFromValue;

    if (mouseCoords <= valueFromValue) return "valueFrom";
    if (mouseCoords >= valueToValue) return "valueTo";
    if (valueFromRangeMiddle <= rangeMiddle) return "valueFrom";
    if (valueFromRangeMiddle > rangeMiddle) return "valueTo";

    return "valueFrom";
  }

  private setTipValue (thumb: THandles, percent: number) {
    const { isTip, step } = this.modelSettings;
    const quantitySymbols = step.toString().match(/\.(\d+)/)?.[1].length;

    if (isTip) {
      this.components[thumb].tip.setTipValue(percent.toFixed(quantitySymbols));
    }
  }

  private setPositionComponents (toggle: THandles, val: number) {
    const { isBarRange, isTip } = this.modelSettings;
    this.components[toggle].thumb.setValue(val);

    if (isTip) this.setTipValue(toggle, val);
    if (isBarRange) this.setClickRangePosition();
  }

  private convertPercentValueTo (val: number) {
    const { isVertical, minValue, maxValue } = this.modelSettings;
    const percent = Number(
      (((val - minValue) * 100) / (maxValue - minValue)).toFixed(10),
    );
    const okPercent = isVertical ? 100 - percent : percent;

    return okPercent;
  }

  private setClickRangePosition () {
    const { isVertical, isBarRange, isRange } = this.modelSettings;
    const { components } = this;
    const startPosition = isVertical ? "top" : "left";
    const endPosition = isVertical ? "bottom" : "right";
    const verticalRange = isRange && isVertical;
    const horizontalRange = isRange && !isVertical;

    if (!isBarRange) return;

    const fromPercent = parseFloat(
      components.valueFrom.thumb.getDom().style[startPosition].replace(
        /[^0-9,.]/g,
        " ",
      ),
    );
    const toPercent = 100
      - parseFloat(
        components.valueTo.thumb.getDom().style[startPosition].replace(
          /[^0-9,.]/g,
          " ",
        ),
      );

    if (verticalRange) {
      const VerticalFromPercent = parseFloat(
        components.valueTo.thumb.getDom().style[startPosition].replace(
          /[^0-9,.]/g,
          " ",
        ),
      );
      const VerticalToPercent = 100
        - parseFloat(
          components.valueFrom.thumb.getDom().style[startPosition].replace(
            /[^0-9,.]/g,
            " ",
          ),
        );
      components.range.style[startPosition] = `${VerticalFromPercent}%`;
      components.range.style[endPosition] = `${VerticalToPercent}%`;
    } else if (horizontalRange) {
      components.range.style[startPosition] = `${fromPercent}%`;
      components.range.style[endPosition] = `${toPercent}%`;
    } else if (isVertical) {
      components.range.style[startPosition] = "0";
      components.range.style.top = `${fromPercent}%`;
    } else {
      components.range.style[startPosition] = "0";
      components.range.style[endPosition] = `${100 - fromPercent}%`;
    }
  }

  @bind
  private handlePointerDownBar (event: PointerEvent) {
    this.dragThumb = this.changePositionThumb(event);

    if (this.dragThumb) {
      this.setActiveThumb(this.dragThumb);
      this.handlePointerMoveWindow(event);
      window.addEventListener("pointermove", this.handlePointerMoveWindow);
      window.addEventListener("pointerup", this.handlePointerUpWindow);
    }
  }

  @bind
  private handlePointerMoveWindow (event: PointerEvent) {
    if (this.dragThumb) {
      const coords = this.getValidatedCoords(event);
      const value = this.convertCoordsToValue(coords);

      this.notify('onSlide', { handle: this.dragThumb, value });
    }
  }

  @bind
  private handlePointerUpWindow () {
    if (this.dragThumb) {
      window.removeEventListener("pointermove", this.handlePointerMoveWindow);
      window.removeEventListener("pointerup", this.handlePointerUpWindow);

      this.dragThumb = null;
    }
  }

  private initThumbsListeners () {
    window.removeEventListener("pointermove", this.handlePointerMoveWindow);
    window.removeEventListener("pointerup", this.handlePointerUpWindow);
    this.components.bar.getDom().addEventListener("pointerdown", this.handlePointerDownBar);
    this.components.steps
      .getDom()
      .addEventListener("pointerdown", this.handlePointerDownSteps);
  }

  @bind
  private handlePointerDownSteps (event: PointerEvent) {
    this.components.steps.getItems().forEach((item) => {
      if (event.target === item) {
        const value = Number(item.getAttribute("data-val"));
        const thumb = this.changePositionThumb(event);

        this.notify('onSlide', { handle: thumb, value });
      }
    });
  }

  private getStepsValue (): number[] {
    const { maxValue, minValue, step } = this.modelSettings;
    const middleValue = Math.ceil((maxValue - minValue) / step);
    let quantitySteps = 6;
    const limitationSteps = maxValue > 1e7 && maxValue <= 1e9;
    const limitationStepsMin = minValue < -1e7 && minValue >= -1e9;

    if (limitationSteps) quantitySteps = 4;
    if (limitationStepsMin) quantitySteps = 4;

    if (maxValue > 1e9) quantitySteps = 2;
    if (minValue < -1e9) quantitySteps = 2;

    const viewStep = Math.ceil(middleValue / quantitySteps) * step;
    const middleArr = [];
    let value = minValue;

    for (let i = 0; value < maxValue; i += 1) {
      value += viewStep;

      if (value < maxValue) {
        middleArr.push(value);
      }
    }

    return [minValue, ...middleArr, maxValue];
  }

  private renderSteps () {
    const { isVertical } = this.modelSettings;
    const values = this.getStepsValue();
    const side = isVertical ? "top" : "left";
    this.components.steps.getDom().innerHTML = "";

    values.map((item) => {
      const domItem = this.components.steps.addItem(Number(item.toFixed(2)));
      const percent = this.convertPercentValueTo(item);
      domItem.style[side] = `${percent}%`;

      return 0;
    });
  }
}

export default View;
