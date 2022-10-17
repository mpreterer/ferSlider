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

Запустить eslint
>```npm run eslint```
---

Запустить фикс eslint
>```npm run eslint:fix```
---

Запустить stylelint
>```npm run stylelint```
---

Запустить фикс стилей
>```npm run stylelint:fix```
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

## API
* subscribe: (eventName: SliderEvents, callback: Function) => void;

Это публичный метод, подписывающий переданную callback функцию на наблюдаемый эвент типа SliderEvents = "updateSettings" | "updateValues".

"updateSettings" - вызывается при каждом обновлении настройки слайдера; "updateValues" - вызывается при каждом обновлении valueFrom и valueTo значений слайдера;

Создаем слайдер
```
$('.slider').FerSlider();
```

Сохраняем инстанс слайдера
```
const dataSlider = $('.slider').data("FerSlider");
```

Создаем callback функцию
```
function viewValues ({ handle, value }) {
  console.log(`Ползунок: ${handle}, значение: ${value}`);
}
```

Используем публичный метод
```
dataSlider.subscribe('updateValues', ({ handle, value }) => {
  viewValues({ handle, value })
});

dataSlider.subscribe('updateSettings', (settings) => {
  console.log(settings);
});
```

* unsubscribe: (eventName: SliderEvents, callback: Function) => void;

Это публичный метод, отписывающий переданную callback функцию от переданного эвента типа SliderEvents = "updateSettings" | "updateValues".

## Использованные библиотеки
* [jQuery ^3.6.0](https://github.com/jquery/jquery),
* [decko ^1.2.0](https://www.npmjs.com/package/decko),

## Дополнительные используемые технологии
* [Node.js v14.17.1](https://nodejs.org/ru),
* [npm ^6.14.13](https://www.npmjs.com),

**Проект написан с использованием паттерна MVC с Passive View**

* **Controller** Является посредником между View и Model. Controller знает всё о слоях Model и View, и он подписан на них. При изменении во View, Controller получает изменения и обновляет Model. Так же Model через Controller передает данные во View.

* **Model** Содержит всю бизнес-логику. Ничего не знает о слоях Controller и View. Model наследуется от класса Observer.

* **View** Отвечает за отоброжение элементов и является интерфейсом пользователя. View ничего не знает о слоях Controller и Model. View также, наследуется от класса Observer.

* **Observer** Является наблюдаемым объектом. На него можно подписаться, отписаться, либо уведомить тех кто подписан об изменениях. С помощью Observer, Model уведомляет, что он изменился. Так же как и View уведомляет, что он изменился.

* **ferSlider** Является JQuery обёрткой Controller'а. Необходим для подключения плагина.

* **Range, Bar, Step, Thumb, Tip** Это компоненты слайдера.

## UML-диаграмма плагина
<img src=https://github.com/mpreterer/ferSlider/blob/master/UML.png alt="plugin UML"></img>

