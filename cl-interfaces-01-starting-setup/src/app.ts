class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  // 아래처럼 메소드에 매개변수를 지정하고, 타입을 지정하면 undefined가 나오는(원치 않는 결과가 나오는) 것을 방지 할 수 있음
  // this.name이 없는 경우 에러가 발생함
  describe(this: Department) {
    console.log("Department: " + this.name);
  }
}

const accounting = new Department("Accounting");
// console.log(accounting);
accounting.describe();

const accountingCopy = { name: "DUMMY", describe: accounting.describe };

accountingCopy.describe();
// this는 자기를 호출한 객체를 가리킴.
// 여기에서 this는 accountingCopy인데, 이 객체는 name이 없음. 그렇기 때문에 undefined가 출력됨

// 메소드에 매개변수를 입력하고, name: "DUMMY"를 추가하면 DUMMY가 출력됨
