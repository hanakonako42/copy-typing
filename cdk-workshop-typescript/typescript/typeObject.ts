let person: { firstName: string; lastName: string; age: number; };
person = { firstName: "AWS", lastName: "太郎", age: 30};

console.log(person);
console.log(`私の名前は${person.firstName} ${person.lastName}です。`);
console.log(`${person["age"]}歳です。`);

person.lastName = "次郎";
console.log(person);

let person2: { firstName: string; lastName?: string; age: number; };
person2 = { firstName: "AWS", lastName: "太郎", age: 30};

delete person2.lastName;

console.log(person2);