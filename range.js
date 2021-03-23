const thumb = document.querySelector('.thumb');
const thumbLeft = document.getElementById('thumbLeft');
const thumbRight = document.getElementById('thumbRight');
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
    eventThumbLeft: thumbLeft.onmousedown = function(event) {
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

    },

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