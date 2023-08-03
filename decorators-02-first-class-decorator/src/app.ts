function Logger(constructor: Function) {
  // 데코레이터는 인수를 받음
  console.log("Logging...");
  console.log(constructor);
}
// 데코레이터는 우리가 어떤 것에 적용하는 함수임
// 데코레이터 함수는 일반적으로 대문자로 시작함

// 데코레이터는 실체화되기 전 클래스가 정의만 돼도 실행됨
// 클래스를 실체화할 필요가 없음
// 자바스크립트에서 클래스 및 컨스트럭터의 함수 정의만 입력되면 데코레이터가 돌아감. 컨스트럭터 함수가 대상을 실체화하지 않았을 때도

// @: 코딩에서 읽히거나 찾게 되는 특별한 식별자 상징
@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
