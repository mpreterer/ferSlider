import IModelOptions from './IModelOptions';
import ferSlider from './ferSlider';


declare global {
    interface JQuery {
        ferSlider(options: IModelOptions): ferSlider;
    }
}