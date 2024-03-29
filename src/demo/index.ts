import '../slider';
import '../slider/styleRange.scss';
import './panel';
import './panel/panel.scss';
import './panel/blocks/buttons/buttons.scss';
import './panel/blocks/input-fields/input-fields.scss';
import './panel/blocks/panel-options/panel-options.scss';


const sliderContainer1 = {
  containerSlider: $(".js-container__slider-1"),
  containerPanel: $(".js-container__panel-1"),
};

const sliderContainer2 = {
  containerSlider: $(".js-container__slider-2"),
  containerPanel: $(".js-container__panel-2"),
};

const sliderContainer3 = {
  containerSlider: $(".js-container__slider-3"),
  containerPanel: $(".js-container__panel-3"),
};

const slider_1 = sliderContainer1.containerSlider.FerSlider({});
const slider_2 = sliderContainer2.containerSlider.FerSlider({
  minValue: -42,
  maxValue: 42,
  isRange: true,
  valueFrom: 32,
  valueTo: 30,
  step: 5,
  isTip: true,
  isStep: true,
});
const slider_3 = sliderContainer3.containerSlider.FerSlider({
  minValue: -7,
  maxValue: 0,
  isVertical: true,
  step: 0.01,
  isRange: false,
  valueFrom: 0,
});

sliderContainer1.containerPanel.DemoPanel(slider_1);
sliderContainer2.containerPanel.DemoPanel(slider_2);
sliderContainer3.containerPanel.DemoPanel(slider_3);
