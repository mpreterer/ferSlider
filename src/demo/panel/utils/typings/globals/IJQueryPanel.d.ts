import demoPanel from '../../../demoPanel';
import IModelSettings from '../../../../../range/interfaces/IModelSettings';

declare global {
    interface JQuery {
        demoPanel(settings?: IModelSettings): demoPanel;
    }
}