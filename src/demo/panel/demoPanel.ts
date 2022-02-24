import ferSlider from '../../range/View/ferSlider';
import { TDOMParents } from '../../range/interfaces/types';
import { bind } from "decko";
import { IModelSettings } from '../../range/interfaces/IModelSettings';
import { TUpdateThumb, TValueFrom } from '../../range/interfaces/types';
import IComponents from '../../range/interfaces/IComponents';
import tplPanel from './utils/tplPanel';
// import timeout from './utils/timeout';
import IValidSettings from '../../range/interfaces/IValidSettings';

class demoPanel {

  private domParent: TDOMParents;
  private slider: ferSlider;
  private components: IComponents;
  private modelSettings: IValidSettings;

  constructor (domParent: TDOMParents, slider: ferSlider) {
    this.domParent = domParent;
    this.slider = slider;
    this.modelSettings = this.slider.settings;
    this.render();
    this.subscribeToEvents();
    this.initListenersFromPanel();
  }

  private render (): void {
    const panel = document.createElement('div');
    panel.classList.add('options');
    panel.innerHTML = tplPanel;

    this.components = {
      minValue: panel.querySelector('.js-panel__min-input')!,
      maxValue: panel.querySelector('.js-panel__max-input')!,
      thumbLeft: panel.querySelector('.js-panel__from-input')!,
      thumbRight: panel.querySelector('.js-panel__to-input')!,
      step: panel.querySelector('.js-panel__step-input')!,
      horizontal: panel.querySelector('.js-panel__horizontal-input')!,
      isVertical: panel.querySelector('.js-panel__vertical-input')!,
      isRange: panel.querySelector('.js-panel__isRange-input')!,
      isTip: panel.querySelector('.js-panel__isTip-input')!,
      isStep: panel.querySelector('.js-panel__isStep-input')!,
      isBarRange: panel.querySelector('.js-panel__isBarRange-input')!
    };

    // this.components.thumbRight.disabled = true;
    this.domParent.appendChild(panel);
    this.changeSettings(this.modelSettings);
  }

  private subscribeToEvents(): void {
    this.slider.events.modelChangedSettings!.subscribe(this.changeSettings);
    this.slider.events.currentValueChanged!.subscribe(this.onSlideUpdate);
  }

  private initListenersFromPanel(): void {
    const components = this.components;

    components.minValue.addEventListener('input', (element) => {
      this.slider.updateSettings({
        minValue: parseInt((element.target as HTMLInputElement).value)
      })
    })

    components.maxValue.addEventListener('input', (element) => {
      this.slider.updateSettings({
        maxValue: parseInt((element.target as HTMLInputElement).value)
      })
    })

    components.thumbLeft.addEventListener('input', (element) => {
      this.slider.updateCurrentValue({
        handle: 'thumbLeft',
        value: parseInt((element.target as HTMLInputElement).value)
      })
    })

    components.thumbRight.addEventListener('input', (element) => {
      this.slider.updateCurrentValue({
        handle: 'thumbRight',
        value: parseInt((element.target as HTMLInputElement).value)
      })
    })

    components.step.addEventListener('input', (element) => {
      this.slider.updateSettings({
        step: parseInt((element.target as HTMLInputElement).value)
      })
    })

    components.isVertical.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isVertical: false
      })
    })

    components.isVertical.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isVertical: true
      })
    })

    components.isRange.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isRange: false
      })
    })

    components.isRange.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isRange: true
      })
    })

    components.isBarRange.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isBarRange: Boolean((element.target as HTMLInputElement).checked)
      })
    })

    components.isTip.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isTip: Boolean((element.target as HTMLInputElement).checked)
      })
    })

    components.isStep.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isStep: Boolean((element.target as HTMLInputElement).checked)
      })
    })
   }
    
  private updateSliderSettings (): void {

    function checkType () {
      const isRange = components.isRange.checked;

      if (isRange) {
        return true;
      }

      return false;
    }

    const newSettings: IModelSettings = {};
    const components = this.components;
    const checkedOrientaton = components.horizontal.checked ? true : false;

    newSettings.minValue = components.minValue.value ? parseFloat(components.minValue.value) : this.modelSettings.minValue;
    newSettings.maxValue = components.maxValue.value ? parseFloat(components.maxValue.value) : this.modelSettings.maxValue;
    newSettings.step = components.step.value ? parseFloat(components.step.value) : this.modelSettings.step;

    newSettings.valueFrom = {
      minValue: components.thumbLeft.value ? parseFloat(components.thumbLeft.value) : this.modelSettings.minValue!,
      maxValue: components.thumbRight.value ? parseFloat(components.thumbRight.value) : this.modelSettings.minValue!
    };

    newSettings.isVertical = checkedOrientaton;
    newSettings.isRange = checkType();
    newSettings.isBarRange = components.isBarRange.checked;
    newSettings.isTip = components.isTip.checked;
    newSettings.isStep = components.isStep.checked;

    this.slider.updateSettings(newSettings);
  }

// private inputNumber = timeout(() => {
//   this.updateSliderSettings();
// });

// @bind
// private changeInput (): void {
//   this.updateSliderSettings();
// }

  @bind
  private onSlideUpdate (thumb: TUpdateThumb): void {
    this.components[thumb.handle].value = `${thumb.value}`;
  }

  private changeCurrentValue (valueFrom: TValueFrom): void {
    const components = this.components;

    if(typeof valueFrom === 'object') {
      components.thumbLeft.value = `${valueFrom.minValue}`;
      components.thumbRight.value = `${valueFrom.maxValue}`;
    }

    if(typeof valueFrom === 'number') {
      components.thumbLeft.value = `${valueFrom}`;
    }
  }

  @bind
  private changeSettings (settings: IValidSettings): void {
    const { minValue, maxValue, valueFrom, step, isBarRange, isRange, isTip, isStep } = settings;
    const components = this.components;

    components.minValue.value = `${minValue}`;
    components.maxValue.value = `${maxValue}`;

    components.thumbRight.disabled = !isRange;
    this.changeCurrentValue(valueFrom);

    components.step.value = `${step}`;
    
    components.isBarRange.checked = isBarRange;
    components.isRange.checked = isRange;
    components.isTip.checked = isTip;
    components.isStep.checked = isStep;
  }
}

export default demoPanel;