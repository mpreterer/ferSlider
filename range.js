// ;(function($) {

const thumb = document.querySelector('.thumb');
const thumbLeft = document.querySelector('.thumbLeft');
const thumbRight = document.querySelector('.thumbRight');
const field_range = document.querySelector('.field_range');
const range = document.querySelector('.range');
const containerRange = document.querySelector('.container_range');
const valueOutputLeft = document.getElementById('valueLeft');
const valueOutputRight = document.getElementById('valueRight');
const valueTopL = document.querySelector('.valueTopLeft'); // цифры сверху
const valueTopR = document.querySelector('.valueTopRight'); // цифры сверху
const btnTip = document.getElementById('btnTip'); // Кнопка для tip
const bar = document.getElementById('bar');
const minimum = document.getElementById('minimum'); // минимум
const maximum = document.getElementById('maximum'); // максимум
const thumbTop = document.querySelector('.thumbTop'); // верхний ползунок вертикального слайдера
const containerVR = document.querySelector('.container_range_vertical'); // вертикальный слайдер
const fieldRangeVR = document.querySelector('.field_range_vertical'); // внутри вертикального салйдера
const step = document.getElementById('valueSteps'); //шаг
const filedSteps = document.querySelector('.stepsIn');
const fieldStepsOut = document.querySelector('.steps');
const startStep = document.querySelector('.startStep');
const endStep = document.querySelector('.endStep');





let leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
let offLeft = containerRange.offsetLeft;
let widthThumb = parseInt(thumb.style.width) / 10; 
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
const stopMax = parseInt(valueOutputRight.max);


field_range.style.left = valueLeft + '%';
field_range.style.width = valueRight - valueLeft + widthThumb + '%';

valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
valueTopL.innerHTML = valueOutputLeft.value;
valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
valueTopR.innerHTML = valueOutputRight.value;




var tip = {
    valueTopL: 
        valueOutputLeft.addEventListener('keyup', () => {
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = valueOutputLeft.value;
    }),

    valueTopR: 
        valueOutputRight.addEventListener('keyup', () => {
        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = valueOutputRight.value;
    }),

    // вкл/выкл 
    buttonTip:
      btnTip.addEventListener('click', () => {
        if (valueTopL.classList.contains('hidden')) {
            if (thumbLeft.classList.contains('hidden')) {
                valueTopR.classList.add('hidden');
            }

            else if ((thumbLeft.classList.contains('hidden')) && (valueTopR.classList.contains('hidden'))) {
                valueTopR.classList.remove('hidden');
            }

            else if (!thumbLeft.classList.contains('hidden') && !thumbRight.classList.contains('hidden')) {
                valueTopR.classList.remove('hidden');
                valueTopL.classList.remove('hidden');
            }

        }
        else {
            valueTopR.classList.add('hidden');
            valueTopL.classList.add('hidden');
        }
        
      })
}

var barClick = {
    onBar: 
        bar.addEventListener('click', () => {
        if(!(field_range.classList.contains('hidden'))) {
            field_range.classList.add('hidden')
        }
        else {
            field_range.classList.remove('hidden')

        }
    })
}

// Шаги

var moveClick = {
    //Перемещение по клику мыши
    moveThumbler:
    containerRange.addEventListener('click', (event) => {
        let pos = event.clientX - leftDifference - widthThumb // позиция клика
        thumbRight.style.left = pos + 'px';
        let leftPositionThumbLeft1 = parseInt(thumbLeft.style.left);
        let leftPositionThumbRight1 = parseInt(thumbRight.style.left);
        
        // Пребразование позиции левого ползунка в число
        let found = thumbLeft.style.left.match(/[0-9/.]+/);
        let str = found.join('');
        let num1 = Math.round(Number(str));
        let leftPosTemp = (num1 * parseInt(getComputedStyle(range).width)) / 100

        // if (pos>leftPosTemp) {
        //     valueTopR.style.left = parseInt(thumbRight.style.left) + 'px';
        //     valueTopR.innerHTML = valueOutputRight.value;
        //     field_range.style.width = (leftPositionThumbRight1-leftPositionThumbLeft1) + widthThumb + 'px';
        //     field_range.style.left = leftPositionThumbLeft1 + 'px';
        //     valueOutputRight.value = Math.round((pos / parseInt(getComputedStyle(range).width) * 107.53) * (valueOutputRight.max) / 100);

        // } else {
        //     valueTopR.style.left = parseInt(thumbLeft.style.left) + 1 + 'px';
        //     valueTopR.innerHTML = valueOutputRight.value;
        //     field_range.style.width = (leftPositionThumbRight1-leftPositionThumbLeft1) + widthThumb + 'px';
        //     field_range.style.left = leftPositionThumbLeft1 + 1 + 'px';
        //     valueOutputRight.value = Math.round((pos / parseInt(getComputedStyle(range).width) * 107.53) * (valueOutputRight.max) / 100);
        // }
    })
}

