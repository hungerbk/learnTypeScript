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

// 무언가를 반환하고 그 값을 타스가 사용할 수 있는 데코레이터는 메서드 데코레이터나 액세서 데코레이터임 > 새로운 디스크립터 객체를 반환할 수 있고, 그 값을 타스에 확인해줄 수 있음
// 프로퍼티와 파라메터 데코레이터도 어떤 값을 반환하지만 타스는 그 값들을 무시함. 사용되지 않음
// 프로퍼티 디스크립터는 바닐라 자바스크립트임
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

// 프로덕트 클래스를 사용할 때 데코레이터가 실행되는 것이 아니라
// 클래스가 정의될 때 데코레이터가 실행 됨
const p1 = new Product("book", 19);
const p2 = new Product("book 2", 26);

// 우리는 target이나 methodName에는 관심이 없기 때문에 이를 _로 대체함
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // 우리는 Autobind안에 있는 this가 항상 이 메서드가 속해 있는 객체가 되게 하고 싶음!
  const originalMethod = descriptor.value; // 이렇게 하면 원래 메서드에 접근할 수 있음
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // 여기에서 this는 getter 메서드를 대체함. getter를 트리거하는 것은 무엇이든지 참조함
      // getter 메서드는 그것이 속해 있는 확실한 객체로 트리거 됨 >>> this는 getter를 대신에 항상 우리가 정의를 객체를 참조함
      // getter는 이벤트 리스너로 재정의되지 않음
      // 그것이 속한 객체, 그리고 이벤트 리스너 사이의 추가적인 계층 같은 것이기 때문

      // 여기에서 이렇게 bind를 했기 때문에 이제 어디에서 실행하든 항상 같은 객체를 참조하게 됨!
      // 일일이 이벤트리스너에 bind를 하지 않아도 됨!!
      return boundFn;
    },
  };
  return adjDescriptor; // 우리가 만든 Autobind 데코레이터 함수가 새로운 adjDescriptor 데코레이터를 반환하면 이 디스크립터 객체가 이전의 디스크립터 객체를 덮어씀
  // 그러면 타스는 이전의 디스크립터를 대체함 > 새로운 구성으로 대체되고, getter 계층이 추가되는 것
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    // 이메서드는 항상 객체가 됨
    // this는 항상 같은 대상을 참조하는 것이 아님
    // p.showMessage; 에서는 Printer를 참조하지만
    // 이벤트 리스너를 사용하면 이벤트 대상을 참조함
    // 이벤트 리스너가 실행되어야 하는 함수 안에 있는 this와 이벤트 대상을 바인딩하기 때문
    console.log(this.message);
  }
}

const p = new Printer();

// p.showMessage; // 여기에서 this는 Printer
const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage); //여기에서 this는 button.
// button.addEventListener("click", p.showMessage.bind(p)); //이렇게 p를 바인딩하면 해결할 수 있음 (이것은 자바스크립트!)
button.addEventListener("click", p.showMessage); // 이제 이렇게만 작성해도 (Autobind 덕분에) 항상 같은 객체를 참조함
