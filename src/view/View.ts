import Observer from "../Observer/Observer";
import { optionsParentDOM, valueOutput} from ""
class View extends Observer {
    constructor(parentDOM: optionsParentDOM, modelOptions: valueOutput) {
        super();

        this.modelOptions = modelOptions;

    }
}