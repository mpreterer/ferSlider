import ferSlider from '../../../View/ferSlider';
import IModelSettings from '../../../interfaces/IModelSettings';

declare global {
  interface JQuery {
    ferSlider(settings?: IModelSettings): ferSlider;
  }
}