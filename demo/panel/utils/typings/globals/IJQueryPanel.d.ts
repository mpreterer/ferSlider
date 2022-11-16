import IModelSettings from '../../../../../src/range/interfaces/IModelSettings';
import DemoPanel from '../../../DemoPanel';

declare global {
  interface JQuery {
    DemoPanel(settings?: IModelSettings): DemoPanel;
  }
}
