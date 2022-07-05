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
| Название  | Дата-атрибут | Тип  | Значение по умолчанию | Описание |
| :-: | :-: | :-: | :-: | :-: |
| minValue | data-min | number | 0 | Задает минимальное значение слайдера |
| maxValue | data-max | number | 1000 | Задает максимальное значение слайдера |
| valueFrom | data-from | number | 50 | Задает значение для первого ползунка  |
| valueTo | data-to | number | 100 | Задает значение для второго ползунка  |
| step | data-step | number | 1 | Задает шаг для значений слайдера |
| isRange | data-type | boolean | false | Задает количество отображаемых ползунков. false - один, true - два |
| isVertical | data-orientation | boolean | false | Задает горизонтальный или вертикальный вид слайдера. Для горизонтального значение - false, для вертикального - true |
| isBarRange | data-with-range | boolean | true | Задает отображение прогресс бара слайдера |
| isTip | data-with-thumb | boolean | true | Задает отображение подсказки у ползунков слайдера |
| isStep | data-with-scale | boolean | true | Задает отображение шкалы значений слайдера |

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

## UML-диаграмма плагина
<img src=https://github.com/mpreterer/ferSlider/blob/master/UML.png alt="plugin UML"></img>

## Использованные библиотеки
* [jQuery ^3.6.0](https://github.com/jquery/jquery),
* [decko ^1.2.0](https://www.npmjs.com/package/decko),