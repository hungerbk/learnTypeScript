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

  return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    // 데코레이터는 새 함수, 컨스트럭터 함수, 클래스를 반환할 수 있음
    // 여기에 있는 클래스는 익명이어도 됨
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super(); // originalconstructor 호출
        console.log("Rendering Template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name; // Max 출력됨
        }
      }
    };
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

// pers를 주석처리하면, WithTemplate의 데코레이터는 실행되지만 화면에 그려지지는 않는다
// 그냥 함수나 팩토리 함수에서 정의하면은 안 됨
// 데코레이터가 무언가를 반환할 수 있기 때문에 가능한 것임
// 데코레이터에 더해진 것을 대체하는 것임

// const pers = new Person();

// console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log // 자바스크립트에서 프로퍼티를 정의했을 때 클래스의 한 부분으로 실행됨. 우리가 만든 컨스트럭터 함수의 부분으로!
  title: string;
  private _price: number;

  // 액세서 데코레이터
  @Log2 // 내부 프로퍼티(_price)가 아니라 외부 액세서(price)가 출력됨
  // 아래 set 함수가 프로퍼티 디스크립터로 출력됨
  // 액세서 데코레이터는 set, get 출력
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive !");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // 메서드 데코레이터
  @Log3 // 메서드 데코레이터는 어떤 것이든 받을 수 있다
  // 메서드 데코레이터는 value, writable이 출력
  getPriceWithTax(@Log4 tax: number) {
    // 파라메터 데코레이터
    return this._price * (1 + tax);
  }
}
