import IModelSettings from '../../../interfaces/IModelSettings';
import FerSlider from '../../../FerSlider';

declare global {
  interface JQuery {
    FerSlider(settings?: IModelSettings): FerSlider;
  }
}
