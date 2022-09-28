import IModelSettings from '../../../../../range/interfaces/IModelSettings';
import demoPanel from '../../../demoPanel';

declare global {
    interface JQuery {
        demoPanel(settings?: IModelSettings): demoPanel;
    }
}