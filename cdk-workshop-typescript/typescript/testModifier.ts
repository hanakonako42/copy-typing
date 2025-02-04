class Friend {
    readonly firstName: string;
    readonly lastName: string;
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  const goro = new Friend("Type", "四郎");
  goro.lastName = "五郎";
  
  console.log(`私の名前は ${goro.lastName} です。`);