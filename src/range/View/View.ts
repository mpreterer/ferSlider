import Observer from '../Observer/Observer';
import IUnitComponents from '../interfaces/IUnitComponents';
import styleClasses from './styleClasses';
import { bind } from 'decko';
import { IEvents } from '../interfaces/IEvents';
import { TDOMParents, THandles, TUpdateThumb } from '../interfaces/types';
import Range from './components/range/range';
import Thumb from './components/thumb/thumb';
import Bar from './components/bar/bar';
import Step from './components/step/step';
import Tip from './components/tip/tip';
import IValidSettings from '../interfaces/IValidSettings';
import Slider from './components/slider/slider';

class View extends Observer {
  private modelSettings: IValidSettings;
  private components: IUnitComponents;
  private dragThumb: THandles | null;

  constructor (domParent: TDOMParents, modelSettings: IValidSettings) {
    super();

    this.modelSettings = modelSettings;
    this.initSubViewComponents(domParent);
  }
 
  private _events: IEvents = {
    slide: new Observer
  }
  get events(): IEvents {
    return this._events;
  };
  
  private initSubViewComponents(htmlParent: TDOMParents) {
    this.components = {
      domParent: htmlParent,
      slider: new Slider().getDom(),
      bar: new Bar().getDom(),
      range: new Range().getDom(),
      thumbLeft: {
        thumb: new Thumb().getHTML(),
        tip: new Tip().getHTML()
      },
      thumbRight: {
        thumb: new Thumb().getHTML(),
        tip: new Tip().getHTML()
      },
      steps: new Step(),
      tip: new Tip().getHTML()
    }

    this.render();
    this.initThumbsListeners()
  }
  
  public updateModelSettings(newModelOptions: IValidSettings) {
    this.modelSettings = newModelOptions;
    this.render();
  }
  
  private render () {
    const { isTip, isStep, isRange, isBarRange } = this.modelSettings;
    const components = this.components;

    const hasSlider = components.domParent.contains(components.slider);
    const hasBar = components.slider.contains(components.bar);
    const hasFromThumb = components.bar.contains(components.thumbLeft.thumb);
    const hasToThumb = components.bar.contains(components.thumbRight.thumb);
    const hasTip = components.thumbLeft.thumb.contains(components.thumbLeft.tip) && components.thumbRight.thumb.contains(components.thumbRight.tip);
    const hasRange = components.bar.contains(components.range);
    const hasStep = components.slider.contains(components.steps.getDom());

    if(!hasBar) {
      components.slider.appendChild(components.bar);
    }

    if(isStep) {
      this.renderSteps();

      if (!hasStep) {
        components.slider.appendChild(components.steps.getDom());
      }
    }

    if(!isStep && hasStep) {
      components.slider.removeChild(components.steps.getDom())
    }

    if(isRange) {
      if(!hasFromThumb){
        components.bar.appendChild(components.thumbLeft.thumb);
      }
      if(!hasToThumb){
        components.bar.appendChild(components.thumbRight.thumb);
      }
    } else {
      components.bar.appendChild(components.thumbLeft.thumb);
    }

    if (!isRange && hasToThumb) {
      components.bar.removeChild(components.thumbRight.thumb);
    }

    if(isBarRange && !hasRange) {
      components.bar.appendChild(components.range)
    }

    if(!isBarRange && hasRange) {
      components.bar.removeChild(components.range)
    }

    if(isTip && !hasTip) {
      components.thumbLeft.thumb.appendChild(components.thumbLeft.tip);
      components.thumbRight.thumb.appendChild(components.thumbRight.tip);
    }

    if(!isTip && hasTip) {
      components.thumbLeft.thumb.removeChild(components.thumbLeft.tip);
      components.thumbRight.thumb.removeChild(components.thumbRight.tip);
    }

    this.renderSubComponentsStyles();
    this.setCurrentValue();

    if(!hasSlider) {
      components.domParent.appendChild(components.slider);
    }
  }

