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
| :-: | :-: | :-: | :-: |
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
  > const defaultSettings = {
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

**Проект написан с использованием паттерна MVC с Passive View**

* **Controller** Является посредником между View и Model. Controller знает всё о слоях Model и View, и он подписан на них. При изменении во View, Controller получает изменения и обновляет Model. Так же Model через Controller передает данные во View.

* **Model** Содержит всю бизнес-логику. Ничего не знает о слоях Controller и View. Model наследуется от класса Observer.

* **View** Отвечает за отоброжение элементов и является интерфейсом пользователя. View ничего не знает о слоях Controller и Model. View также, наследуется от класса Observer.

* **Observer** Является наблюдаемым объектом. На него можно подписаться, отписаться, либо уведомить тех кто подписан об изменениях. С помощью Observer, Model уведомляет, что он изменился. Так же как и View уведомляет, что он изменился.

* **ferSlider** Является JQuery обёрткой Controller'а. Необходим для подключения плагина.

* **Range, Bar, Step, Thumb, Tip** Это компоненты слайдера.

## UML-диаграмма плагина
<img src=https://github.com/mpreterer/ferSlider/blob/master/UML.png alt="plugin UML"></img>

