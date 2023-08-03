// function Logger(constructor: Function) {
//   // 데코레이터는 인수를 받음
//   console.log("Logging...");
//   console.log(constructor);
// }
// 데코레이터는 우리가 어떤 것에 적용하는 함수임
// 데코레이터 함수는 일반적으로 대문자로 시작함

// 데코레이터는 실체화되기 전 클래스가 정의만 돼도 실행됨
// 클래스를 실체화할 필요가 없음
// 자바스크립트에서 클래스 및 컨스트럭터의 함수 정의만 입력되면 데코레이터가 돌아감. 컨스트럭터 함수가 대상을 실체화하지 않았을 때도

// 팩토리 함수

// 데코레이터 함수를 도출하는데 어떤 대상에 데코레이터를 할당할 때 설정할 수 있도록 함
// 팩토리 함수와 함께 실행하면 데코레이션 함수가 사용하는 값을 커스터마이즈할 수 있음
// 데코레이터를 내부 설정에 사용할 때보다 많은 영향력과 가능성을 펼칠 수 있음
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// @: 코딩에서 읽히거나 찾게 되는 특별한 식별자 상징
@Logger("Logging - Person")
// 데코레이터 함수를 실행하는 것이 아니라 데코레이터 함수와 같은 걸 반환해 줄 함수를 실행하는 것
//장점은 값을 건너 뛸 수 있다는 것. 내부 반환 데코레이터 함수로 대체되어서.
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
