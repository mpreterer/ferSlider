import IModelSettings from '../../../interfaces/IModelSettings';
import FerSlider from '../../../View/FerSlider';

declare global {
  interface JQuery {
    FerSlider(settings?: IModelSettings): FerSlider;
  }
}
