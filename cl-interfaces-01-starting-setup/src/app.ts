class Department {
  // private readonly id: string;
  // public name: string;
  private employees: string[] = [];
  // readonly는 속성이 초기화된 이후 값이 변경되어서는 안 된다는 것을 의미. 코드에 안전성과 명확성을 더해줌.
  // 이중 초기화를 한번에하는 것 원래는 주석처리한 부분(2, 3번 줄 + 9, 10번 줄) 모두 작성해야 하는데, 컨스트럭터 괄호 안의 한 줄로 끝낼 수 있음
  // 값을 찾은 다음에 인수를 할당해야 하는데, 저렇게 하면 같은 이름의 속성이 생성되고 인수에 대한 값이 속성이 저장되는 것
  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  // 아래처럼 메소드에 매개변수를 지정하고, 타입을 지정하면 undefined가 나오는(원치 않는 결과가 나오는) 것을 방지 할 수 있음
  // this.name이 없는 경우 에러가 발생함
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 상속 Department의 속성을 그대로 사용 + 새로운 속성을 추가할 때 사용. 상속은 하나만 받을 수 있다.
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT"); // 부모 클래스에 속성 전달. this를 사용하는 것보다 먼저 나와야 작업이 가능함
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, public reports: string[]) {
    super(id, "Accounting");
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReport() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Max"]);
// console.log(accounting);
it.describe();

it.addEmployee("Max");
it.addEmployee("Manu");

// accounting.employees[2] = "Anna";

it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong...");
accounting.printReport();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
// this는 자기를 호출한 객체를 가리킴.
// 여기에서 this는 accountingCopy인데, 이 객체는 name이 없음. 그렇기 때문에 undefined가 출력됨

// 메소드에 매개변수를 입력하고, name: "DUMMY"를 추가하면 DUMMY가 출력됨
