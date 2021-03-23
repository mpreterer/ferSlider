var module = {
    thumbLeft: document.getElementById('thumbLeft'),
    field_range: document.querySelector('.field_range'),
    slider: document.querySelector('.range'),
    containerRange: document.querySelector('.container_range'),


    eventRange: thumbLeft.onmousedown = function(event) {
        event.preventDefault();

        let shiftX = event.clientX - thumbLeft.getBoundingClientRect().left;
        document.addEventListener('mousemove', nowMouseMove);
        document.addEventListener('mouseup', nowMouseUp);

        function nowMouseMove(event) {
            var newPos = event.clientX - shiftX;
            // console.log(newPos);
            thumbLeft.style.left = newPos + 'px';

            if (newPos < 0) {
                newPos = 0;
              }
              let rightEdge = slider.offsetWidth - thumbLeft.offsetWidth;
              if (newPos > rightEdge) {
                newPos = rightEdge;
              }

            thumbLeft.style.left = newPos + 'px';
        }

        function nowMouseUp() {
            document.removeEventListener('mouseup' , nowMouseUp);
            document.removeEventListener('mousemove', nowMouseMove);
        }
    }
}