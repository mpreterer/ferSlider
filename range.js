const thumb = document.querySelector('.thumb');
const thumbLeft = document.querySelector('.thumbLeft');
const thumbRight = document.querySelector('.thumbRight');
const field_range = document.querySelector('.field_range');
const range = document.querySelector('.range');
const containerRange = document.querySelector('.container_range');


// var View = {

// }
let widthThumb = parseInt(thumb.style.width);
var p = parseInt(thumbLeft.style.left);
var p1 = parseInt(thumbRight.style.left);
field_range.style.left = p + 'px';
field_range.style.width = p1 - p + widthThumb + 'px';

var module = {
    eventThumbLeft: document.querySelectorAll('.thumbLeft').forEach(thumbLeft => { 
        thumbLeft.addEventListener('mousedown', (event)=>  {
        event.preventDefault();
        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left;

        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);
        

        function nowMouseMove(event) {
            let newPos = event.clientX - shiftX;
            let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
            thumbLeft.style.left = newPos + 'px';

            if (newPos < 0) {
                newPos = 0;
              }

            if (newPos > rightEdge) {
                newPos = rightEdge;
              }


            thumbLeft.style.left = newPos + 'px';
              console.log(event.tagName)
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

    });
}),

    eventThumbRight: thumbRight.onmousedown = function(event) {
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

              thumbRight.style.left = newPos + 'px';
           
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