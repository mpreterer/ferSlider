import FerSlider from "../../../View/FerSlider";
import IModelSettings from "../../../interfaces/IModelSettings";

declare global {
  interface JQuery {
    FerSlider(settings?: IModelSettings): FerSlider;
  }
}
