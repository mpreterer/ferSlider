const thumb = document.querySelector('.thumb');
const thumbLeft = document.querySelector('.thumbLeft');
const thumbRight = document.querySelector('.thumbRight');
const field_range = document.querySelector('.field_range');
const range = document.querySelector('.range');
const containerRange = document.querySelector('.container_range');
const valueOutputLeft = document.getElementById('valueLeft');


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
        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left;        

        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        

        function nowMouseMove(event) {
            let newPos = event.clientX - shiftX;
            let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            
            if (newPos < 0) {
                newPos = 0;
              }

            if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            if(parseInt(thumbLeft.style.left) >= parseInt(thumbRight.style.left)) {
                thumbLeft.style.left = thumbRight.style.left - 1 + 'px';
                document.removeEventListener('mouseup' , nowMouseUp);
                document.removeEventListener('mousemove', nowMouseMove);
                document.removeEventListener('mousemove', changeWidth);
            } else {
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mousemove', changeWidth);
                document.addEventListener('mouseup', nowMouseUp);
                thumbLeft.style.left = newPos + 'px';
            }


           
            //  var _this = inputLeft,
		    // min = parseInt(_this.min),
		    // max = parseInt(_this.max);
        	// _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
        	// var percent = ((_this.value - min) / (max - min)) * 100;
	        // thumbLeft.style.left = percent + "%";

        }


        function changeWidth() {
            let widthThumb = parseInt(thumb.style.width);
            var leftPositionThumbLeft = parseInt(thumbLeft.style.left);
            var leftPositionThumbRight = parseInt(thumbRight.style.left);

            field_range.style.left = leftPositionThumbLeft + 'px';
            field_range.style.width = leftPositionThumbRight - leftPositionThumbLeft + widthThumb + 'px';
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
            var newPos = event.clientX - shiftX;

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

}