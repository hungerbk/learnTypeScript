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

const accounting = new Department("d1", "Accounting");
// console.log(accounting);
accounting.describe();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.employees[2] = "Anna";

accounting.printEmployeeInformation();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();
// this는 자기를 호출한 객체를 가리킴.
// 여기에서 this는 accountingCopy인데, 이 객체는 name이 없음. 그렇기 때문에 undefined가 출력됨

// 메소드에 매개변수를 입력하고, name: "DUMMY"를 추가하면 DUMMY가 출력됨
