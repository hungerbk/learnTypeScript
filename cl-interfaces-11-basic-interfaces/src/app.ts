interface Greetable {
  // 인터페이스는 객체의 구조를 정의/설명하는 것
  // 초깃값을 가질 수 없음
  name: string;

  greet(phrase: string): void;
}

// 콤마를 통해 여러가지 인터페이스를 참조할 수 있음 (우리는 하나밖에 안만들었지만..)
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
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

user1 = new Person("Max");

user1.greet("Hi there - I am");
console.log(user1);
