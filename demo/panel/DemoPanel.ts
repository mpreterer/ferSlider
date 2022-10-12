import { bind } from 'decko';

import IValidSettings from '../../src/interfaces/IValidSettings';
import { TDOMParents } from '../../src/interfaces/types';
import FerSlider from '../../src/View/FerSlider';
import IComponents from './utils/interfaces/IComponents';
import tplPanel from './utils/tplPanel';
class DemoPanel {
  constructor(domParent: TDOMParents, slider: FerSlider) {
    this.domParent = domParent;
    this.slider = slider;
    this.modelSettings = this.slider.settings;
    this.render();
    this.initListenersFromPanel();
  }

  private domParent: TDOMParents;
  private slider: FerSlider;
  private components: IComponents;
  private modelSettings: IValidSettings;

  private render(): void {
    const panel = document.createElement("div");
    panel.classList.add("options");
    panel.innerHTML = tplPanel;

    this.components = {
      minValue: panel.querySelector(".js-panel__min-input")!,
      maxValue: panel.querySelector(".js-panel__max-input")!,
      thumbLeft: panel.querySelector(".js-panel__from-input")!,
      thumbRight: panel.querySelector(".js-panel__to-input")!,
      step: panel.querySelector(".js-panel__step-input")!,
      horizontal: panel.querySelector(".js-panel__horizontal-input")!,
      vertical: panel.querySelector(".js-panel__vertical-input")!,
      isRange: panel.querySelector(".js-panel__isRange-input")!,
      isTip: panel.querySelector(".js-panel__isTip-input")!,
      isStep: panel.querySelector(".js-panel__isStep-input")!,
      isBarRange: panel.querySelector(".js-panel__isBarRange-input")!,
    };

    this.components.thumbRight.disabled;
    this.domParent.appendChild(panel);
    this.changeSettings(this.modelSettings);
  }

  private handleChangeMinValue (element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        minValue: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeMaxValue (element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        maxValue: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeThumbLeft(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateCurrentValue({
        handle: "thumbLeft",
        value: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeThumbRight(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateCurrentValue({
        handle: "thumbRight",
        value: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeHorizontal() {
    this.slider.updateSettings({
      isVertical: false,
    });
  }

  private handleChangeVertical() {
    this.slider.updateSettings({
      isVertical: true,
    });
  }

  private handleChangeStep(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        step: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeIsRange(element: Event) {
    const components = this.components;

    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        isRange: Boolean(element.target.checked),
      });

      components.thumbRight.disabled = !Boolean(element.target.checked);
      components.thumbRight.value = "";
    }
  }

  private handleChangeIsBarRange(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        isBarRange: Boolean(element.target.checked),
      });
    }
  }

  private handleChangeIsStep(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        isStep: Boolean(element.target.checked),
      });
    }
  }

  private handleChangeIsTip(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        isTip: Boolean(element.target.checked),
      });
    }
  }

  private initListenersFromPanel(): void {
    const components = this.components;

    components.minValue.addEventListener(
      "change",
      this.handleChangeMinValue.bind(this),
    );

    components.maxValue.addEventListener(
      "change",
      this.handleChangeMaxValue.bind(this),
    );

    components.thumbLeft.addEventListener(
      "change",
      this.handleChangeThumbLeft.bind(this),
    );

    components.thumbRight.addEventListener(
      "change",
      this.handleChangeThumbRight.bind(this),
    );

    components.step.addEventListener(
      "change",
      this.handleChangeStep.bind(this),
    );

    components.horizontal.addEventListener(
      "change",
      this.handleChangeHorizontal.bind(this),
    );

    components.vertical.addEventListener(
      "change",
      this.handleChangeVertical.bind(this),
    );

    components.isRange.addEventListener(
      "change",
      this.handleChangeIsRange.bind(this),
    );

    components.isBarRange.addEventListener(
      "change",
      this.handleChangeIsBarRange.bind(this),
    );

    components.isTip.addEventListener(
      "change",
      this.handleChangeIsTip.bind(this),
    );

    components.isStep.addEventListener(
      "change",
      this.handleChangeIsStep.bind(this),
    );
  }

  private changeCurrentValue() {
    const components = this.components;
    
    if (this.slider.settings.isRange) {
      components.thumbLeft.value = `${this.modelSettings.valueFrom}`;
      components.thumbRight.value = `${this.modelSettings.valueTo}`;
    } else {
      components.thumbLeft.value = `${this.modelSettings.valueFrom}`;
    }
  }

  @bind
  private changeSettings(settings: IValidSettings): void {
    const {
      minValue,
      maxValue,
      step,
      isBarRange,
      isRange,
      isTip,
      isStep,
    } = settings;
    const components = this.components;
    components.minValue.value = `${minValue}`;
    components.maxValue.value = `${maxValue}`;

    components.thumbRight.disabled = !isRange;
    this.changeCurrentValue();

    components.step.value = `${step}`;

    components.isBarRange.checked = isBarRange;
    components.isRange.checked = isRange;
    components.isTip.checked = isTip;
    components.isStep.checked = isStep;
  }
}

export default DemoPanel;
