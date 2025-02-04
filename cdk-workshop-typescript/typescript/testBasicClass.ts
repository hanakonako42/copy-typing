// export class Person {
//     firstName?: string;
//     lastName?: string;

//     greet() {
//         console.log(`私は${this.firstName} ${this.lastName}です。`);
//     }
// };

// const taro = new Person();

// taro.firstName = "AWS";
// taro.lastName = "太郎";

// console.log(taro.firstName + taro.lastName);
// taro.greet();

export class Person {
    firstName: string;
    lastName: string;

    constructor(firstName = "AWS", lastName = "太郎") {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    greet() {
        console.log(`私は${this.firstName} ${this.lastName}です。`);
        return `私は${this.firstName} ${this.lastName}です。`;
    }
}

const taro = new Person("AWS", "太郎");
const jiro = new Person("Amazon", "次郎");
const testInit = new Person();

taro.greet();
jiro.greet();
testInit.greet();