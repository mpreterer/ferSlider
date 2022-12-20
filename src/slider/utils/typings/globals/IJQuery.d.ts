import FerSlider from "../../../FerSlider";
import IModelSettings from "../../../interfaces/IModelSettings";

declare global {
  interface JQuery {
    FerSlider(settings?: IModelSettings): FerSlider;
  }
}
