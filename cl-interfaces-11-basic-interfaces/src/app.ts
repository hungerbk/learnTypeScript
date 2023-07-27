interface Person {
  // 인터페이스는 객체의 구조를 정의/설명하는 것
  // 초깃값을 가질 수 없음
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person; // 인터페이스를 타입으로 사용할 수 있음

user1 = {
  name: "Max",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there - I am");
