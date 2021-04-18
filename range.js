const thumb = document.querySelector('.thumb');
const thumbLeft = document.querySelector('.thumbLeft');
const thumbRight = document.querySelector('.thumbRight');
const field_range = document.querySelector('.field_range');
const range = document.querySelector('.range');
const containerRange = document.querySelector('.container_range');
const valueOutputLeft = document.getElementById('valueLeft');
const valueOutputRight = document.getElementById('valueRight');

var steps = 1; // шаг
let leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
let offLeft = containerRange.offsetLeft;
let widthThumb = parseInt(thumb.style.width) / 10; 
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
field_range.style.left = valueLeft + '%';
field_range.style.width = valueRight - valueLeft + widthThumb + '%';



var controller = {
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

            if(parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
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

          valueOutputLeft.value = Math.round((newPos / parseInt(getComputedStyle(range).width) * 100)); // преобразуем в значения
            


           
            //  var _this = inputLeft,
		    // min = parseInt(_this.min),
		    // max = parseInt(_this.max);
        	// _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
        	// var percent = ((_this.value - min) / (max - min)) * 100;
	        // thumbLeft.style.left = percent + "%";

        }


        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width) / 10;
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.width = (leftPositionThumbRight-leftPositionThumbLeft) + widthThumb +'%';
            field_range.style.left = leftPositionThumbLeft + '%';

            // _thisL = valueOutputLeft;
            // _thisR = valueOutputRight;

            // min = _thisL.min;
            // max = _thisL.max;
            // _thisL.value = Math.min(parseInt(_thisL.value), parseInt(valueOutputRight.value) - 1);
            // percent = _thisL.value / (max - min) * 100;
            // percentWidth = _thisR.value - _thisL.value / _thisL.max * 100;

            
            // field_range.style.left = percent + '%';
            // field_range.style.width = percentWidth + '%';


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
            // value add
          valueOutputRight.value = Math.round((newPos / parseInt(getComputedStyle(range).width) * 100)); // преобразуем в значения

           
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
        thumbLeft.style.left = (valueOutputLeft.value/valueOutputLeft.max) * 100 + '%';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
        field_range.style.left = parseInt(thumbLeft.style.left) + '%';
     },

    enterInputRight: valueOutputRight.oninput = function() {
        thumbRight.style.left = valueOutputRight.value + 'px';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb +'px';
        field_range.style.left = parseInt(thumbLeft.style.left) + 'px';
     },
       
        
    

}