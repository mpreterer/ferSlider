import IModelSettings from '../../../../../slider/interfaces/IModelSettings';
import DemoPanel from '../../../DemoPanel';

declare global {
  interface JQuery {
    DemoPanel(settings?: IModelSettings): DemoPanel;
  }
}
