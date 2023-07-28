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
