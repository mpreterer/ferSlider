(function () {
    this.ferSlider = function() {
        let defaults = {
            minValue: 0,
            maxValue: 1000,
            step: 1,
            valueFrom: 100,
            valueTo: 250,
            isRange: true,
            isTip: true,
            isBar: true,
            isVertical: false,
            parentSelector: null,
        };

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = exetendsDefaults(defaults, arguments[0])
        }

        this.init();
    };

    function exetendsDefaults(source, properties) {
        let property;

        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
      
        return source;
    };

    ferSlider.prototype.renderSlider = function () {
        const { parentSelector } = this.options;
        
        parentSelector.innerHTML = `
        <div class="container_range">
            <div class="range range_horizontal" tip="on" condition="horizontal" bar="on" range="double" steps="1" maximum="5000" minimum="0" index="1">
                <div class="field_range" style="width:0%; left:0;"></div>
                <div class="valueTop valueTopLeft" style="left:25%;"></div>
                <div class="thumb thumbLeft" style="width:10px;
                height:18px; left:25%;"></div>
                <div class="valueTop valueTopRight" style="left:65%;"></div>
                <div class="thumb thumbRight" style="width:10px;
                height:18px; left:65%;"></div>
            </div>
            <div class="steps">
                <div class="startStep"></div>
                <div class="stepsIn" style="width:100%;"></div>
                <div class="endStep"></div>
            </div>
        </div>
        `

        this.options.selector = {
            THUMB: parentSelector.querySelector('.thumb'),
            THUMB_LEFT: parentSelector.querySelector('.thumbLeft'),
            THUMB_RIGHT: parentSelector.querySelector('.thumbRight'),
            FIELD_RANGE: parentSelector.querySelector('.field_range'),
            RANGE: parentSelector.querySelector('.range'),
            CONTAINER_RANGE: parentSelector.querySelector('.container_range'),
            BTN_TIP: document.querySelector('.btnTip'), // Кнопка для tip
            BAR: document.querySelector('.bar'),
            FIELD_STEPS: parentSelector.querySelector('.stepsIn'),
            START_STEP: parentSelector.querySelector('.startStep'),
            END_STEP: parentSelector.querySelector('.endStep'),
            typeRange: document.querySelector('.typeRange'),
            // STOP_MAX: parseInt(parentSelector.querySelector('#valueRight').max),
            valueOutputLeftHTML: document.querySelector('.valueLeft'),
            valueOutputRightHTML: document.querySelector('.valueRight'),
            valueOutputLeft: document.querySelector('.valueLeft'),
            valueOutputRight: document.querySelector('.valueRight'),
            valueTopL: parentSelector.querySelector('.valueTopLeft'), // цифры сверху
            valueTopR: parentSelector.querySelector('.valueTopRight'), // цифры сверху
            minimum: document.querySelector('.minimum'), // минимум
            minimumEvent: document.querySelector('.minimum'), // минимум
            maximum: document.querySelector('.maximum'), // максимум
            maximumEvent: document.querySelector('.maximum'), // максимум
            // step: parseInt(parentSelector.querySelector('.valueSteps').value), //шаг
            stepEvent: document.querySelector('.valueSteps'), //шаг
            leftDifference: parseInt(getComputedStyle(parentSelector.querySelector('.container_range')).marginLeft), // чтобы не смещались ползунки
            offLeft: parentSelector.querySelector('.container_range').offsetLeft,
            valueLeft: parseInt(parentSelector.querySelector('.thumbLeft').style.left),
            valueRight: parseInt(parentSelector.querySelector('.thumbRight').style.left),
            widthRange: parseInt(getComputedStyle(parentSelector.querySelector('.container_range')).width),
            widthThumb: parseInt(parentSelector.querySelector('.thumb').style.width) / 
                        parseInt(getComputedStyle(parentSelector.querySelector('.range')).width),
        };
    };

    ferSlider.prototype.addListeners = function () {
        this.options.selector.BAR.addEventListener('click', function () {
            if (!(document.querySelector('.field_range').classList.contains('hidden'))) {
                document.querySelector('.range').setAttribute('bar', 'off');
                document.querySelector('.field_range').classList.add('hidden');
            }
            else {
                document.querySelector('.range').setAttribute('bar', 'on');
                document.querySelector('.field_range').classList.remove('hidden');
            }
        }); 
    };

    ferSlider.prototype.init = function () {
        this.renderSlider();
        this.addListeners();
    };

}());

new ferSlider({
    minValue: 0,
    maxValue: 1000,
    step: 1,
    valueFrom: 100,
    valueTo: 250,
    isRange: false,
    isTip: true,
    isBar: true,
    isVertical: false,
    parentSelector: document.getElementById('fermanachi-slider'),
})