var steps = {
    enterSteps:
        step.addEventListener('input', (event) => {
            let maxValue = parseInt(valueOutputRight.max); // максимум 
            let steps = parseInt(step.value); // заданный шаг
            var valueLabel = maxValue/steps; // кол-во делений
            filedSteps.innerHTML = ''; // очишаем прошлые шаги
            startStep.innerHTML = '';
            endStep.innerHTML = '';
            valueOutputLeft.step = step.value;
            valueOutputRight.step = step.value;



            // добавляем шаги
            if (valueLabel != Infinity || valueLabel != NaN) {
                startStep.insertAdjacentHTML('beforeend',`<label>0</label>`);
                for(let j = 0, i=0; j < valueLabel-1; j++) {
    
                    i += steps;
                    filedSteps.insertAdjacentHTML('beforeend',`<label>${i}</label>`);

                    }
                }
                endStep.insertAdjacentHTML('beforeend',`<label>${maxValue}</label>`);

        })
}

var controller = {

    enterMinumum:
        minimum.addEventListener('input', () => {
            let minimumChange = parseInt(minimum.value);

            valueOutputLeft.min = minimumChange;
            valueOutputRight.min = minimumChange;

            valueOutputLeft.value = minimumChange;

            if (minimum.value == NaN || minimum.value == '') {
                valueOutputLeft.min = 0;
            }

        }),
    
    enterMaximum:
        maximum.addEventListener('input', () => {
            let maximumChange = parseInt(maximum.value);
            valueOutputLeft.max = maximumChange;
            valueOutputRight.max = maximumChange;

            if (maximum.value == '' || maximum.value == NaN) {
                valueOutputRight.max = stopMax;
            }
            
            // if (maximum.value == NaN || maximum.value == '') {
            //     valueOutputRight.max = 0;
            // }

        }),


    oneRange:
        //одинарный слайдер
        typeRange.addEventListener('click', () => {
            thumbLeft.style.left = 0 + '%';
            field_range.style.width = thumbRight.style.left - thumbLeft.style.left;
            // Убираем левый ползунок и заполняем field range else добавляем ползунок обратно
            if (thumbLeft.classList.contains('hidden')) {
                thumbLeft.classList.remove('hidden');
                valueTopL.classList.remove('hidden');
                valueTopR.classList.remove('hidden');
            } else {
                thumbLeft.classList.add('hidden');
                valueTopL.classList.add('hidden');
                field_range.style.width = parseInt(thumbRight.style.left) + 2 + '%';
                field_range.style.left = 0 + '%';
            }
            
        }),



              
    eventThumbLeft:

        thumbLeft.addEventListener('mousedown', (event)=>  {
        event.preventDefault();
        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left; // смещение позиции мыши клиента  
            
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);

        // Делаем ползунок выше в завимисоти от выбора
        thumbLeft.style.zIndex = 2;
        thumbRight.style.zIndex = 0;

        function nowMouseMove(event) {
            let newPos = event.clientX - shiftX - leftDifference;            
            let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки

            if (newPos < parseInt(valueOutputLeft.min)) {
                newPos = parseInt(valueOutputLeft.min);
              }

            if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            if (parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
                thumbLeft.style.left = parseInt(thumbLeft.style.left) - 0.1 + '%';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                document.addEventListener('mouseup', nowMouseUp);
               
                thumbLeft.style.left = (newPos / parseInt(getComputedStyle(range).width))  * 100 + '%';
            }
        // Заполнение инпутов. преобразуем из % в целые значения инпутов
        valueOutputLeft.value = Math.round((newPos / parseInt(getComputedStyle(range).width) * 107.53) * (valueOutputLeft.max) / 100);
        // Верхние значения
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
        valueTopL.innerHTML = valueOutputLeft.value;
        }

        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.width = (leftPositionThumbRight-leftPositionThumbLeft) + widthThumb +'%';
            field_range.style.left = leftPositionThumbLeft + 0.7 + '%';


        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
        
    }),



    eventThumbRight:

     thumbRight.onmousedown = function(event) {
        event.preventDefault();
        let shiftX = event.clientX - thumbRight.getBoundingClientRect().left;

        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);

        // Делаем ползунок выше в завимисоти от выбора
        thumbRight.style.zIndex = 2;
        thumbLeft.style.zIndex = 0;
    
        function nowMouseMove(event) {
            let newPos = event.clientX - shiftX - leftDifference;
            if (newPos < 0) {
                thumbLeft.left = 0 + '%';
              }

              let rightEdge = range.offsetWidth - thumbRight.offsetWidth;
              if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            if (parseInt(thumbRight.style.left) <= parseInt(thumbLeft.style.left)) {
                thumbRight.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                document.addEventListener('mouseup' , nowMouseUp);
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);

                thumbRight.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%' // переводим в % range
            }
           // преобразуем в значения
          valueOutputRight.value = Math.round((newPos / parseInt(getComputedStyle(range).width) * 107.53) * (valueOutputRight.max) / 100);
          // Значения сверху
          valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
          valueTopR.innerHTML = valueOutputRight.value;
        
           
        }

        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width) / 10;
            let leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            let leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.width = (leftPositionThumbRight-leftPositionThumbLeft) + widthThumb +'%';
            field_range.style.left = leftPositionThumbLeft + 0.9 + '%';
            
        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
            biss=false;
        }
    },

    enterInputLeft: valueOutputLeft.oninput = function() {
        // Выстраиваем числовые значения в инпутах
        // 92 и 5 т.к. field range заполняется всего на 92 процента
        thumbLeft.style.left = (valueOutputLeft.value/valueOutputLeft.max) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if (parseInt(valueOutputLeft.value) > parseInt(valueOutputLeft.max)) {
            valueOutputLeft.value = parseInt(valueOutputLeft.max);
            thumbRight.style.left = (valueOutputRight.value/valueOutputRight.max) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        // Если правая сторна больше левой или в левой ''
        if (parseInt(valueOutputLeft.value) > parseInt(valueOutputRight.value) || valueOutputLeft.value === '') {
            thumbLeft.style.left = (valueOutputRight.value/valueOutputRight.max) * 80 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
            field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        }

        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = valueOutputLeft.value;
     },

    enterInputRight: valueOutputRight.oninput = function() {
        thumbRight.style.left = (valueOutputRight.value/valueOutputRight.max) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
        // Если значение введено больше максимального 
        if (parseInt(valueOutputRight.value) > parseInt(valueOutputRight.max)) {
            valueOutputRight.value = parseInt(valueOutputRight.max);
            thumbRight.style.left = (valueOutputRight.value/valueOutputRight.max) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        }
        // Если левая сторна больше правой или в правой ''
        if (parseInt(valueOutputLeft.value) > parseInt(valueOutputRight.value) || valueOutputRight.value === '') {
            thumbRight.style.left = (valueOutputLeft.value/valueOutputLeft.max) * 100 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        }

        valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
        valueTopR.innerHTML = valueOutputRight.value;
     },


}



