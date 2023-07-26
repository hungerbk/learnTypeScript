abstract class Department {
  // abstract으로 정의된 메서드가 하나라도 있으면 해당 클래스도 abstract이 되어야 함
  // 추상 클래스는 일부 상위 클래스를 기반으로 하는 모든 클래스가 일부 공통 메서드 혹은 공통 속성을 공유하도록 하려는 경우 유용함
  // Department를 확장한 ITDepartment와 AccountingDepartment 모두 describe()를 가지고 있어야 함. 기능은 달라도 괜찮음

  static fiscalYear = "2020";
  // private readonly id: string;
  // public name: string;
  protected employees: string[] = []; // private은 해당 클래스에서만 이 속성을 사용할 수 있게 하지만, protected는 외부에서는 접근할 수 없지만, 해당 클래스를 확장한 클래스에서는 이 속성에 접근할 수 있게 함!
  // readonly는 속성이 초기화된 이후 값이 변경되어서는 안 된다는 것을 의미. 코드에 안전성과 명확성을 더해줌.
  // 이중 초기화를 한번에하는 것 원래는 주석처리한 부분(2, 3번 줄 + 9, 10번 줄) 모두 작성해야 하는데, 컨스트럭터 괄호 안의 한 줄로 끝낼 수 있음
  // 값을 찾은 다음에 인수를 할당해야 하는데, 저렇게 하면 같은 이름의 속성이 생성되고 인수에 대한 값이 속성이 저장되는 것
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // 정적 속성과 정적 메서드는 인스턴스에서 유효하지 않음. 인스턴스와 분리되어 있음.
    // static이라고 정의되어 있는 부분에서만 접근할 수 있음(constructor는 static으로 바꿀 수 없기 때문에 접근할 수 없음. static 속성은 this로 접근할 수 없다)
    // 그렇기 때문에 클래스 내부에서 static 속성/메서드에 접근하려면 클래스 이름으로 접근해야 함!
    // console.log(this.fiscalYear); // 이 부분은 에러가 발생함
    // console.log(Department.fiscalYear); // 이렇게 접근해야 함
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // 아래처럼 메소드에 매개변수를 지정하고, 타입을 지정하면 undefined가 나오는(원치 않는 결과가 나오는) 것을 방지 할 수 있음
  // this.name이 없는 경우 에러가 발생함
  abstract describe(this: Department): void;
  // abstract으로 지정하면 타입을 지정하는 것 외에 다른 것은 할 수 없음. (중괄호를 이용하여 다른 기능을 구현할 수 없음)

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

  // Department를 확장한 ITDepartment와 AccountingDepartment 모두 describe()를 가지고 있어야 함. 기능은 달라도 괜찮음
  describe() {
    console.log("IT Department ID - " + this.id);
  }
}

class AccountingDepartment extends Department {
  // private은 외부에서 . 으로 접근할 수 없음 > 이걸 가능하게 하는 것이 getter
  private lastReport: string;
  private static instance: AccountingDepartment;

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

  // 이렇게 하면 싱글톤 패턴이 됨 > 하나의 인스턴스만 만들겠다는 것임 > new 생성자를 통해 만들 수 없음
  private constructor(id: string, public reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // 아래와 같은 static 을 통해 인스턴스를 만들어야 함
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance; //있으면 있는 것을 반환
    }
    this.instance = new AccountingDepartment("d2", []); // 없으면 새로 생성하여 반환
    return this.instance;
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

  // Department를 확장한 ITDepartment와 AccountingDepartment 모두 describe()를 가지고 있어야 함. 기능은 달라도 괜찮음
  describe() {
    console.log("Accounting Department ID - " + this.id);
  }
}

// 새 키워드를 입력하지 않고 직접 메서드를 사용할 수 있음. 우리가 흔히 사용하는 Math가 대표적인 예. new Math를 하지 않고 Math.pow..등으로 사용함
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear); // 메서드가 아닌 속성도 static으로 정의할 수 있음

const it = new ITDepartment("d1", ["Max"]);
// console.log(accounting);
it.describe();

it.addEmployee("Max");
it.addEmployee("Manu");

// accounting.employees[2] = "Anna";

it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment("d2", []); // private constructor를 설정하면 이제 이렇게 만들 수 없음
const accounting = AccountingDepartment.getInstance(); // 이렇게 만들어야 함. getInstance()가 실행되면 있으면 그것을 반환, 없으면 새로 만듦
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2); // 이 둘은 같은 객체임!

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
