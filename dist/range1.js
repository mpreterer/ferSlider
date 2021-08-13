"use strict";
// ;(function($) {
var thumb = document.querySelector('.thumb');
var thumbLeft = document.querySelector('.thumbLeft');
var thumbRight = document.querySelector('.thumbRight');
var field_range = document.querySelector('.field_range');
var fieldOneRange = document.querySelector('.field_range');
var range = document.querySelector('.range');
var containerRange = document.querySelector('.container_range');
var valueOutputLeftHTML = document.getElementById('valueLeft');
var valueOutputRightHTML = document.getElementById('valueRight');
// var valueOutputLeftSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueLeft')).step);
// var valueOutputRightSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueRight')).step);
var valueOutputLeft = document.getElementById('valueLeft');
var valueOutputRight = document.getElementById('valueRight');
var valueTopL = document.querySelector('.valueTopLeft'); // цифры сверху
var valueTopR = document.querySelector('.valueTopRight'); // цифры сверху
var btnTip = document.getElementById('btnTip'); // Кнопка для tip
var bar = document.getElementById('bar');
var minimum = document.getElementById('minimum'); // минимум
var minimumEvent = document.getElementById('minimum'); // минимум
var maximum = parseInt(document.getElementById('maximum').value); // максимум
var maximumEvent = document.getElementById('maximum'); // максимум
var thumbTop = document.querySelector('.thumbTop'); // верхний ползунок вертикального слайдера
var containerVR = document.querySelector('.container_range_vertical'); // вертикальный слайдер
var fieldRangeVR = document.querySelector('.field_range_vertical'); // внутри вертикального салйдера
var step = parseInt(document.getElementById('valueSteps').value); //шаг
var stepEvent = document.getElementById('valueSteps'); //шаг
var filedSteps = document.querySelector('.stepsIn');
var fieldStepsOut = document.querySelector('.steps');
var startStep = document.querySelector('.startStep');
var endStep = document.querySelector('.endStep');
var typeRange = document.querySelector('.typeRange');
var leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
var offLeft = containerRange.offsetLeft;
var widthThumb = parseInt(thumb.style.width) / 10;
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
var stopMax = parseInt(document.getElementById('valueRight').max);
field_range.style.left = valueLeft + '%';
field_range.style.width = valueRight - valueLeft + widthThumb + '%';
valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
var tip = {
    valueTopL: valueOutputLeftHTML.addEventListener('keyup', function () {
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
    }),
    valueTopR: valueOutputRightHTML.addEventListener('keyup', function () {
        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
    }),
    // вкл/выкл 
    buttonTip: btnTip.addEventListener('click', function () {
        if (valueTopL.classList.contains('hidden')) {
            if (thumbLeft.classList.contains('hidden') && valueTopR.classList.contains('hidden')) {
                valueTopR.classList.remove('hidden');
                range.setAttribute('tip', 'on');
            }
            else if (thumbLeft.classList.contains('hidden')) {
                valueTopR.classList.add('hidden');
                range.setAttribute('tip', 'off');
            }
            else if (!thumbLeft.classList.contains('hidden') && !thumbRight.classList.contains('hidden')) {
                valueTopR.classList.remove('hidden');
                valueTopL.classList.remove('hidden');
                range.setAttribute('tip', 'on');
            }
        }
        else {
            valueTopR.classList.add('hidden');
            valueTopL.classList.add('hidden');
        }
    })
};
var barClick = {
    onBar: bar.addEventListener('click', function () {
        if (!(field_range.classList.contains('hidden'))) {
            field_range.classList.add('hidden');
        }
        else {
            field_range.classList.remove('hidden');
        }
    })
};
// Шаги
// var moveClick = {
//     moveThumbler:
//     containerRange.addEventListener('click', (event) => {
//         let pos = event.clientX - leftDifference - widthThumb // позиция клика
//         thumbRight.style.left = pos + 'px';
//         let leftPositionThumbLeft1 = parseInt(thumbLeft.style.left);
//         let leftPositionThumbRight1 = parseInt(thumbRight.style.left);
//         // Пребразование позиции левого ползунка в число
//         let found = thumbLeft.style.left.match(/[0-9/.]+/);
//         let str = found.join('');
//         let num1 = Math.round(Number(str));
//         let leftPosTemp = (num1 * parseInt(getComputedStyle(range).width)) / 100
//         if (pos>leftPosTemp) {
//             valueTopR.style.left = parseInt(thumbRight.style.left) + 'px';
//             valueTopR.innerHTML = valueOutputRight.value;
//             field_range.style.width = (leftPositionThumbRight1-leftPositionThumbLeft1) + widthThumb + 'px';
//             field_range.style.left = leftPositionThumbLeft1 + 'px';
//             valueOutputRight.value = Math.round((pos / parseInt(getComputedStyle(range).width) * 104.168) * (valueOutputRigh) / 100);
//         } else {
//             valueTopR.style.left = parseInt(thumbLeft.style.left) + 1 + 'px';
//             valueTopR.innerHTML = valueOutputRight.value;
//             field_range.style.width = (leftPositionThumbRight1-leftPositionThumbLeft1) + widthThumb + 'px';
//             field_range.style.left = leftPositionThumbLeft1 + 1 + 'px';
//             valueOutputRight.value = Math.round((pos / parseInt(getComputedStyle(range).width) * 104.168) * (valueOutputRigh) / 100);
//         }
//     })
// }
var steps = {
    enterSteps: stepEvent.addEventListener('input', function (event) {
        var maxValue = parseInt(document.getElementById('valueRight').max); // максимум 
        var steps = parseInt(document.getElementById('valueSteps').value); // заданный шаг
        var valueLabel = maxValue / steps; // кол-во делений
        filedSteps.innerHTML = ''; // очишаем прошлые шаги
        startStep.innerHTML = '';
        endStep.innerHTML = '';
        valueOutputLeft.step = "" + step;
        document.getElementById('valueRight').step = "" + step;
        // добавляем шаги
        if (valueLabel != Infinity || valueLabel != NaN) {
            startStep.insertAdjacentHTML('beforeend', "<label>0</label>");
            for (var j = 0, i = 0; j < valueLabel - 1; j++) {
                i += steps;
                filedSteps.insertAdjacentHTML('beforeend', "<label>" + i + "</label>");
            }
        }
        endStep.insertAdjacentHTML('beforeend', "<label>" + maxValue + "</label>");
    })
};
var controller = {
    enterMinumum: minimumEvent.addEventListener('input', function () {
        valueOutputLeft.min = "" + parseInt(minimum.value);
        valueOutputRight.min = "" + parseInt(minimum.value);
        valueOutputLeft.value = "" + parseInt(minimum.value);
        if (parseInt(minimum.value) == NaN || minimum.value == null) {
            valueOutputLeft.min = "" + 0;
        }
    }),
    enterMaximum: maximumEvent.addEventListener('input', function () {
        var maximumChange = parseInt(document.getElementById('maximum').value);
        valueOutputLeft.max = "" + maximumChange;
        document.getElementById('valueRight').max = "" + maximumChange;
        if (document.getElementById('maximum').value == null || parseInt(document.getElementById('maximum').value) == NaN) {
            document.getElementById('valueRight').max = "" + stopMax;
        }
    }),
    oneRange: 
    //одинарный слайдер
    typeRange.addEventListener('click', function () {
        thumbLeft.style.left = 0 + '%';
        field_range.style.width = "" + (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left));
        // Убираем левый ползунок и заполняем field range else добавляем ползунок обратно
        if (thumbLeft.classList.contains('hidden')) {
            thumbLeft.classList.remove('hidden');
            valueTopL.classList.remove('hidden');
            valueTopR.classList.remove('hidden');
        }
        else {
            thumbLeft.classList.add('hidden');
            valueTopL.classList.add('hidden');
            field_range.style.width = parseInt(thumbRight.style.left) + 2 + '%';
            field_range.style.left = 0 + '%';
        }
    }),
    eventThumbLeft: thumbLeft.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var shiftX = event.clientX - thumbLeft.getBoundingClientRect().left; // смещение позиции мыши клиента  
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        thumbLeft.style.zIndex = '99';
        valueTopL.style.zIndex = '99';
        valueTopR.style.zIndex = '98';
        thumbRight.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            var rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки
            if (newPos < parseInt(valueOutputLeft.min)) {
                newPos = parseInt(valueOutputLeft.min);
            }
            if (newPos / parseFloat(getComputedStyle(range).width) * 100 >= parseFloat(thumbRight.style.left) || parseInt(valueOutputLeft.value) >= parseInt(valueOutputRight.value)) {
                newPos = (parseFloat(thumbRight.style.left) * parseFloat(getComputedStyle(range).width)) / 100;
                valueOutputLeft.value = "" + valueOutputRight.value;
            }
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            // if (newPos > parseInt(valueOutputRight.value)) {
            // newPos = rightEdge;
            // }
            if (parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
                thumbLeft.style.left = parseInt(thumbRight.style.left) - 1 + '%';
                document.removeEventListener('mouseup', nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
                valueOutputLeft.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 103) * (parseInt(valueOutputLeft.max)) / 97);
                field_range.style.width = (parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left)) + widthThumb + '%';
                field_range.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
            }
            else {
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                document.addEventListener('mouseup', nowMouseUp);
                thumbLeft.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%';
            }
            // Заполнение инпутов. преобразуем из % в целые значения инпутов
            valueOutputLeft.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputLeft.max)) / 100);
            // Верхние значения
            valueTopL.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
            valueTopL.innerHTML = "" + parseFloat(document.getElementById('valueLeft').value);
        }
        function changeWidth() {
            var widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);
            field_range.style.width = (leftPositionThumbRight - leftPositionThumbLeft) + widthThumb + '%';
            field_range.style.left = leftPositionThumbLeft + 0.7 + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    }),
    eventThumbRight: thumbRight.onmousedown = function (event) {
        event.preventDefault();
        var shiftX = event.clientX - thumbRight.getBoundingClientRect().left;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        // Делаем ползунок выше в завимисоти от выбора
        thumbRight.style.zIndex = '99';
        valueTopR.style.zIndex = '99';
        valueTopL.style.zIndex = '98';
        thumbLeft.style.zIndex = '0';
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;
            if (newPos < 0) {
                thumbLeft.style.left = 0 + '%';
            }
            var rightEdge = range.offsetWidth - thumbRight.offsetWidth;
            if (newPos > rightEdge) {
                newPos = rightEdge;
            }
            if (parseInt(thumbRight.style.left) <= parseInt(thumbLeft.style.left)) {
                thumbRight.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                document.removeEventListener('mouseup', nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            }
            else {
                document.addEventListener('mouseup', nowMouseUp);
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                thumbRight.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%'; // переводим в % range
            }
            // преобразуем в значения
            valueOutputRight.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
            // Значения сверху
            valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
            valueTopR.innerHTML = "" + parseFloat(document.getElementById('valueRight').value);
        }
        function changeWidth() {
            var widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);
            field_range.style.width = (leftPositionThumbRight - leftPositionThumbLeft) + widthThumb + '%';
            field_range.style.left = leftPositionThumbLeft + 0.9 + '%';
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
        thumbLeft.style.left = (parseFloat(valueOutputLeft.value) / parseInt(valueOutputLeft.max)) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputLeft.value)) > parseInt(valueOutputLeft.max)) {
            valueOutputLeft.value = "" + parseInt(valueOutputLeft.max);
            thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        // Если правая сторна больше левой или в левой ''
        if (valueOutputLeft > valueOutputRight || valueOutputLeft === null) {
            thumbLeft.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 80 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
            field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        }
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = "" + (parseFloat(valueOutputLeft.value));
    },
    enterInputRight: valueOutputRightHTML.oninput = function () {
        thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if ((parseFloat(valueOutputRight.value)) > parseInt(valueOutputRight.max)) {
            valueOutputRight.value = "" + parseInt(valueOutputRight.max);
            thumbRight.style.left = ((parseFloat(valueOutputRight.value)) / parseInt(valueOutputRight.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        // Если левая сторна больше правой или в правой ''
        if (valueOutputLeft > valueOutputRight || valueOutputRight === null) {
            thumbRight.style.left = ((parseFloat(valueOutputLeft.value)) / parseInt(valueOutputLeft.max)) * 100 + '%';
            field_range.style.width = parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = "" + (parseFloat(valueOutputRight.value));
    },
};
var verticalRange = {
    thumbTop: thumbTop.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var shiftY = event.clientY - thumbTop.getBoundingClientRect().top;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mouseup', nowMouseUp);
        document.addEventListener('mousemove', changeWidth);
        function nowMouseMove(event) {
            var newPosVertical = event.clientY - shiftY - containerVR.getBoundingClientRect().top;
            if (newPosVertical < 0) {
                newPosVertical = 0;
            }
            var downEdge = containerVR.offsetHeight - thumbTop.offsetHeight;
            if (newPosVertical > downEdge) {
                newPosVertical = downEdge;
            }
            // преобразуем в значения
            thumbTop.style.top = (newPosVertical / parseInt(getComputedStyle(containerVR).height)) * 100 + '%'; // переводим в % range
            valueOutputRight.value = '' + Math.round((newPosVertical / parseInt(getComputedStyle(containerVR).height) * 109.9) * (parseInt(valueOutputRight.max)) / 100);
            console.log(parseInt(getComputedStyle(containerVR).height));
            // Значения сверху
        }
        function changeWidth() {
            var topPosThumbTop = parseInt(thumbTop.style.top);
            fieldRangeVR.style.height = topPosThumbTop + widthThumb + '%';
        }
        function nowMouseUp() {
            document.removeEventListener('mouseup', nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    })
};
