// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const hasSlider = components.domParent.contains(components.slider.getDom());
    const hasBar = components.slider.getDom().contains(components.bar.getDom());
    const hasFromThumb = components.bar.getDom().contains(components.valueFrom.thumb.getDom());
    const hasToThumb = components.bar.getDom().contains(components.valueTo.thumb.getDom());
    const hasTip = components.valueFrom.thumb.getDom().contains(components.valueFrom.tip.getDom())
      && components.valueTo.thumb.getDom().contains(components.valueTo.tip.getDom());
    const hasRange = components.bar.getDom().contains(components.range.getDom());
    const hasStep = components.slider.getDom().contains(components.steps.getDom());

    const isRenderStep = isStep && !hasStep;
    const isRenderFromThumb = isRange && !hasFromThumb;
    const isRenderToThumb = isRange && !hasToThumb;
    const isRenderRange = isBarRange && !hasRange;
    const isRenderTips = isTip && !hasTip;

    const isRemoveStep = !isStep && hasStep;
    const isRemoveToThumb = !isRange && hasToThumb;
    const isRemoveRange = !isBarRange && hasRange;
    const isRemoveTips = !isTip && hasTip;

    if (!hasBar) {
      components.slider.getDom().appendChild(components.bar.getDom());
    }

    if (isRenderStep) {
      components.slider.getDom().appendChild(components.steps.getDom());
      components.steps.renderSteps();
    }

    if (isRemoveStep) {
      components.slider.getDom().removeChild(components.steps.getDom());
    }

    if (isRenderFromThumb) {
      components.bar.getDom().appendChild(components.valueFrom.thumb.getDom());
    }

    if (isRenderToThumb) {
      components.bar.getDom().appendChild(components.valueTo.thumb.getDom());
    } else {
      components.bar.getDom().appendChild(components.valueFrom.thumb.getDom());
    }

    if (isRemoveToThumb) {
      components.bar.getDom().removeChild(components.valueTo.thumb.getDom());
    }

    if (isRenderRange) {
      components.bar.getDom().appendChild(components.range.getDom());
    }

    if (isRemoveRange) {
      components.bar.getDom().removeChild(components.range.getDom());
    }

    if (isRenderTips) {
      components.valueFrom.thumb.getDom().appendChild(components.valueFrom.tip.getDom());
      components.valueTo.thumb.getDom().appendChild(components.valueTo.tip.getDom());
    }

    if (isRemoveTips) {
      components.valueFrom.thumb.getDom().removeChild(components.valueFrom.tip.getDom());
      components.valueTo.thumb.getDom().removeChild(components.valueTo.tip.getDom());
    }

    this.renderSubComponentsStyles();
    this.setCurrentValue();

    if (!hasSlider) {
      components.domParent.appendChild(components.slider.getDom());
    }
  }

  private modelSettings: IValidSettings;

  private components: IUnitComponents;

  private dragThumb: THandles | null;

  private initSubViewComponents (htmlParent: TDOMParents) {
    const { modelSettings } = this;

    this.components = {
      domParent: htmlParent,
      slider: new Slider(modelSettings),
      bar: new Bar(modelSettings),
      range: new Range(modelSettings),
      valueFrom: {
        thumb: new Thumb(modelSettings),
        tip: new Tip(modelSettings),
      },
      valueTo: {
        thumb: new Thumb(modelSettings),
        tip: new Tip(modelSettings),
      },
      steps: new Step(modelSettings),
      tip: new Tip(modelSettings),
    };

    this.render();
    this.initThumbsListeners();
  }

  private renderSubComponentsStyles () {
    const { components } = this;
    const { modelSettings } = this;

    components.slider.updateState(modelSettings);
    components.valueFrom.thumb.getDom().setAttribute("data-thumb", "1");
    components.valueTo.thumb.getDom().setAttribute("data-thumb", "2");

    components.bar.updateState(modelSettings);
    components.range.updateState(modelSettings);
    components.valueFrom.thumb.updateState(modelSettings);
    components.valueTo.thumb.updateState(modelSettings);
    components.valueFrom.tip.updateState(modelSettings);
    components.valueTo.tip.updateState(modelSettings);
    components.steps.updateState(modelSettings);
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
    const isFromThumb = thumb === 'valueFrom';
    const beforeState: THandles = isFromThumb ? 'valueTo' : 'valueFrom';

    this.components[beforeState].thumb.removeActive();
    this.components[thumb].thumb.setActive();
  }

  private convertCoordsToValue (coords: number): number {
    const { maxValue, minValue } = this.modelSettings;
    const barLength = this.components.bar.getLength();

    const value = Number(
      ((coords * (maxValue - minValue)) / barLength + minValue).toFixed(10),
    );

    return value;
  }

  private changePositionThumb (event: PointerEvent): THandles {
    const { isRange } = this.modelSettings;
    const { components } = this;
    const length = components.bar.getLength();
    const valueFromValue = components.valueFrom.thumb.getThumbPosition(length);
    const mouseCoords = components.bar.getValidatedCoords(event);

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
      components.range.getDom().style[startPosition] = `${VerticalFromPercent}%`;
      components.range.getDom().style[endPosition] = `${VerticalToPercent}%`;
    } else if (horizontalRange) {
      components.range.getDom().style[startPosition] = `${fromPercent}%`;
      components.range.getDom().style[endPosition] = `${toPercent}%`;
    } else if (isVertical) {
      components.range.getDom().style[startPosition] = "0";
      components.range.getDom().style.top = `${fromPercent}%`;
    } else {
      components.range.getDom().style[startPosition] = "0";
      components.range.getDom().style[endPosition] = `${100 - fromPercent}%`;
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
      const coords = this.components.bar.getValidatedCoords(event);
      const value = this.convertCoordsToValue(coords);

      this.notify('slide', { handle: this.dragThumb, value });
    }
  }

  @bind
  private handlePointerUpWindow () {
    if (this.dragThumb) {
      window.removeEventListener("pointermove", this.handlePointerMoveWindow);
      window.removeEventListener("pointerup", this.handlePointerUpWindow);
      console.log(this)
      this.dragThumb = null;
    }
  }

  @bind
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

        this.notify('slide', { handle: thumb, value });
      }
    });
  }
}

export default View;
