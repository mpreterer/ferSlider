import './style.scss';
import './options.scss';
import '../range/index';
import '../range/styleRange.scss';
// import './panel/index';
// import './panel/panel.scss';

const sliderContainer1 = {
  containerSlider: $('.js-slider__container-slider-1'),
  containerPanel: $('.js-slider__container-panel-1')
};

// const sliderContainer2 = {
//   containerSlider: $('.js-slider__container-slider-2'),
//   containerPanel: $('.js-slider__container-panel-2')  
// };

// const sliderContainer3 = {
//   containerSlider: $('.js-slider__container-slider-2'),
//   containerPanel: $('.js-slider__container-panel-3')
// };

// const slider_1 = sliderContainer1.containerSlider.ferSlider({});
// const slider_2 = sliderContainer2.containerSlider.ferSlider({
//   minValue: -10,
//   maxValue: 0,
//   isVertical: true,
//   step: 0.01,
//   isRange: false,
//   valueFrom: -7
// });
// const slider_3 = sliderContainer3.containerSlider.ferSlider({
//   minValue: -42,
//   maxValue: 42,
//   isRange: true,
//   valueFrom: {
//     minValue: -32,
//     maxValue: 32
//   },
//   step: 5,
//   isTip: true,
//   isStep: true,
// });

$('.qwe').ferSlider();