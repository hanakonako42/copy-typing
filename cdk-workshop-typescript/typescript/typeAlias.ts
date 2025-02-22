let staff: { firstName: string; lastName: string };
staff = { firstName: "AWS", lastName: "太郎"};

let boss: {firstName: string; lastName: string;};
boss = { firstName: "Amazon", lastName: "次郎"};

console.log(`My name is ${staff.firstName} ${staff.lastName}.`);
console.log(`${staff.firstName} ${staff.lastName}の上司は${boss.firstName} ${boss.lastName}です。`);
//==================================================
type Staff = {
    firstName: string;
    lastName: string;
};

const staff2: Staff = { firstName: "AWS", lastName: "太郎" };
const boss2: Staff = { firstName: "Amazon", lastName: "次郎" };

console.log(`${staff2.firstName} ${staff2.lastName}の上司は${boss2.firstName} ${boss2.lastName}です。`);
//==================================================
