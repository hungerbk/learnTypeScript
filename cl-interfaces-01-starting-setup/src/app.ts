class Department {
  // private readonly id: string;
  // public name: string;
  protected employees: string[] = []; // private은 해당 클래스에서만 이 속성을 사용할 수 있게 하지만, protected는 외부에서는 접근할 수 없지만, 해당 클래스를 확장한 클래스에서는 이 속성에 접근할 수 있게 함!
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
  // private은 외부에서 . 으로 접근할 수 없음 > 이걸 가능하게 하는 것이 getter
  private lastReport: string;

  // 캡슐화한 속성을 읽고/쓰기 위해서 사용하는 것이 getter와 setter. 다양한 로직을 사용할 수 있음

  // getter 작성할 때는 메서드 처럼 (){} 필요
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport; // getter는 반드시 무언가를 반환해야 함!
    }

    throw new Error("no report found.");
  }

  // 값을 설정해야 하기 때문에 인수를 전달해야 함
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value); // 클래스 내부의 메서드에 접근할 수 있음
  }

  constructor(id: string, public reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // 부모클래스에 정의된 메서드를 재정의할 수 있다
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
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

// accounting.mostRecentReport = ""; //setter도 getter처럼 속성으로 접근해야 함. 등호를 사용하여 값을 할당. 이렇게 하면 빈 문자열을 유효한 값이 아니기 때문에 에러 발생
accounting.mostRecentReport = "Year End Report"; // 이 값이 reports에 추가 됨
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport); //실행할 때는 속성으로 접근. ()를 입력하지 않음

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printReport();
accounting.printEmployeeInformation();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
// this는 자기를 호출한 객체를 가리킴.
// 여기에서 this는 accountingCopy인데, 이 객체는 name이 없음. 그렇기 때문에 undefined가 출력됨

// 메소드에 매개변수를 입력하고, name: "DUMMY"를 추가하면 DUMMY가 출력됨
