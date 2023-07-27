// type AddFn = (a:number, b:number) => number;
interface AddFn {
  // 인터페이스에 익명함수로 작성하면 사용자 정의 함수 타입을 사용하는 것과 같음
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}
// 인터페이스는 여러개의 인터페이스를 상속받을 수 있음(클래스와 차이점!!! 클래스는 하나의 클래스만 상속받을 수 있음!). 다 병합되는 것이기 때문
// Greetable에는 name이 없어도 되지만
// Person에는 name이 없으면 에러가 발생함
interface Greetable extends Named {
  // 인터페이스는 객체의 구조를 정의/설명하는 것
  // 초깃값을 가질 수 없음

  // 인터페이스에는 퍼블릭, 프라이빗은 설정할 수 없고 readonly만 설정할 수 있다

  greet(phrase: string): void;
}

// 콤마를 통해 여러가지 인터페이스를 참조할 수 있음 (우리는 하나밖에 안만들었지만..)
class Person implements Greetable {
  name?: string; //여기에서 옵셔널 프로퍼티로 설정하지 않으면 constructor에서 항상 기본값을 할당해야 함 this.name = n 과 같이
  age = 30;

  constructor(n?: string) {
    // 여기서 옵셔널로 하지 않으면 기본값을 설정해야 함 n: string = ".." 와 같이
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable; // 인터페이스를 타입으로 사용할 수 있음

// user1 = {
//   name: "Max",
//   age: 30, // Greetable 에 age가 없기 때문에 에러 발생
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

user1 = new Person(); // 이제 이름 없이 객체를 생성할 수 있음
// user1.name = 'Manu' // 에러. 인터페이스에 name을 리드온리로 설정했기 때문에 클래스에 따로 설정을 하지 않아도 인터페이스의 속성이 적용됨. name은 변경불가능한 값이다

user1.greet("Hi there - I am");
console.log(user1);
