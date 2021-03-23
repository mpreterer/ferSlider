// let qwe:string = "TS";

// let a = 1;

// type N = {a:number } | { c:string };

// type N1 = { a:string } & { b:string};

// // let p: (number | string)[] = (0,'qwe');
// let data = 1;

// enum G {
//     A = data,
//     B = data
// };

// class Test {
//     _name: string = 'David'
//     _age: number = 123

//     constructor(name: string, age:number) {
//         this._name = name
//         this._age = this._age
//     }

//     sayH(): string {
//         return `Хей ты, тебя зовут ${this._name}`
//     }
// }

// class Person {
//     name: string = ''
//     age: number = 0

//     constructor(name: string, age:number) {
//         this.name = name
//         this.age = age
//     }
// }

// class Student extends Person {
//     group: string = ''
//     course: number = 0

//     constructor(name: string, age: number, group: string, course: number) {
//         super(name, age)
//     }
// }

type A<T> = T
type B = A<string>
type C = A<'Hi'>
type D = A<number>

type MyArray<T> = T[]
const arr: MyArray<string> = ['hi', 'ts']

// function echo<T>(x: T): T {
//     return x
// } 

// const echo = <T>(x: T): T => {
//     return x;
// }

const echo: <T>(x: T) => T = <T>(x: T):T => {
    return x;
}

// const result = echo('Hi TS')
const result = echo<string>('Hi TS')

class List<T> {
    elements: T[] = []

    add(element: T) {
        this.elements.push(element)
    }
}

const list = new List<string>()
list.add('Huy')
list.add('qwe')
// list.add(12)
