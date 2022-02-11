import ferSlider from '../../range/View/ferSlider';
import { TDOMParents } from '../../range/interfaces/types';
import { bind } from "decko";
import { IModelSettings } from '../../range/interfaces/IModelSettings';
import { TUpdateThumb, TValueFrom } from '../../range/interfaces/types';
import IComponents from '../../range/interfaces/IComponents';
import tplPanel from './utils/tplPanel';
import timeout from './utils/timeout';
import IValidSettings from '../../range/interfaces/IValidSettings';

class demoPanel {

  private domParent: TDOMParents;
  private slider: ferSlider;
  private components: IComponents;
  private modelSettings: IValidSettings;

  constructor (domParent: TDOMParents, slider: ferSlider) {
    this.domParent = domParent;
    this.slider = slider;
    this.modelSettings = this.slider.settings
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
      isRange: panel.querySelector('.js-panel__withRange-input')!,
      isTip: panel.querySelector('.js-panel__withTip-input')!,
      isStep: panel.querySelector('.js-panel__withStep-input')!,
      isBar: panel.querySelector('.js-panel__withBar-input')!
    };

    this.domParent.appendChild(panel);
    this.changeSettings(this.modelSettings);
  }

  private subscribeToEvents(): void {
    this.slider.events.modelChangedSettings!.subscribe(this.changeSettings);//////////
    this.slider.events.currentValueChanged!.subscribe(this.onSlideUpdate);//////
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

    components.isBar.addEventListener('change', (element) => {
      this.slider.updateSettings({
        isBar: Boolean((element.target as HTMLInputElement).checked)
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
        newSettings.isRange = components.isRange.checked;
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
    const components = this.components;
    components[thumb.handle].value = `${thumb.value}`;
  }

  private changeCurrentValue (currentValue: TValueFrom): void {
    const components = this.components;

    if(typeof currentValue === 'object') {
      components.thumbLeft.value = `${currentValue.minValue}`;
      components.thumbRight.value = `${currentValue.maxValue}`;
    }

    if(typeof currentValue === 'number') {
      components.thumbLeft.value = `${currentValue}`;
    }
  }

  @bind
  private changeSettings (settings: IValidSettings): void {
    const { minValue, maxValue, valueFrom, step, isBar, isRange, isTip, isStep } = settings;
    const components = this.components;

    components.minValue.value = `${minValue}`;
    components.maxValue.value = `${maxValue}`;

    this.changeCurrentValue(valueFrom);

    components.step.value = `${step}`;
    
    components.isBar.checked = isBar;
    components.isRange.checked = isRange;
    components.isTip.checked = isTip;
    components.isStep.checked = isStep;
  }
}

export default demoPanel;