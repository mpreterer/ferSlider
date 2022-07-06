# MetaLamp Task 4 step 
### Задане выполнено для компании MetaLamp
Демо страница
[ferSlider](https://mpreterer.github.io/ferSlider/)

На странице расположены слайдеры с панелями для их настройки
---
### Распаковка
Клонировать
>```git clone https://github.com/mpreterer/ferSlider.git```

Установить
>```npm i```
---

Запустить webpack server
>```npm run start```
---

Запустить production build
>```npm run build```
---

Запустить тесты
>```npm run test```
---

## Настройки
| Название   | Тип  | Значение по умолчанию | Описание |
| :-: | :-: | :-: | :-: | :-: |
| minValue | number | 0 | Задает минимальное значение слайдера |
| maxValue | number | 1000 | Задает максимальное значение слайдера |
| valueFrom | number | 50 | Задает значение для первого ползунка  |
| valueTo | number | 100 | Задает значение для второго ползунка  |
| step | number | 1 | Задает шаг для значений слайдера |
| isRange | boolean | false | Задает количество отображаемых ползунков. false - один, true - два |
| isVertical | boolean | false | Задает горизонтальный или вертикальный вид слайдера. Для горизонтального значение - false, для вертикального - true |
| isBarRange | boolean | true | Задает отображение прогресс бара слайдера |
| isTip | boolean | true | Задает отображение подсказки у ползунков слайдера |
| isStep | boolean | true | Задает отображение шкалы значений слайдера |

 **Настройки по умолчанию:**
  > ```js
  > const defaultOptions = {
  >   minValue: 0,
  >   maxValue: 1000,
  >   step: 1,
  >   valueFrom: 50,
  >   valueTo: 100,
  >   isRange: false,
  >   isTip: true,
  >   isBarRange: true,
  >   isVertical: false,
  >   isStep: true
  >};
  > ```

## Использование
1) Подключить jQuery и плагин:
```
import "./index.js";
import $ from "jquery";
```
2) С помощью jQuery выбрать нужный элемент-контейнер и вызвать на нем функцию ferSlider:
```
$('.sliderContainer').ferSlider({settings});
```
В settings можно добавить нужные настройки

## Использованные библиотеки
* [jQuery ^3.6.0](https://github.com/jquery/jquery),
* [decko ^1.2.0](https://www.npmjs.com/package/decko),

## UML-диаграмма плагина
<img src=https://github.com/mpreterer/ferSlider/blob/master/UML.png alt="plugin UML"></img>

