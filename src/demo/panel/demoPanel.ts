import FerSlider from '../../range/View/FerSlider';
import { TDOMParents } from '../../range/interfaces/types';
import { bind } from "decko";
import { IModelSettings } from '../../range/interfaces/IModelSettings';
import { TUpdateThumb, TValueFrom } from '../../range/interfaces/types';
import IComponents from './utils/interfaces/IComponents';
import tplPanel from './utils/tplPanel';
import IValidSettings from '../../range/interfaces/IValidSettings';

class demoPanel {

  private domParent: TDOMParents;
  private slider: FerSlider;
  private components: IComponents;
  private modelSettings: IValidSettings;

  constructor (domParent: TDOMParents, slider: FerSlider) {
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
      vertical: panel.querySelector('.js-panel__vertical-input')!,
      isRange: panel.querySelector('.js-panel__isRange-input')!,
      isTip: panel.querySelector('.js-panel__isTip-input')!,
      isStep: panel.querySelector('.js-panel__isStep-input')!,
      isBarRange: panel.querySelector('.js-panel__isBarRange-input')!
    };

    this.components.thumbRight.disabled;
    this.domParent.appendChild(panel);
    this.changeSettings(this.modelSettings);
  }

  private subscribeToEvents(): void {
    this.slider.events.modelChangedSettings!.subscribe(this.changeSettings);
    this.slider.events.currentValueChanged!.subscribe(this.onSlideUpdate);
  }

  private initListenersFromPanel(): void {
    const components = this.components;
    
    components.minValue.addEventListener('change', (element)  => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          minValue: parseInt((element.target).value)
        })
      }
    })

    components.maxValue.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          maxValue: parseInt((element.target).value)
        })
      }
    })

    components.thumbLeft.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateCurrentValue({
          handle: 'thumbLeft',
          value: parseInt((element.target).value)
        })
      }
    })

    components.thumbRight.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateCurrentValue({
          handle: 'thumbRight',
          value: parseInt((element.target).value)
        })
      }
    })

    components.step.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          step: parseInt((element.target).value)
        })
      }
    })

    components.horizontal.addEventListener('change', () => {
      this.slider.updateSettings({
        isVertical: false
      })
    })

    components.vertical.addEventListener('change', () => {
      this.slider.updateSettings({
        isVertical: true
      })
    })
    
    components.isRange.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          isRange: Boolean((element.target).checked)
        })
     }
    })

    components.isBarRange.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          isBarRange: Boolean((element.target).checked)
        })
      }
    })

    components.isTip.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          isTip: Boolean((element.target).checked)
        })
      }
    })

    components.isStep.addEventListener('change', (element) => {
      if (element.target instanceof HTMLInputElement) {
        this.slider.updateSettings({
          isStep: Boolean((element.target).checked)
        })
      }
    })
   }

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