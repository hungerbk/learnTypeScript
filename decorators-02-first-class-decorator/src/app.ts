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
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  // 이 내부에서 return 되는 것이 실제 데코레이터임!
  // return function (_: Function) {
  //   const hookEl = document.getElementById(hookId);
  //   if (hookEl) {
  //     hookEl.innerHTML = template;
  //   }
  // };

  // 우리는 화면에 렌더되는 것을 만듦
  // 단 개발자에게 노출되는 도구를 가지고!
  // 컴포넌트처럼 사용할 수 있다. Angular의 작동방식과 유사함!
  console.log("TEMPLATE FACTORY");

  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name; // Max 출력됨
    }
  };
}

// @: 코딩에서 읽히거나 찾게 되는 특별한 식별자 상징
// @Logger("Logging - Person")
// 데코레이터 함수를 실행하는 것이 아니라 데코레이터 함수와 같은 걸 반환해 줄 함수를 실행하는 것
//장점은 값을 건너 뛸 수 있다는 것. 내부 반환 데코레이터 함수로 대체되어서.

// 데코레이터가 여러개인 경우, 아래에 있는 데코레이터가 먼저 실행된다
// 하지만 팩토리 함수의 경우 우리가 명시한 순서대로 실행됨
// 아래와 같이 실행된다
// 1. Logger의 팩토리 함수 (console.log("LOGGER FACTORY");)
// 2. WithTemplate의 팩토리 함수 (console.log("TEMPLATE FACTORY");)
// 3. WithTemplate의 데코레이터 (return 부분)
// 4. Logger의 데코레이터 (return 부분)
// 팩토리 함수가 없는 데코레이터는 데코레이터가 실행되는 순서에 맞게 실행됨
// 예를 들어, A(팩), B, C(팩) > @A; @B; @C 를 하는 경우
// A팩 > C팩 > C데 > B데 > A데 순서로 실행됨
@Logger("Logging")
@WithTemplate("<h1>My Personal Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
