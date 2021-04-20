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
const btnTip = document.getElementById('btnTip') // Кнопка для tip


var steps = 1; // шаг
let leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
let offLeft = containerRange.offsetLeft;
let widthThumb = parseInt(thumb.style.width) / 10; 
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
field_range.style.left = valueLeft + '%';
field_range.style.width = valueRight - valueLeft + widthThumb + '%';


valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
valueTopL.innerHTML = valueOutputLeft.value;

valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
valueTopR.innerHTML = valueOutputRight.value;
var oneRange = {
    
}

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
      btnTip.addEventListener('click', (event) => {
        if (valueTopL.classList.contains('hidden')) {
            valueTopR.classList.remove('hidden');
            valueTopL.classList.remove('hidden');
        }
        else {
            valueTopR.classList.add('hidden');
            valueTopL.classList.add('hidden');
        }
        
      })
}


var controller = {
    clickRange: 
        range.addEventListener('click', (event) => {
            let widthRange = parseInt(getComputedStyle(containerRange).width);
            let nowValue = event.clientX - leftDifference - widthThumb;
            let valueLeftClick = (nowValue/widthRange - 0.02) * 100;

            if (valueLeftClick > 93) {
                valueLeftClick = 93;
            }
            else if (valueLeftClick < 0) {
                valueLeftClick = 0;
            }

            thumbRight.style.left = valueLeftClick + '%'; // позиция правого ползунка
            field_range.style.width = (valueLeftClick - parseInt(thumbLeft.style.left) + widthThumb) + '%'; // шкала заполнения
            valueOutputRight.value = Math.round((valueLeftClick * parseInt(valueOutputRight.max) / 93)); // значение max
            valueTopR.innerHTML = Math.round((valueLeftClick * parseInt(valueOutputRight.max) / 93)); // значение top
            valueTopR.style.left = valueLeftClick + '%'; // позиция значения top
        }),

    eventThumbLeft:

        thumbLeft.addEventListener('mousedown', (event)=>  {
        event.preventDefault();
        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left; // смещение позиции мыши клиента     
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        

        function nowMouseMove(event) {
            let newPos = event.clientX - shiftX - leftDifference;            


            let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки
            if (newPos < 0) {
                newPos = 0;
              }

            if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            if (parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
                thumbLeft.style.left = parseInt(thumbLeft.style.left) - 1 + '%';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                document.addEventListener('mouseup', nowMouseUp);
                thumbLeft.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%'
            }
        // Заполнение инпутов. преобразуем из % в целые значения инпутов
        valueOutputLeft.value = Math.round((newPos / parseInt(getComputedStyle(range).width) * 107.53) * (valueOutputLeft.max) / 100);
        // Верхние значения
        valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
        valueTopL.innerHTML = valueOutputLeft.value;
        }

        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.width = (leftPositionThumbRight-leftPositionThumbLeft) + widthThumb +'%';
            field_range.style.left = leftPositionThumbLeft + '%';


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

    
        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - leftDifference;

            if (newPos < 0) {
                newPos = 0;
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
            field_range.style.left = leftPositionThumbLeft + '%';
            
        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
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
     },

    enterInputRight: valueOutputRight.oninput = function() {
        thumbRight.style.left = (valueOutputRight.value/valueOutputRight.max) * 92.5 + '%';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
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
     },
}