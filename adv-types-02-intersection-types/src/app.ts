type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 인터섹션 타입은 인터페이스 상속과 밀접한 관련이 있다

// interface ElevatedEmployee extends Employee, Admin {}
// Admin, Employee를 interface로 수정한 후 위 처럼 작성해도 같은 결과.
// 단 인터페이스가 코드가 좀 더 길기 때문에 타입이 선호된다

// Admin과 Employee를 결합한 새로운 객체 타입
// 객체에 사용하는 경우 객체 속성의 조합
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// 아래처럼 인터섹션 타입은 어떤 타입과도 사용할 수 있다
// 아래의 경우 universal은 number로 타입이 지정됨
// 유니언 타입에 사용한 경우, 유니언 타입 간의 "공통" 부분을 찾음
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  // 아래 if문이 타입 가드
  // 유니언 타입이 지닌 유연성을 활용할 수 있게 하고 런타임 시 코드가 정확하게 작동할 수 있게 함
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + blur.toString();
  }
  return a + b;
}

// 타입가드
// 특정 속성이나 메서드를 사용하기 전에 그것이 존재하는지 확인하는 작업
// 객체의 경우 instanceof, in 을 사용할 수 있고 다른 경우 typeof를 사용하면 됨

type unknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: unknownEmployee) {
  console.log("Name: " + emp.name);
  // typeof는 자바스크립트에 있는 타입만 확인할 수 있음. 커스텀 타입은 확인할 수 없음
  // in을 이용하여 'privileges'라는 속성이 있는지 확인
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}

// printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() }); //에러가 발생하지 않고 privileges에 대한 내용만 출력하지 않음

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // 이렇게 쓰면 오타가 날 가능성이 적어짐
    // instanceof는 자바스크립트 기능임
    // 자바스크립트는 생성자함수를 알기 때문에(class 지원) vehicle이 생성자함수 Truck으로 만들어졌는지를 확인할 수 있음
    // 인터페이스는 자스가 지원하지 않기 때문에 인터페이스를 사용하면 이를 사용할 수 없음

    // if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// 구별된 유니언
// 객체가 공통 속성이 있는 경우 이를 가지고 switch문을 통해 구분하여 필요한 속성을 사용함
// 실제 존재하는 속성을 사용하여 어떤 유형의 객체와 작업하고 있는지 확인할 수 있음
// 어떤 값만 사용할 수 있는지 타스가 알고 있기 때문에 오타 발생 가능성이 적음 > 사용할 수 없는 값은 에러로 표시

interface Bird {
  // 리터럴 타입
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// 형변환

// 아래 두 코드는 같은 방식임
// 첫번째 방식이 리액트의 jsx와 혼동될 수 있기 때문에 as를 사용하는 방법도 있음
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
// const userInputElement = document.getElementById("user-input")! as HTMLInputElement;

// 느낌표는 null값이 오지 않는다는 것을 확신하는 경우에만 쓸 수 있음
// 확신할 수 없는 경우에는 if문을 사용해야 함
// 느낌표를 사용하지 않는 경우 형변환은 아래와 같이 사용해야 함

const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}
