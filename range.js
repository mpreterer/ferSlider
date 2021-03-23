const thumbLeft = document.getElementById('thumbLeft');
const field_range = document.querySelector('.field_range');
const range = document.querySelector('.range');
const containerRange = document.querySelector('.container_range');

var module = {

    eventRange: thumbLeft.onmousedown = function(event) {
        event.preventDefault();
        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mousemove', changeWidth);
        document.addEventListener('mouseup', nowMouseUp);

        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX - 34;
            thumbLeft.style.left = newPos + 'px';

            if (newPos < 0) {
                newPos = 0;
              }
              let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
              if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            thumbLeft.style.left = newPos + 'px';
           
        }
        function changeWidth() {
            let x = parseInt(thumbLeft.style.left);
            console.log(field_range);
        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
        }
    }
}