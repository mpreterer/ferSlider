import { bind } from 'decko';

import IValidSettings from '../../slider/interfaces/IValidSettings';
import { TDOMParents, UpdateValues } from '../../slider/interfaces/types';
import FerSlider from '../../slider/View/FerSlider';
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
      valueFrom: panel.querySelector(".js-panel__from-input")!,
      valueTo: panel.querySelector(".js-panel__to-input")!,
      step: panel.querySelector(".js-panel__step-input")!,
      horizontal: panel.querySelector(".js-panel__horizontal-input")!,
      vertical: panel.querySelector(".js-panel__vertical-input")!,
      isRange: panel.querySelector(".js-panel__isRange-input")!,
      isTip: panel.querySelector(".js-panel__isTip-input")!,
      isStep: panel.querySelector(".js-panel__isStep-input")!,
      isBarRange: panel.querySelector(".js-panel__isBarRange-input")!,
    };

    this.components.valueTo.disabled;
    this.domParent.appendChild(panel);
    this.changeSettings(this.modelSettings);

    this.slider.subscribe('updateValues', ({ handle, value }:UpdateValues) => {
      if (handle === 'valueFrom') {
        this.components.valueFrom.value = String(value);
      } else {
        this.components.valueTo.value = String(value);
      }
    });
  }

  private handleChangeMinValue (element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        minValue: parseFloat(element.target.value),
      });
    }

    this.components.maxValue.value = String(this.slider.settings.maxValue);
  }

  private handleChangeMaxValue (element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateSettings({
        maxValue: parseFloat(element.target.value),
      });
    }

    this.components.minValue.value = String(this.slider.settings.minValue);
  }

  private handleChangeValueFrom(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateValues({
        handle: "valueFrom",
        value: parseFloat(element.target.value),
      });
    }
  }

  private handleChangeValueTo(element: Event) {
    if (element.target instanceof HTMLInputElement) {
      this.slider.updateValues({
        handle: "valueTo",
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

      components.valueTo.disabled = !Boolean(element.target.checked);
      components.valueTo.value = "";
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

    components.valueFrom.addEventListener(
      "change",
      this.handleChangeValueFrom.bind(this),
    );

    components.valueTo.addEventListener(
      "change",
      this.handleChangeValueTo.bind(this),
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
      components.valueFrom.value = `${this.modelSettings.valueFrom}`;
      components.valueTo.value = `${this.modelSettings.valueTo}`;
    } else {
      components.valueFrom.value = `${this.modelSettings.valueFrom}`;
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

    components.valueTo.disabled = !isRange;
    this.changeCurrentValue();

    components.step.value = `${step}`;

    components.isBarRange.checked = isBarRange;
    components.isRange.checked = isRange;
    components.isTip.checked = isTip;
    components.isStep.checked = isStep;
  }
}

export default DemoPanel;
