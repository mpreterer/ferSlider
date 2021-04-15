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
let widthThumb = parseInt(thumb.style.width); 
var valueLeft = parseInt(thumbLeft.style.left);
var valueRight = parseInt(thumbRight.style.left);
field_range.style.left = valueLeft + 'px';
field_range.style.width = valueRight - valueLeft + widthThumb + 'px';



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

            _thisL = valueOutputLeft;
            _thisR = valueOutputRight;

            min = _thisL.min;
            max = _thisL.max;
            _thisL.value = Math.min(parseInt(_thisL.value), parseInt(valueOutputRight.value) - 1);
            percent = _thisL.value / (max - min) * 100;
            percentWidth = _thisR.value - _thisL.value / _thisL.max * 100;
            thumbLeft.style.left  = percent + '%';
            field_range.style.left = percent + '%';
            field_range.style.width = percentWidth + '%';


            let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            // сделаем чтобы не выходили за рамки ползунки
            if (newPos < 0) {
                newPos = 0;
              }

            if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            if(parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
                thumbLeft.style.left = parseInt(thumbLeft.style.left) - 5 + 'px';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                document.addEventListener('mouseup', nowMouseUp);
                thumbLeft.style.left = newPos + 'px';
            }

        // valueOutputLeft.value = parseFloat(thumbLeft.style.left);


           
            //  var _this = inputLeft,
		    // min = parseInt(_this.min),
		    // max = parseInt(_this.max);
        	// _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
        	// var percent = ((_this.value - min) / (max - min)) * 100;
	        // thumbLeft.style.left = percent + "%";

        }


        function changeWidth() {
            // let widthThumb = parseInt(thumb.style.width);
            // var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            // var leftPositionThumbRight = parseInt(thumbRight.style.left);

            // field_range.style.left = leftPositionThumbLeft + 'px';
            // field_range.style.width = leftPositionThumbRight - leftPositionThumbLeft + widthThumb + 'px';
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
                thumbRight.style.left = parseInt(thumbLeft.style.left) + 1 + 'px';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                thumbRight.style.left = newPos + 'px';
                document.addEventListener('mouseup' , nowMouseUp);
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
            }
            // value add
          valueOutputRight.value = newPos;

           
        }

        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width);
            let leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            let leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.width = (leftPositionThumbRight-leftPositionThumbLeft) + widthThumb +'px';
            field_range.style.left = leftPositionThumbLeft + 'px';
            
        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
            document.removeEventListener('mousemove', changeWidth);
        }
    },

    enterInputLeft: valueOutputLeft.oninput = function() {
        thumbLeft.style.left = valueOutputLeft.value + 'px';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb +'px';
        field_range.style.left = parseInt(thumbLeft.style.left) + 'px';

        // Оттакливаемся от значений в input
        // _this = valueOutputLeft;
        // min = _this.min;
        // max = _this.max;

        // inputValue = _this.value / (max - min) * 100;
     },

    enterInputRight: valueOutputRight.oninput = function() {
        thumbRight.style.left = valueOutputRight.value + 'px';
        field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb +'px';
        field_range.style.left = parseInt(thumbLeft.style.left) + 'px';
     },
       
        
    

}