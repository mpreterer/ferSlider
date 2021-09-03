(function () {
    this.ferSlider = function() {
        let defaults = {
            minValue: 0,
            maxValue: 1000,
            step: 1,
            valueFrom: 100,
            valueTo: 250,
            isRange: false,
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
            BTN_TIP: parentSelector.querySelector('#btnTip'), // Кнопка для tip
            BAR: parentSelector.querySelector('#bar'),
            THUMB_TOP: parentSelector.querySelector('.thumbTop'), // верхний ползунок вертикального слайдера
            FIELD_STEPS: parentSelector.querySelector('.stepsIn'),
            START_STEP: parentSelector.querySelector('.startStep'),
            END_STEP: parentSelector.querySelector('.endStep'),
            typeRange: parentSelector.querySelector('.typeRange'),
            // STOP_MAX: parseInt(parentSelector.querySelector('#valueRight').max),
            valueOutputLeftHTML: parentSelector.querySelector('#valueLeft'),
            valueOutputRightHTML: parentSelector.querySelector('#valueRight'),
            valueOutputLeft: parentSelector.querySelector('#valueLeft'),
            valueOutputRight: parentSelector.querySelector('#valueRight'),
            valueTopL: parentSelector.querySelector('.valueTopLeft'), // цифры сверху
            valueTopR: parentSelector.querySelector('.valueTopRight'), // цифры сверху
            minimum: parentSelector.querySelector('#minimum'), // минимум
            minimumEvent: parentSelector.querySelector('#minimum'), // минимум
            maximum: parentSelector.querySelector('#maximum'), // максимум
            maximumEvent: parentSelector.querySelector('#maximum'), // максимум
            // step: parseInt(parentSelector.querySelector('#valueSteps').value), //шаг
            stepEvent: parentSelector.querySelector('#valueSteps'), //шаг
            leftDifference: parseInt(getComputedStyle(parentSelector.querySelector('.container_range')).marginLeft), // чтобы не смещались ползунки
            offLeft: parentSelector.querySelector('.container_range').offsetLeft,
            valueLeft: parseInt(parentSelector.querySelector('.thumbLeft').style.left),
            valueRight: parseInt(parentSelector.querySelector('.thumbRight').style.left),
            widthRange: parseInt(getComputedStyle(parentSelector.querySelector('.container_range')).width),
            widthThumb: parseInt(parentSelector.querySelector('.thumb').style.width) / widthRange,
        };
    };

    ferSlider.prototype.addListeners = function () {
        this.options.selector.BAR.addEventListener('click', function () {
            if (!(this.options.selector.FIELD_RANGE.classList.contains('hidden'))) {
                this.options.selector.RANGE.setAttribute('bar', 'off');
                this.options.selector.FIELD_RANGE.classList.add('hidden');
            }
            else {
                this.options.selector.RANGE.setAttribute('bar', 'on');
                this.options.selector.FIELD_RANGE.classList.remove('hidden');
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

const THUMB = document.querySelector('.thumb');
const THUMB_LEFT = document.querySelector('.thumbLeft');
const THUMB_RIGHT = document.querySelector('.thumbRight');
const FIELD_RANGE = document.querySelector('.field_range');
const RANGE = document.querySelector('.range');
const CONTAINER_RANGE = document.querySelector('.container_range');
const BTN_TIP = document.getElementById('btnTip'); // Кнопка для tip
const BAR = document.getElementById('bar');
const THUMB_TOP = document.querySelector('.thumbTop'); // верхний ползунок вертикального слайдера
const FIELD_STEPS = document.querySelector('.stepsIn');
const START_STEP = document.querySelector('.startStep');
const END_STEP = document.querySelector('.endStep');
const typeRange = document.querySelector('.typeRange');
const STOP_MAX = parseInt(document.getElementById('valueRight').max);
// const CONTAINER_VR = <HTMLElement>document.querySelector('.container_range_vertical'); // вертикальный слайдер
// const FIELD_RANGE_VR = <HTMLElement>document.querySelector('.field_range_vertical'); // внутри вертикального салйдера
// const FIELD_STEP_OUT = <HTMLElement>document.querySelector('.steps');
var valueOutputLeftHTML = document.getElementById('valueLeft');
var valueOutputRightHTML = document.getElementById('valueRight');
var valueOutputLeft = document.getElementById('valueLeft');
var valueOutputRight = document.getElementById('valueRight');
var valueTopL = document.querySelector('.valueTopLeft'); // цифры сверху
var valueTopR = document.querySelector('.valueTopRight'); // цифры сверху
var minimum = document.getElementById('minimum'); // минимум
var minimumEvent = document.getElementById('minimum'); // минимум
var maximum = document.getElementById('maximum'); // максимум
var maximumEvent = document.getElementById('maximum'); // максимум
var step = parseInt(document.getElementById('valueSteps').value); //шаг
var stepEvent = document.getElementById('valueSteps'); //шаг
var leftDifference = parseInt(getComputedStyle(CONTAINER_RANGE).marginLeft); // чтобы не смещались ползунки
var offLeft = CONTAINER_RANGE.offsetLeft;
var valueLeft = parseInt(THUMB_LEFT.style.left);
var valueRight = parseInt(THUMB_RIGHT.style.left);
var widthRange = parseInt(getComputedStyle(RANGE).width);
var widthThumb = parseInt(THUMB.style.width) / widthRange;

var options = {
    minValue: 0,
    maxValue: 5000,
    step: 1,
    valueFrom: 1000,
    valueTo: 2500,
    isRange: false,
    isTip: true,
    isBar: true,
    isVertical: false
};
// Выставляем слайдер в изначальнео положение
valueOutputLeft.value = '' + Math.round((valueLeft - 3) * (options.maxValue / 100));
valueOutputRight.value = '' + Math.round((valueRight + 3) * (options.maxValue / 100));
FIELD_RANGE.style.left = valueLeft + '%';
FIELD_RANGE.style.width = valueRight - valueLeft + widthThumb + '%';
valueTopL.style.left = valueLeft + 1 + '%';
valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
valueTopR.style.left = valueRight + 1 + '%';
valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
minimum.value = minimum.min;
maximum.value = maximum.max;

var moveClickFieldRange = {
    moveDoubleBar: FIELD_RANGE.addEventListener('click', function (event) {
        // если есть бар и двойной диапозон то выполнить работу
        if (RANGE.getAttribute('range') === 'double' && RANGE.getAttribute('bar') === 'on') {
            event.preventDefault();
            // margin от левого ползунка до конца страницы по левую сторону
            var tl = THUMB_LEFT.getBoundingClientRect().left;
            // аналогично с правой
            var tr = THUMB_RIGHT.getBoundingClientRect().left;
            var newPosMove = ((event.clientX - leftDifference) / parseFloat(getComputedStyle(RANGE).width));
            if (event.target == FIELD_RANGE) {
                if (tr - event.clientX > event.clientX - tl) {
                    THUMB_RIGHT.style.left = newPosMove * 100 + '%' + " ";
                    FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                        parseInt(THUMB_LEFT.style.left) +
                        widthThumb + '%');
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((newPosMove * 104.168) *
                        (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = "" + (parseInt(valueOutputRight.value) +
                        parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
                    valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                    valueTopL.style.zIndex = '98';
                    THUMB_LEFT.style.zIndex = '98';
                    valueTopR.style.zIndex = '99';
                    THUMB_RIGHT.style.zIndex = '99';
                }
                else {
                    THUMB_LEFT.style.left = "" + (((event.clientX - leftDifference) /
                        parseFloat(getComputedStyle(RANGE).width)) *
                        100 + '%');
                    FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                        parseInt(THUMB_LEFT.style.left) +
                        widthThumb + '%');
                    FIELD_RANGE.style.left = parseInt(THUMB_LEFT.style.left) + 0.7 + '%';
                    // преобразуем в значения
                    valueOutputLeft.value = '' + Math.round((newPosMove * 104.168) *
                        (parseInt(valueOutputLeft.max)) / 100);
                    // Добавляем минимум
                    valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) +
                        parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopL.style.left = parseInt(THUMB_LEFT.style.left) + 1 + '%';
                    valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
                    valueTopR.style.zIndex = '98';
                    valueTopL.style.zIndex = '99';
                    THUMB_LEFT.style.zIndex = '99';
                    THUMB_RIGHT.style.zIndex = '98';
                }
            }
        }
        else {
            if (event.target == FIELD_RANGE) {
                var newPosMove = ((event.clientX - leftDifference) /
                    parseFloat(getComputedStyle(RANGE).width));
                THUMB_RIGHT.style.left = "" + (newPosMove * 100 + '%');
                FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                    parseInt(THUMB_LEFT.style.left) + widthThumb + '%');
                // преобразуем в значения 
                valueOutputRight.value = '' + Math.round((newPosMove * 104.168) *
                    (parseInt(valueOutputRight.max)) / 100);
                // Добавляем минимум
                valueOutputRight.value = "" + (parseInt(valueOutputRight.value) +
                    parseInt(valueOutputLeft.min));
                // Значения сверху
                valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
                valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                valueTopL.style.zIndex = '98';
                THUMB_LEFT.style.zIndex = '98';
                valueTopR.style.zIndex = '99';
                THUMB_RIGHT.style.zIndex = '99';
            }
        }
    })
};
var moveCLickRange = {
    moveDoubleBar: RANGE.addEventListener('click', function (event) {
        if (RANGE.getAttribute('range') === 'double' && RANGE.getAttribute('bar') === 'on') {
            event.preventDefault(); // отключаем поведение по умолчанию
            var tl = THUMB_LEFT.getBoundingClientRect().left; // margin от левого ползунка до конца страницы по левую сторону
            var tr = THUMB_RIGHT.getBoundingClientRect().left; // аналогично с правой 
            var posAfterThumbR = (event.clientX - leftDifference -
                ((parseInt(THUMB_RIGHT.style.left) *
                    widthRange) / 100)); // позиция после правого ползунка
            var posAfterThumbL = (event.clientX - leftDifference -
                ((parseInt(THUMB_LEFT.style.left) *
                    widthRange) / 100)); // позиция перед левым ползунком
            if (posAfterThumbR < 0) {
                posAfterThumbR = posAfterThumbR * -1;
            }
            if (posAfterThumbL < 0) {
                posAfterThumbL = posAfterThumbL * -1;
            }
            if (event.target == RANGE) {
                if (posAfterThumbR < posAfterThumbL) {
                    THUMB_RIGHT.style.left = "" + (parseInt(THUMB_RIGHT.style.left) +
                        ((posAfterThumbR * 100) / widthRange) + '%');
                    FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                        parseInt(THUMB_LEFT.style.left) + widthThumb + '%');
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) /
                        parseFloat(getComputedStyle(RANGE).width)) *
                        104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = "" + (parseInt(valueOutputRight.value) +
                        parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
                    valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
                    // tip правый поверх левого
                    valueTopL.style.zIndex = '98';
                    valueTopR.style.zIndex = '99';
                }
                else {
                    THUMB_LEFT.style.left = "" + (((event.clientX - leftDifference) * 100) / widthRange + '%');
                    FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                        parseInt(THUMB_LEFT.style.left) + widthThumb + '%');
                    FIELD_RANGE.style.left = "" + THUMB_LEFT.style.left;
                    // преобразуем в значения 
                    valueOutputLeft.value = '' + Math.round((((event.clientX - leftDifference) /
                        parseFloat(getComputedStyle(RANGE).width)) *
                        104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) +
                        parseInt(valueOutputLeft.min));
                    // Значения сверху
                    valueTopL.style.left = parseInt(THUMB_LEFT.style.left) + 1 + '%';
                    valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
                    valueTopL.style.zIndex = '99';
                    valueTopR.style.zIndex = '98';
                }
            }
        }
        else if (RANGE.getAttribute('range') === 'one' && RANGE.getAttribute('bar') === 'on') {
            if (event.target === RANGE) {
                var posAfterThumbR = (event.clientX - leftDifference -
                    ((parseInt(THUMB_RIGHT.style.left) * widthRange) / 100)); // позиция после правого ползунка
                THUMB_RIGHT.style.left = "" + (parseInt(THUMB_RIGHT.style.left) +
                    ((posAfterThumbR * 100) / widthRange) + '%');
                FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
                    parseInt(THUMB_LEFT.style.left) + widthThumb + '%');
                // преобразуем в значения 
                valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) /
                    parseFloat(getComputedStyle(RANGE).width)) *
                    104.168) * (parseInt(valueOutputRight.max)) / 100);
                // Добавляем минимум
                valueOutputRight.value = "" + (parseInt(valueOutputRight.value) +
                    parseInt(valueOutputLeft.min));
                // Значения сверху
                valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
                valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
            }
        }
        else if (RANGE.getAttribute('range') === 'one' && RANGE.getAttribute('bar') === 'off') {
            THUMB_RIGHT.style.left = "" + (((event.clientX - leftDifference) * 100) / widthRange + '%');
            // преобразуем в значения 
            valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) /
                parseFloat(getComputedStyle(RANGE).width)) *
                104.168) * (parseInt(valueOutputRight.max)) / 100);
            // Добавляем минимум
            valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputRight.min));
            // Значения сверху
            valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
            valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
            valueTopL.style.zIndex = '99';
            valueTopR.style.zIndex = '98';
        }
    })
};
var steps = {
    enterSteps: stepEvent.addEventListener('input', function (event) {
        var maxValue = parseInt(document.getElementById('valueRight').max); // максимум 
        var steps = parseInt(document.getElementById('valueSteps').value); // заданный шаг
        var valueLabel = maxValue / steps; // кол-во делений
        FIELD_STEPS.innerHTML = ''; // очишаем прошлые шаги
        START_STEP.innerHTML = '';
        END_STEP.innerHTML = '';
        valueOutputLeft.step = "" + step;
        valueOutputRight.step = "" + step;
        document.getElementById('valueRight').step = "" + step;
        // добавляем шаги
        // if (valueLabel != Infinity || valueLabel != NaN) {
        //     startStep.insertAdjacentHTML('beforeend',`<label>0</label>`);
        //     for(let j = 0, i=0; j < valueLabel-1; j++) {
        //         i += steps;
        //         filedSteps.insertAdjacentHTML('beforeend',`<label>${i}</label>`);
        //         }
        //     }
        //     endStep.insertAdjacentHTML('beforeend',`<label>${maxValue}</label>`);
    })
};
var controller = {
    enterMinumum: minimumEvent.addEventListener('input', function () {
        valueOutputLeft.min = "" + parseInt(minimum.value);
        valueOutputRight.min = "" + parseInt(minimum.value);
        minimum.min = minimum.value;
        // переставляем ползунок в начало
        valueOutputLeft.value = minimum.min;
        THUMB_LEFT.style.left = 1 + '%';
        valueTopL.style.left = parseInt(THUMB_LEFT.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
        FIELD_RANGE.style.left = 0 + '%';
        FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
            parseInt(THUMB_LEFT.style.left) + '%');
        // Меняем максимум под минимальное значеие так чтобы он остался прежним
        // p.s. в инпуте всегда прибавляется минимум
        // прибавляем к максимум если min < 0 & вычитаем из максимума если min > 0
        if (parseInt(minimum.value) < 0) {
            valueOutputRight.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
            valueOutputLeft.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
        }
        else {
            valueOutputRight.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
            valueOutputLeft.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
        }
        if (parseInt(minimum.min) > parseInt(maximum.max)) {
            maximum.value = "" + (parseInt(minimum.value) + 1);
            valueOutputRight.max = "" + (parseInt(maximum.value) + 1);
            valueOutputLeft.max = "" + (parseInt(maximum.value) + 1);
            if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
                valueOutputRight.value = maximum.value;
                THUMB_RIGHT.style.left = 95 + '%';
                THUMB_LEFT.style.left = 1 + '%';
            }
        }
        if (parseInt(minimum.value) == NaN || minimum.value == '') {
            valueOutputLeft.min = "" + 0;
        }
    }),
    enterMaximum: maximumEvent.addEventListener('input', function () {
        if (parseInt(minimum.value) < 0) {
            valueOutputRight.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
            valueOutputLeft.max = "" + (parseInt(maximum.value) + (parseInt(minimum.value) * -1));
        }
        else {
            valueOutputRight.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
            valueOutputLeft.max = "" + (parseInt(maximum.value) - parseInt(minimum.value));
        }
        // valueOutputRight.max = `${maximum.value}`;
        if (maximum.value == null || parseInt(maximum.value) == NaN) {
            valueOutputRight.max = "" + STOP_MAX;
        }
    }),
    oneRange: 
    //одинарный слайдер
    typeRange.addEventListener('click', function () {
        THUMB_LEFT.style.left = 0 + '%';
        FIELD_RANGE.style.width = "" + (parseInt(THUMB_RIGHT.style.left) -
            parseInt(THUMB_LEFT.style.left));
        // Убираем левый ползунок и заполняем field range else добавляем ползунок обратно
        if (THUMB_LEFT.classList.contains('hidden')) {
            // меняем класс диапозона
            RANGE.setAttribute('range', 'double');
            // показываем все ползунки
            THUMB_LEFT.classList.remove('hidden');
            valueTopL.classList.remove('hidden');
            valueTopR.classList.remove('hidden');
            valueOutputLeft.value = '0';
        }
        else {
            // меняем класс диапозона
            RANGE.setAttribute('range', 'one');
            // скрываем левый ползунок оставляем правый
            THUMB_LEFT.classList.add('hidden');
            valueTopL.classList.add('hidden');
            valueTopL.innerHTML = '0';
            valueTopL.style.left = 0 + '%';
            FIELD_RANGE.style.width = parseInt(THUMB_RIGHT.style.left) + 2 + '%';
            FIELD_RANGE.style.left = 0 + '%';
            valueOutputLeft.value = '0';
        }
    }),
    eventTHUMB_LEFT: THUMB_LEFT.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var shiftX = event.clientX - THUMB_LEFT.getBoundingClientRect().left; // смещение позиции мыши клиента  
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        THUMB_LEFT.style.zIndex = '99';
        valueTopL.style.zIndex = '99';
        valueTopR.style.zIndex = '98';
        THUMB_RIGHT.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            var rightEdge = RANGE.offsetWidth - THUMB_LEFT.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки
            // if (newPos < parseInt(valueOutputLeft.min)) {
            //     newPos = parseInt(valueOutputLeft.min);
            // }
            if (newPos < 0) {
                newPos = 0;
            }
            // Если левый ползунок пытается быть больше правого
            if (newPos / parseFloat(getComputedStyle(RANGE).width) * 100 >=
                parseFloat(THUMB_RIGHT.style.left) ||
                parseInt(valueOutputLeft.value) >=
                    parseInt(valueOutputRight.value)) {
                newPos = ((parseFloat(THUMB_RIGHT.style.left) *
                    parseFloat(getComputedStyle(RANGE).width)) / 100) + 0.1;
            }
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            // Перемещение ползунка
            THUMB_LEFT.style.left = (newPos / parseInt(getComputedStyle(RANGE).width)) * 100 + '%';
            // Заполнение инпутов. преобразуем из % в целые значения инпутов
            valueOutputLeft.value = '' + Math.round((newPos / parseInt(getComputedStyle(RANGE).width) * 104.168) *
                (parseInt(valueOutputLeft.max)) / 100);
            // настройка минимума
            valueOutputLeft.value = "" + (parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min));
            // Верхние значения
            valueTopL.style.left = parseInt(THUMB_LEFT.style.left) + 0.2 + '%';
            valueTopL.innerHTML = "" + parseFloat(valueOutputLeft.value);
        }
        function changeWidth() {
            var leftPositionTHUMB_LEFT = parseInt(THUMB_LEFT.style.left);
            var leftPositionTHUMB_RIGHT = parseInt(THUMB_RIGHT.style.left);
            FIELD_RANGE.style.width = (leftPositionTHUMB_RIGHT - leftPositionTHUMB_LEFT) + widthThumb + '%';
            FIELD_RANGE.style.left = leftPositionTHUMB_LEFT + 0.7 + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    }),
    eventTHUMB_RIGHT: THUMB_RIGHT.onmousedown = function (event) {
        event.preventDefault();
        var shiftX = event.clientX - THUMB_RIGHT.getBoundingClientRect().left;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        THUMB_RIGHT.style.zIndex = '99';
        valueTopR.style.zIndex = '99';
        valueTopL.style.zIndex = '98';
        THUMB_LEFT.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            var rightEdge = RANGE.offsetWidth - THUMB_RIGHT.offsetWidth;
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            if (newPos / parseFloat(getComputedStyle(RANGE).width) * 100 <=
                parseFloat(THUMB_LEFT.style.left) ||
                parseInt(valueOutputRight.value) <=
                    parseInt(valueOutputLeft.value)) {
                newPos = ((parseFloat(THUMB_LEFT.style.left) *
                    parseFloat(getComputedStyle(RANGE).width)) / 100) + 0.1;
            }
            THUMB_RIGHT.style.left = (newPos / parseInt(getComputedStyle(RANGE).width)) * 100 + '%'; // переводим в % RANGE
            // преобразуем в значения
            valueOutputRight.value = '' + Math.round((newPos / parseInt(getComputedStyle(RANGE).width) * 104.168) *
                (parseInt(valueOutputRight.max)) / 100);
            // Добавляем минимум
            valueOutputRight.value = "" + (parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min));
            // Значения сверху
            valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
            valueTopR.innerHTML = "" + parseFloat(valueOutputRight.value);
        }
        function changeWidth() {
            var leftPositionTHUMB_LEFT = parseInt(THUMB_LEFT.style.left);
            var leftPositionTHUMB_RIGHT = parseInt(THUMB_RIGHT.style.left);
            FIELD_RANGE.style.width = (leftPositionTHUMB_RIGHT - leftPositionTHUMB_LEFT) + widthThumb + '%';
            FIELD_RANGE.style.left = leftPositionTHUMB_LEFT + 0.9 + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
            // biss=false;
        }
    },
    enterInputLeft: valueOutputLeftHTML.oninput = function () {
        // Выстраиваем числовые значения в инпутах
        // 92 и 5 т.к. field range заполняется всего на 92 процента
        THUMB_LEFT.style.left = (parseFloat(valueOutputLeft.value) / parseInt(valueOutputLeft.max)) * 92.5 + '%';
        FIELD_RANGE.style.width = parseInt(THUMB_RIGHT.style.left) - parseInt(THUMB_LEFT.style.left) + widthThumb + '%';
        FIELD_RANGE.style.left = parseInt(THUMB_LEFT.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputLeft.value)) > parseInt(valueOutputLeft.max)) {
            valueOutputLeft.value = "" + parseInt(valueOutputLeft.max);
            THUMB_RIGHT.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            FIELD_RANGE.style.width = parseInt(THUMB_RIGHT.style.left) - parseInt(THUMB_LEFT.style.left) + widthThumb + '%';
        }
        if (parseInt(valueOutputLeft.value) > parseInt(valueOutputRight.value)) {
            valueOutputLeft.value = valueOutputRight.value;
            THUMB_LEFT.style.zIndex = '99';
            THUMB_LEFT.style.left = THUMB_RIGHT.style.left;
            FIELD_RANGE.style.width = 0 + '%';
        }
        valueTopL.style.left = parseInt(THUMB_LEFT.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
    },
    enterInputRight: valueOutputRightHTML.oninput = function () {
        THUMB_RIGHT.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
        FIELD_RANGE.style.width = parseInt(THUMB_RIGHT.style.left) - parseInt(THUMB_LEFT.style.left) + widthThumb + '%';
        FIELD_RANGE.style.left = parseInt(THUMB_LEFT.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputRight.value)) > parseInt(valueOutputRight.max)) {
            valueOutputRight.value = "" + parseInt(valueOutputRight.max);
            THUMB_RIGHT.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            FIELD_RANGE.style.width = parseInt(THUMB_RIGHT.style.left) - parseInt(THUMB_LEFT.style.left) + widthThumb + '%';
        }
        if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
            valueTopR.innerHTML = valueOutputLeft.value;
            THUMB_RIGHT.style.left = THUMB_LEFT.style.left;
            FIELD_RANGE.style.width = '0%';
        }
        valueTopR.style.left = parseInt(THUMB_RIGHT.style.left) + 1 + '%';
        valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
    }
};
// var verticalRange = {
//     thumbTop: 
//         THUMB_TOP.addEventListener('mousedown', (event:MouseEvent) => {
//             event.preventDefault();
//             let shiftY = event.clientY - THUMB_TOP.getBoundingClientRect().top;
//             document.addEventListener('mousemove', nowMouseMove);
//             document.addEventListener('mouseup', nowMouseUp);
//             document.addEventListener('mousemove', changeWidth);
//             function nowMouseMove(event:MouseEvent) {
//                 var newPosVertical = event.clientY - shiftY - CONTAINER_VR.getBoundingClientRect().top;
//                 if (newPosVertical < 0) {
//                     newPosVertical = 0;
//                   }
//                 let downEdge = CONTAINER_VR.offsetHeight - THUMB_TOP.offsetHeight;
//                 if (newPosVertical > downEdge) {
//                     newPosVertical = downEdge;
//                   }
//                // преобразуем в значения
//               THUMB_TOP.style.top = (newPosVertical / parseInt(getComputedStyle(CONTAINER_VR).height)) * 100 + '%' // переводим в % range
//               valueOutputRight.value = '' + Math.round((newPosVertical / parseInt(getComputedStyle(CONTAINER_VR).height) * 109.9) * (parseInt(valueOutputRight.max)) / 100);
//               // Значения сверху
//             }
//         function changeWidth() {
//             let topPosThumbTop = parseInt(THUMB_TOP.style.top);
//             FIELD_RANGE_VR.style.height = topPosThumbTop + widthThumb + '%';
//         }
//         function nowMouseUp() {
//                 document.removeEventListener('mouseup' , nowMouseUp);
//                 document.removeEventListener('mousemove', nowMouseMove);
//                 document.removeEventListener('mousemove', changeWidth);
//             }
//     })
// }
