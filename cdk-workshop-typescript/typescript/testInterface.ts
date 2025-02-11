interface Profile {
    firstName: string;
    lastName: string;
}

const aws: Profile = { firstName: "AWS", lastName: "太郎" };
const amazon: Profile = { firstName: "Amazon", lastName: "次郎" };

console.log(`${aws.firstName} ${aws.lastName}の上司は${amazon.firstName} ${amazon.lastName}です。`);

interface BusinessProfile extends Profile {
    companyName: string;
}

const taroBiz: BusinessProfile = { firstName: "AWS", lastName: "太郎", companyName: "AnyCompany" };
console.log(`私は${taroBiz.lastName}です。${taroBiz.companyName}に勤めています。`);
