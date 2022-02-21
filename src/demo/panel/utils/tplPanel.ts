const template = `
        <div class="buttons_container">
            <div class="tip">
                <span>Tip:</span>
                <input class = "btnTip js-panel__isTip-input" type="checkbox" name="isTip">
            </div>
            <div class="typeRange">
                <span>Range / Double range</span>
                <input class="typeRange js-panel__isRange-input" type="checkbox" name="typeRange">
            </div>
            <div class="container_bar">
                <span class="spanBar">Progress Bar</span>
                <input class="bar js-panel__isBarRange-input" type="checkbox" name="isBar">
            </div>
            <div class="container_orientation">
                <span class="spanOrientation">Vertical</span>
                <input class="orientation js-panel__vertical-input" type="radio" name="vertical" value="vertical">
                <span class="spanOrientation">Horizontal</span>
                <input class="orientation js-panel__horizontal-input" type="radio" name="horizontal" value="horizontal">
            </div>
            <div class="container_step">
                <span class="spanStep">Step</span>
                <input class="typeStep js-panel__isStep-input" type="checkbox" name="isStep">
            </div>
        </div>
        <div class="output_container">
            <div class="min">
                <span>Минимум: </span>
                <input type="number" class="minimum js-panel__min-input" name="min">
            </div>
            <div class="max">
                <span>Максимум: </span>
                <input type="number" class="maximum js-panel__max-input" name="max">
            </div>
            <div class="from">
                <span>from: </span>
                <input type = "number" class = "valueLeft js-panel__from-input" maxlength="5" size="6" name="from">
            </div>
            <div class="to">
                <span>to: </span>
                <input type = "number" class = "valueRight js-panel__to-input" maxlength="5" size="6" name="to">
            </div>
            <div class="step">
                <span class="instep">step:</span>
                <input type="number" class="valueSteps js-panel__step-input" name="step">
            </div>
        </div>
`
export default template; 