  private renderSubComponentsStyles() {
    const { isVertical } = this.modelSettings;
    const components = this.components;
    const sideStart = isVertical ? 'left' : 'bottom';
    const sideFinish = isVertical ? 'right' : 'top';
    const beforeOrient = isVertical ? true : false;

    components.slider.setAttribute('class', `${styleClasses.SLIDER}`);
    components.thumbLeft.thumb.setAttribute('data-thumb', '1');
    components.thumbRight.thumb.setAttribute('data-thumb', '2');

    if (beforeOrient) {
      components.bar.classList.remove(`${styleClasses.BAR_HORIZONTAL}`);
      components.range.classList.remove(`${styleClasses.RANGE_HORIZONTAL}`);
      components.thumbLeft.thumb.classList.remove(`${styleClasses.THUMB_HORIZONTAL}`);
      components.thumbLeft.tip.classList.remove(`${styleClasses.TIP_HORIZONTAL}`);
      components.thumbRight.thumb.classList.remove(`${styleClasses.THUMB_HORIZONTAL}`);
      components.thumbRight.tip.classList.remove(`${styleClasses.TIP_HORIZONTAL}`);
      components.steps.getDom().classList.remove(`${styleClasses.STEP_HORIZONTAL}`);

      components.steps.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });

    } else {
      components.bar.classList.remove(`${styleClasses.BAR_VERTICAL}`);
      components.range.classList.remove(`${styleClasses.RANGE_VERTICAL}`);
      components.thumbLeft.thumb.classList.remove(`${styleClasses.THUMB_VERTICAL}`);
      components.thumbLeft.tip.classList.remove(`${styleClasses.TIP_VERTICAL}`);
      components.thumbRight.thumb.classList.remove(`${styleClasses.THUMB_VERTICAL}`);
      components.thumbRight.tip.classList.remove(`${styleClasses.TIP_VERTICAL}`);
      components.steps.getDom().classList.remove(`${styleClasses.STEP_VERTICAL}`);

      components.steps.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });
    }

    components.range.style[sideStart] = '0';
    components.range.style[sideFinish] = '0';
    components.thumbLeft.thumb.style.removeProperty(sideStart);
    components.thumbRight.thumb.style.removeProperty(sideStart);
    
    if(isVertical) {
      components.slider.classList.add(`${styleClasses.SLIDER_VERTICAL}`);
      components.thumbLeft.thumb.classList.add(`${styleClasses.THUMB_VERTICAL}`);
      components.thumbRight.thumb.classList.add(`${styleClasses.THUMB_VERTICAL}`);
      components.thumbLeft.tip.classList.add(`${styleClasses.TIP_VERTICAL}`);
      components.thumbRight.tip.classList.add(`${styleClasses.TIP_VERTICAL}`);
      components.bar.classList.add(`${styleClasses.BAR_VERTICAL}`);
      components.range.classList.add(`${styleClasses.RANGE_VERTICAL}`);
      components.steps.getDom().classList.add(`${styleClasses.STEP_VERTICAL}`);
      components.steps.getItems().forEach((item) => {
        item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    } else {
      components.slider.classList.add(`${styleClasses.SLIDER_HORIZONTAL}`);
      components.thumbLeft.thumb.classList.add(`${styleClasses.THUMB_HORIZONTAL}`);
      components.thumbRight.thumb.classList.add(`${styleClasses.THUMB_HORIZONTAL}`);
      components.thumbLeft.tip.classList.add(`${styleClasses.TIP_HORIZONTAL}`);
      components.thumbRight.tip.classList.add(`${styleClasses.TIP_HORIZONTAL}`);
      components.bar.classList.add(`${styleClasses.BAR_HORIZONTAL}`);
      components.range.classList.add(`${styleClasses.RANGE_HORIZONTAL}`);
      components.steps.getDom().classList.add(`${styleClasses.STEP_HORIZONTAL}`);
      components.steps.getItems().forEach((item) => {
      item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    }
  }

  private setCurrentValue () {
    const { valueFrom, isRange } = this.modelSettings;

    if (typeof valueFrom === 'object') {
      this.setThumbPosition('thumbLeft', valueFrom.minValue);
      if (isRange) {
        this.setThumbPosition('thumbRight', valueFrom.maxValue);
      }
    }
    if (typeof valueFrom === 'number') {
      this.setThumbPosition('thumbLeft', valueFrom);
      if(isRange) {
        this.setThumbPosition('thumbRight', valueFrom);
      }
    }
  }

    private getThumbPosition (thumb: THandles): number {
      const { isVertical } = this.modelSettings;

      const components = this.components;
      const thumbLength = isVertical ? 'offsetHeight' : 'offsetWidth';
      const offsetType = isVertical ? 'offsetTop' : 'offsetLeft';
      const barLength = this.getBarLength();
      const posOfPixel = components[thumb].thumb[offsetType] + (components[thumb].thumb[thumbLength] / 2);
      const res = isVertical ? barLength - posOfPixel : posOfPixel;

      return res;
    }

    private setActiveThumb (thumb: THandles) {
      const components = this.components;
      const activeThumb = `${styleClasses.THUMB}` + '_active';

      if(!components[thumb].thumb.classList.contains(`${activeThumb}`)) {
        components.thumbLeft.thumb.classList.remove(`${activeThumb}`);
        components.thumbRight.thumb.classList.remove(`${activeThumb}`);
        components[thumb].thumb.classList.add(`${activeThumb}`);
      }
    }

    private getBarLength ():number {
      const { isVertical } = this.modelSettings;
      const lengthType = isVertical ? 'offsetHeight' : 'offsetWidth';
      const length = this.components.bar[lengthType];
  
      return length;
    }

    private getBarOffset():number {
      const { isVertical } = this.modelSettings;
      const offsetSide = isVertical ? 'bottom' : 'left';
      const offset = this.components.bar.getBoundingClientRect()[offsetSide];
  
      return offset;
    }

    private convertCoordsToValue (coords: number): number {
      const { maxValue, minValue } = this.modelSettings;
      const barLength = this.getBarLength();
      const value = Number((coords * (maxValue - minValue) / barLength + minValue).toFixed(10));

      return value;
    }

    private getValidatedCoords(event: MouseEvent): number {
      const { isVertical } = this.modelSettings;
      const coords = isVertical ? 'clientY' : 'clientX';
      const barOffset = this.getBarOffset();
      const result = isVertical ? barOffset - event[coords] : event[coords] - barOffset;
      
      return result;
    }
     
    private changePositonThumb(event: MouseEvent): THandles{
      const { isRange } = this.modelSettings;
      const thumbLeftValue = this.getThumbPosition('thumbLeft');
      const mouseCoords = this.getValidatedCoords(event);
      
      if (isRange) {
        const thumbRightValue = this.getThumbPosition('thumbRight');
        const rangeMiddle = (thumbRightValue - thumbLeftValue) / 2;
        const valueFromRangeMiddle = (mouseCoords - thumbLeftValue);

        if (mouseCoords <= thumbLeftValue) return 'thumbLeft';
        if (mouseCoords >= thumbRightValue) return 'thumbRight';
        if (valueFromRangeMiddle <= rangeMiddle) return 'thumbLeft';
        if (valueFromRangeMiddle > rangeMiddle) return 'thumbRight';
      }

      return 'thumbLeft';
    }

    private setTipValue(thumb: THandles, percent: number) {
      const { isTip } = this.modelSettings;

      if(isTip) {
        this.components[thumb].tip.innerHTML = percent.toFixed();
      }
    }
    
    public updateCurrentValue (thumb: TUpdateThumb) {
      this.setThumbPosition(thumb.handle, thumb.value);
    }
    
    private setThumbPosition (toggle: THandles, val: number) {
      const { isVertical, isBarRange, isTip } = this.modelSettings;
      const typeStyleSide = isVertical ? 'top' : 'left';
      const percent = this.convertPercentValueTo(val);

      this.components[toggle].thumb.style[typeStyleSide] = `${percent}%`;
      this.setActiveThumb(toggle);
      if (isTip) this.setTipValue(toggle, val);
      if (isBarRange) this.setClickRangePosition();
    }

    private convertPercentValueTo (val: number): number {
      const { isVertical, minValue, maxValue } = this.modelSettings;
      const percent = Number(((val - minValue) * 100 / (maxValue-minValue)).toFixed(10));
      const okPercent = isVertical ? 100-percent : percent;
      return okPercent;
    }

    private setClickRangePosition () {
      const { isVertical, isBarRange, isRange } = this.modelSettings;
      const components = this.components;
      const startPosition = isVertical ? 'top' : 'left';
      const endPosition = isVertical ? 'bottom' : 'right';

      if (isBarRange) {
        const fromPercent = parseFloat(components.thumbLeft.thumb.style[startPosition].replace(/[^0-9,.]/g, ' '));
        const toPercent = 100 - parseFloat(components.thumbRight.thumb.style[startPosition].replace(/[^0-9,.]/g, ' '));

        if (isRange) {
          if (isVertical) {
            const VerticalFromPercent = parseFloat(components.thumbRight.thumb.style[startPosition].replace(/[^0-9,.]/g, ' '));
            const VerticalToPercent = 100 - parseFloat(components.thumbLeft.thumb.style[startPosition].replace(/[^0-9,.]/g, ' '));
            components.range.style[startPosition] = `${VerticalFromPercent}%`;
            components.range.style[endPosition] = `${VerticalToPercent}%`;
          } else {
            components.range.style[startPosition] = `${fromPercent}%`;
            components.range.style[endPosition] = `${toPercent}%`;
          }
        } else {
          if (isVertical) {
            components.range.style[startPosition] = '0';
            components.range.style['top'] = `${fromPercent}%`;
          } else {
            components.range.style[startPosition] = '0';
            components.range.style[endPosition] = `${100-fromPercent}%`;
          }
        }
      }
    }

    @bind
    private draggableStart(event: MouseEvent) {
      this.dragThumb = this.changePositonThumb(event);
      
      if(this.dragThumb) {
        this.setActiveThumb(this.dragThumb);
        this.draggable(event);
        window.addEventListener('mousemove', this.draggable);
        window.addEventListener('mouseup', this.draggableEnd);
      }
    }

    @bind
    private draggable(event: MouseEvent) {
      if (this.dragThumb) {
        const coords = this.getValidatedCoords(event);
        const value = this.convertCoordsToValue(coords);
        this._events.slide.notify({handle: this.dragThumb, value, valueFromStep: true} as TUpdateThumb);
      }
    }
    
    @bind
    private draggableEnd() {
      if (this.dragThumb) {
        window.removeEventListener('mousemove', this.draggable);
        window.removeEventListener('mouseup', this.draggableEnd);
        this.dragThumb = null;
      }
    }

    private initThumbsListeners() {
      
      window.removeEventListener('mousemove', this.draggable);
      window.removeEventListener('mouseup', this.draggableEnd);
      this.components.bar.addEventListener('click', this.click);
      this.components.bar.addEventListener('mousedown', this.draggableStart);
      this.components.steps.getDom().addEventListener('click', this.setItemStepsPosition);
    }

    @bind
    private click(event: MouseEvent) {
      this.dragThumb = this.changePositonThumb(event);

      if(this.dragThumb) {
        this.setActiveThumb(this.dragThumb);
        this.draggable(event);
      }
  }

    @bind
    private setItemStepsPosition(event: MouseEvent) {

    this.components.steps.getItems().forEach((item) => {
      if (event.target == item) {
        const value = Number(item.getAttribute('data-val'));
        const thumb = this.changePositonThumb(event);

        this._events.slide.notify({ handle: thumb, value});
      }
    })
   }
   
   private getStepsValue(): number[] {
    const { maxValue, minValue, step } = this.modelSettings;
    const middleValue = Math.ceil((maxValue - minValue) / step);
    const viewStep = Math.ceil(middleValue / 6) * step;
    const middleArr = [];
    let value = minValue;

    for (let i = 0; value < maxValue; i += 1) {
      value += viewStep;
      if(value < maxValue) {
        middleArr.push(value);
      }
    }

    return [minValue, ...middleArr, maxValue];
  }

  private renderSteps() {
    const { isVertical } = this.modelSettings;
    const values = this.getStepsValue();
    const side = isVertical ? 'top' : 'left';
    this.components.steps.getDom().innerHTML = '';

    values.map((item) => {
      const domItem = this.components.steps.addItem(Number(item.toFixed(2)));
      const percent = this.convertPercentValueTo(item);
      domItem.style[side] = `${percent}%`;
    });
  }
  }

export default View;