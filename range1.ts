// ;(function($) {

    const thumb = <HTMLElement>document.querySelector('.thumb');
    const thumbLeft = <HTMLElement>document.querySelector('.thumbLeft');
    const thumbRight = <HTMLElement>document.querySelector('.thumbRight');
    const field_range = <HTMLElement>document.querySelector('.field_range');
    const fieldOneRange = <HTMLElement>document.querySelector('.field_range');
    const range = <HTMLElement>document.querySelector('.range');
    const containerRange = <HTMLElement>document.querySelector('.container_range');
    var valueOutputLeftHTML = <HTMLElement>document.getElementById('valueLeft');
    var valueOutputRightHTML = <HTMLElement>document.getElementById('valueRight');
    // var valueOutputLeftSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueLeft')).step);
    // var valueOutputRightSteps:number = parseInt((<HTMLInputElement>document.getElementById('valueRight')).step);
    var valueOutputLeft = <HTMLInputElement>document.getElementById('valueLeft');
    var valueOutputRight = <HTMLInputElement>document.getElementById('valueRight');
    var valueTopL = <HTMLInputElement>document.querySelector('.valueTopLeft'); // цифры сверху
    var valueTopR = <HTMLInputElement>document.querySelector('.valueTopRight'); // цифры сверху
    const btnTip = <HTMLElement>document.getElementById('btnTip'); // Кнопка для tip
    const bar = <HTMLElement>document.getElementById('bar');
    var minimum = <HTMLInputElement>document.getElementById('minimum'); // минимум
    var minimumEvent = <HTMLElement>document.getElementById('minimum'); // минимум
    var maximum = <HTMLInputElement>document.getElementById('maximum'); // максимум
    var maximumEvent = <HTMLElement>document.getElementById('maximum'); // максимум
    const thumbTop = <HTMLElement>document.querySelector('.thumbTop'); // верхний ползунок вертикального слайдера
    const containerVR = <HTMLElement>document.querySelector('.container_range_vertical'); // вертикальный слайдер
    const fieldRangeVR = <HTMLElement>document.querySelector('.field_range_vertical'); // внутри вертикального салйдера
    var step = parseInt((<HTMLInputElement>document.getElementById('valueSteps')).value); //шаг
    var stepEvent = <HTMLElement>document.getElementById('valueSteps'); //шаг
    const filedSteps = <HTMLElement>document.querySelector('.stepsIn');
    const fieldStepsOut = <HTMLElement>document.querySelector('.steps');
    const startStep = <HTMLElement>document.querySelector('.startStep');
    const endStep = <HTMLElement>document.querySelector('.endStep');
    const typeRange = <HTMLElement>document.querySelector('.typeRange');
    
    let leftDifference = parseInt(getComputedStyle(containerRange).marginLeft); // чтобы не смещались ползунки
    let offLeft = containerRange.offsetLeft;
    let widthThumb = parseInt(thumb.style.width) / 10; 
    var valueLeft = parseInt(thumbLeft.style.left);
    var valueRight = parseInt(thumbRight.style.left);
    var widthRange = parseInt(getComputedStyle(range).width);
    const stopMax = parseInt((<HTMLInputElement>document.getElementById('valueRight')).max);
    
    valueOutputLeft.value = '' + Math.round(((parseInt(thumbLeft.style.left) - 3) * (parseInt(valueOutputLeft.max))/100));
    valueOutputRight.value = '' + Math.round(((parseInt(thumbRight.style.left) + 3) * (parseInt(valueOutputRight.max))/100));

    
    field_range.style.left = valueLeft + '%';
    field_range.style.width = valueRight - valueLeft + widthThumb + '%';
    
    valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
    valueTopL.innerHTML = `${(parseFloat(valueOutputLeft.value))}`;
    valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
    valueTopR.innerHTML = `${(parseFloat(valueOutputRight.value))}`;

    minimum.value = minimum.min;
    maximum.value = maximum.max;

    
    var tip = {
        valueTopL: 
            valueOutputLeftHTML.addEventListener('keyup', () => {
            valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
            valueTopL.innerHTML = `${(parseFloat(valueOutputLeft.value))}`;
        }),
    
        valueTopR: 
            valueOutputRightHTML.addEventListener('keyup', () => {
            valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
            valueTopR.innerHTML = `${(parseFloat(valueOutputRight.value))}`;
        }),
    
        // вкл/выкл 
        buttonTip:
          btnTip.addEventListener('click', () => {
            if (valueTopL.classList.contains('hidden')) {
                
                if (thumbLeft.classList.contains('hidden') && valueTopR.classList.contains('hidden')) {
                    valueTopR.classList.remove('hidden');
                    range.setAttribute('tip','on')
                }

                else if (thumbLeft.classList.contains('hidden')) {
                    valueTopR.classList.add('hidden');
                    range.setAttribute('tip','off') 
                }

                else if (!thumbLeft.classList.contains('hidden') && !thumbRight.classList.contains('hidden')) {
                    valueTopR.classList.remove('hidden');
                    valueTopL.classList.remove('hidden');
                    range.setAttribute('tip','on')
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
    
    
    var moveClickFieldRange = {
        move:
            field_range.addEventListener('click', function(event) {
                event.preventDefault();
                let tl = thumbLeft.getBoundingClientRect().left; // margin от левого ползунка до конца страницы по левую сторону
                let tr = thumbRight.getBoundingClientRect().left; // аналогично с правой 
                let newPosMove = ((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width));

            if (event.target == field_range) {
                if  (tr - event.clientX > event.clientX - tl) {
                    thumbRight.style.left = `${newPosMove * 100 + '%'} `;
                    field_range.style.width = `${parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%'}`;
                    
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((newPosMove  * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = `${parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min)}`;
                    // Значения сверху
                    valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                    valueTopR.innerHTML = `${parseFloat(valueOutputRight.value)}`;

                    valueTopL.style.zIndex = '98';
                    thumbLeft.style.zIndex = '98';

                    valueTopR.style.zIndex = '99';
                    thumbRight.style.zIndex = '99';

                } else {
                    thumbLeft.style.left = `${((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width)) * 100 + '%'}`
                    field_range.style.width = `${parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%'}`;
                    field_range.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';

                    // преобразуем в значения
                    valueOutputLeft.value = '' + Math.round((newPosMove  * 104.168) * (parseInt(valueOutputLeft.max)) / 100);
                    // Добавляем минимум
                    valueOutputLeft.value = `${parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min)}`;
                    // Значения сверху
                    valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                    valueTopL.innerHTML = `${parseFloat(valueOutputLeft.value)}`;

                    valueTopR.style.zIndex = '98';
                    valueTopL.style.zIndex = '99';

                    thumbLeft.style.zIndex = '99';
                    thumbRight.style.zIndex = '98';
                }
            }
            
        }),

    }

    var moveCLickRange = {
        move:
            range.addEventListener('click', function(event) {
                event.preventDefault(); // отключаем поведение по умолчанию

                let tl = thumbLeft.getBoundingClientRect().left; // margin от левого ползунка до конца страницы по левую сторону
                let tr = thumbRight.getBoundingClientRect().left; // аналогично с правой 
                let posAfterThumbR = (event.clientX - leftDifference - ((parseInt(thumbRight.style.left) * widthRange) / 100)); // позиция после правого ползунка
                let posAfterThumbL = (event.clientX - leftDifference - ((parseInt(thumbLeft.style.left) * widthRange) / 100)); // позиция перед левым ползунком

            if (event.target == range) { 
                if (posAfterThumbR < posAfterThumbL) {
                    thumbRight.style.left = `${parseInt(thumbRight.style.left) + ((posAfterThumbR * 100) / widthRange) + '%'}`;
                
                    field_range.style.width = `${parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + widthThumb + '%'}`;
                    // преобразуем в значения 
                    valueOutputRight.value = '' + Math.round((((event.clientX - leftDifference) / parseFloat(getComputedStyle(range).width))  * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                    // Добавляем минимум
                    valueOutputRight.value = `${parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min)}`;
                    // Значения сверху
                    valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
                    valueTopR.innerHTML = `${parseFloat(valueOutputRight.value)}`;

                    valueTopL.style.zIndex = '98';
                    valueTopR.style.zIndex = '99';
                }
            }

        })
    }
    
    var steps = {
        enterSteps:
            stepEvent.addEventListener('input', (event) => {
                let maxValue = parseInt((<HTMLInputElement>document.getElementById('valueRight')).max); // максимум 
                let steps = parseInt((<HTMLInputElement>document.getElementById('valueSteps')).value); // заданный шаг
                var valueLabel = maxValue/steps; // кол-во делений
                filedSteps.innerHTML = ''; // очишаем прошлые шаги
                startStep.innerHTML = '';
                endStep.innerHTML = '';
                valueOutputLeft.step = `${step}`;
                valueOutputRight.step = `${step}`;
                (<HTMLInputElement>document.getElementById('valueRight')).step = `${step}`;
    
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
            minimumEvent.addEventListener('input', () => {
                
                valueOutputLeft.min = `${parseInt(minimum.value)}`;
                valueOutputRight.min = `${parseInt(minimum.value)}`;
                minimum.min = minimum.value;

                // переставляем ползунок в начало
                valueOutputLeft.value = minimum.min;

                thumbLeft.style.left = 1 + '%';
                valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
                valueTopL.innerHTML = `${(parseFloat(valueOutputLeft.value))}`;
                field_range.style.left = 0 + '%';
                field_range.style.width = `${parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left) + '%'}`;


                // Меняем максимум под минимальное значеие так чтобы он остался прежним
                // p.s. в инпуте всегда прибавляется минимум
                // прибавляем к максимум если min < 0 & вычитаем из максимума если min > 0
                if (parseInt(minimum.value) < 0) {
                    valueOutputRight.max = `${parseInt(maximum.value) + (parseInt(minimum.value) * -1)}`
                    valueOutputLeft.max = `${parseInt(maximum.value) + (parseInt(minimum.value) * -1 )}`
                } else {
                    valueOutputRight.max = `${parseInt(maximum.value) - parseInt(minimum.value)}`
                    valueOutputLeft.max = `${parseInt(maximum.value) - parseInt(minimum.value)}`
                }
                
                if (parseInt(minimum.min) > parseInt(maximum.max)) {
                    maximum.value = `${parseInt(minimum.value) + 1}`;
                    valueOutputRight.max =  `${parseInt(maximum.value) + 1}`;
                    valueOutputLeft.max = `${parseInt(maximum.value) + 1}`;

                    if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
                        valueOutputRight.value = maximum.value;
                        thumbRight.style.left = 95 + '%';
                        thumbLeft.style.left = 1 + '%';
                    }
                }
    
                if (parseInt(minimum.value) == NaN || minimum.value == '') {
                    valueOutputLeft.min = "" + 0;
                }
            }),
        
        enterMaximum:
            maximumEvent.addEventListener('input', () => {

                if (parseInt(minimum.value) < 0) {
                    valueOutputRight.max = `${parseInt(maximum.value) + (parseInt(minimum.value) * -1)}`
                    valueOutputLeft.max = `${parseInt(maximum.value) + (parseInt(minimum.value) * -1)}`
                } else {
                    valueOutputRight.max = `${parseInt(maximum.value) - parseInt(minimum.value)}`
                    valueOutputLeft.max = `${parseInt(maximum.value) - parseInt(minimum.value)}`
                }

                // valueOutputRight.max = `${maximum.value}`;
    
                if (maximum.value == null || parseInt(maximum.value) == NaN) {
                    valueOutputRight.max = "" + stopMax;
                }
            }),
    
    
        oneRange:
            //одинарный слайдер
            typeRange.addEventListener('click', () => {
                thumbLeft.style.left = 0 + '%';
                field_range.style.width = `${parseInt(thumbRight.style.left) - parseInt(thumbLeft.style.left)}`;
                // Убираем левый ползунок и заполняем field range else добавляем ползунок обратно
                if (thumbLeft.classList.contains('hidden')) {
                    thumbLeft.classList.remove('hidden');
                    valueTopL.classList.remove('hidden');
                    valueTopR.classList.remove('hidden');
                    valueOutputLeft.value = '0'
                } else {
                    thumbLeft.classList.add('hidden');
                    valueTopL.classList.add('hidden');
                    valueTopL.innerHTML = '0'
                    valueTopL.style.left = 0 + '%'
                    field_range.style.width = parseInt(thumbRight.style.left) + 2 + '%';
                    field_range.style.left = 0 + '%';
                    valueOutputLeft.value = '0'
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
            thumbLeft.style.zIndex = '99';
            valueTopL.style.zIndex = '99';

            valueTopR.style.zIndex = '98';
            thumbRight.style.zIndex = '0';
    
            function nowMouseMove(event:MouseEvent) {
                let newPos = event.clientX - shiftX - leftDifference;     
                let rightEdge = range.offsetWidth - thumbLeft.offsetWidth;
                // сделаем чтобы не выходили за рамки ползунки

                // if (newPos < parseInt(valueOutputLeft.min)) {
                //     newPos = parseInt(valueOutputLeft.min);
                // }
                if (newPos < 0) {
                    newPos = 0;
                }

                // Если левый ползунок пытается быть больше правого
                if (newPos / parseFloat(getComputedStyle(range).width) * 100 >= parseFloat(thumbRight.style.left) || parseInt(valueOutputLeft.value) >= parseInt(valueOutputRight.value)) {
                    newPos = ((parseFloat(thumbRight.style.left) * parseFloat(getComputedStyle(range).width)) / 100) - 0.1
                 }

                if (newPos > rightEdge) {
                    newPos = rightEdge;
                  }
                
                // Перемещение ползунка
                thumbLeft.style.left = (newPos / parseInt(getComputedStyle(range).width))  * 100 + '%';
                
            // Заполнение инпутов. преобразуем из % в целые значения инпутов
            valueOutputLeft.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputLeft.max)) / 100);
            // настройка минимума
            valueOutputLeft.value = `${parseInt(valueOutputLeft.value) + parseInt(valueOutputLeft.min)}`;
            // Верхние значения
            valueTopL.style.left = parseInt(thumbLeft.style.left) + 0.7 + '%';
            valueTopL.innerHTML = `${parseFloat(valueOutputLeft.value)}`;
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
            thumbRight.style.zIndex = '99';
            valueTopR.style.zIndex = '99';

            valueTopL.style.zIndex = '98';
            thumbLeft.style.zIndex = '0';
        
            function nowMouseMove(event:MouseEvent) {
                let newPos = event.clientX - shiftX - leftDifference;
                let rightEdge = range.offsetWidth - thumbRight.offsetWidth;

                if (newPos > rightEdge) {
                    newPos = rightEdge;
                }

                if (newPos / parseFloat(getComputedStyle(range).width) * 100 <= parseFloat(thumbLeft.style.left) || parseInt(valueOutputRight.value) <= parseInt(valueOutputLeft.value)) {
                    newPos = ((parseFloat(thumbLeft.style.left) * parseFloat(getComputedStyle(range).width)) / 100) + 0.1;
                }

                thumbRight.style.left = (newPos / parseInt(getComputedStyle(range).width)) * 100 + '%' // переводим в % range
               // преобразуем в значения
                valueOutputRight.value = '' + Math.round((newPos / parseInt(getComputedStyle(range).width) * 104.168) * (parseInt(valueOutputRight.max)) / 100);
                // Добавляем минимум
                valueOutputRight.value = `${parseInt(valueOutputRight.value) + parseInt(valueOutputLeft.min)}`;
                // Значения сверху
              valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
              valueTopR.innerHTML = `${parseFloat(valueOutputRight.value)}`;
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
                // biss=false;
            }
        },
    
        enterInputLeft: valueOutputLeftHTML.oninput = function() {
            // Выстраиваем числовые значения в инпутах
            // 92 и 5 т.к. field range заполняется всего на 92 процента
            thumbLeft.style.left = (parseFloat(valueOutputLeft.value)/parseInt(valueOutputLeft.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
            field_range.style.left = parseInt(thumbLeft.style.left) + '%';
            // Если значение введено больше максимального 
            if ((parseFloat(valueOutputLeft.value)) > parseInt(valueOutputLeft.max)) {
                valueOutputLeft.value = `${parseInt(valueOutputLeft.max)}`;
                thumbRight.style.left = ((parseFloat(valueOutputRight.value))/parseInt(valueOutputRight.max)) * 92.5 + '%';
                field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
            }

            if (parseInt(valueOutputLeft.value) > parseInt(valueOutputRight.value)) {
                valueOutputLeft.value = valueOutputRight.value;
                thumbLeft.style.zIndex = '99';
                thumbLeft.style.left = thumbRight.style.left;
                field_range.style.width = 0 + '%';
            }
    
            valueTopL.style.left = parseInt(thumbLeft.style.left) + 1 + '%';
            valueTopL.innerHTML = `${(parseFloat(valueOutputLeft.value))}`;
         },
    
        enterInputRight: valueOutputRightHTML.oninput = function() {
            thumbRight.style.left = ((parseFloat(valueOutputRight.value))/parseInt(valueOutputRight.max)) * 92.5 + '%';
            field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
            field_range.style.left = parseInt(thumbLeft.style.left) + '%';
            // Если значение введено больше максимального 
            if ((parseFloat(valueOutputRight.value)) > parseInt(valueOutputRight.max)) {
                valueOutputRight.value = `${parseInt(valueOutputRight.max)}`;
                thumbRight.style.left = ((parseFloat(valueOutputRight.value))/parseInt(valueOutputRight.max)) * 92.5 + '%';
                field_range.style.width = parseInt(thumbRight.style.left)-parseInt(thumbLeft.style.left) + widthThumb + '%';
            }

            if (parseInt(valueOutputRight.value) < parseInt(valueOutputLeft.value)) {
                valueTopR.innerHTML = valueOutputLeft.value;
                thumbRight.style.left = thumbLeft.style.left;
                field_range.style.width = '0%';
            }
    
            valueTopR.style.left = parseInt(thumbRight.style.left) + 1 + '%';
            valueTopR.innerHTML = `${(parseFloat(valueOutputRight.value))}`;
         },
    }

    
    var verticalRange = {
    
        thumbTop: 
            thumbTop.addEventListener('mousedown', (event:MouseEvent) => {
                event.preventDefault();
                let shiftY = event.clientY - thumbTop.getBoundingClientRect().top;
                document.addEventListener('mousemove', nowMouseMove);
                document.addEventListener('mouseup', nowMouseUp);
                document.addEventListener('mousemove', changeWidth);
    
    
                function nowMouseMove(event:MouseEvent) {
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
                  valueOutputRight.value = '' + Math.round((newPosVertical / parseInt(getComputedStyle(containerVR).height) * 109.9) * (parseInt(valueOutputRight.max)) / 100);
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