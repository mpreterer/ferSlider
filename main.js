// let qwe:string = "TS";
var arr = ['hi', 'ts'];
// function echo<T>(x: T): T {
//     return x
// } 
// const echo = <T>(x: T): T => {
//     return x;
// }
var echo = function (x) {
    return x;
};
// const result = echo('Hi TS')
var result = echo('Hi TS');

var List = /** @class */ (function () {
    function List() {
        this.elements = [];
    }
    List.prototype.add = function (element) {
        this.elements.push(element);
    };
    return List;
}());

var list = new List();

list.add('Huy');

list.add('qwe');
// list.add(12)

// interface towList<T> {
//     elements
// }