var verticalRange = {

    thumbTop: 
        thumbTop.addEventListener('mousedown', (event) => {
            event.preventDefault();
            let shiftY = event.clientY - thumbTop.getBoundingClientRect().top;
            document.addEventListener('mousemove', nowMouseMove);
            document.addEventListener('mouseup', nowMouseUp);
            document.addEventListener('mousemove', changeWidth);


            function nowMouseMove(event) {
                var newPosVertical = event.clientY - shiftY - containerVR.getBoundingClientRect().top;
            
                if (newPosVertical < 0) {
                    newPosVertical = 0;
                  }

                let downEdge = containerVR.offsetHeight - thumbTop.offsetHeight;

                if (newPosVertical > downEdge) {
                    newPosVertical = downEdge;
                  }
    
               // преобразуем в значения
            
              thumbTop.style.top = (newPosVertical / parseInt(getComputedStyle(containerVR).height)) * 100 + '%' // переводим в % range
              valueOutputRight.value = Math.round((newPosVertical / parseInt(getComputedStyle(containerVR).height) * 109.9) * (valueOutputRight.max) / 100);
              console.log(parseInt(getComputedStyle(containerVR).height))
              // Значения сверху
            }

            
        function changeWidth() {
            let topPosThumbTop = parseInt(thumbTop.style.top);
            fieldRangeVR.style.height = topPosThumbTop + widthThumb + '%';
        }
        

        function nowMouseUp() {
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            }

            


    })
}

// })(jQuery);