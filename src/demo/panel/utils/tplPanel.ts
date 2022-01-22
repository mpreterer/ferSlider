const template = `
        <div class="buttons_container">
            <div class="tip">
                <span>Tip: </span>
                <input class = "btnTip" type="checkbox">
            </div>
            <div class="typeRange">
                <span>Range / Double range</span>
                <input class="typeRange" type="checkbox">
            </div>
            <div class="container_bar">
                <span class="spanBar"> Bar</span>
                <input class="bar" type="checkbox">
            </div>
            <div class="container_orientation">
                <span class="spanOrientation">Vertical orientation</span>
                <input class="orientation" type="checkbox">
            </div>
        </div>
        <div class="output_container">
            <div class="min">
                <span>Минимум: </span>
                <input type="number" class="minimum">
            </div>
            <div class="max">
                <span>Максимум: </span>
                <input type="number" class="maximum">
            </div>
            <div class="from">
                <span>from: </span>
                <input type = "number" class = "valueLeft" maxlength="5" size="6">
            </div>
            <div class="to">
                <span>to: </span>
                <input type = "number" class = "valueRight" maxlength="5" size="6">
            </div>
            <div class="steps1">
                <span class="instep">steps:</span>
                <input type="number" class="valueSteps">
            </div>
        </div>
`
export default template; 