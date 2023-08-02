// const names: Array<string> = []; // string[] 와 일치함
// 제네릭 타입은 다른 타입과 연결된다. 어떤 것과 연결된 것인지는 타스를 통해 알 수 있음

// names[0].split(" ");
// 배열 안에 오는 것이 문자열인 것을 알고 있으면 문자열의 함수를 알 수 있음
// 배열에 특정 타입을 지정하면 해당 타입의 함수를 쓸 수 있음

// 프로미스 타입
// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then((data) => {
//   data.split(" ");
// });

// 프로미스 타입은 타스에 있는 것은 아니고 자스에 있는 것임
// 프로미스 상수가 프로미스 타입임
// 프로미스 타입도 배열처럼 다른 타입과 함께 사용한다. 프로미스는 다른 타입을 반환하는 것이기 때문
// 위 예시에서 보면은 number를 반환하기 때문에 split 함수는 사용할 수 없다고 에러가 나옴

// 배열은 어떤 타입을 저장하는지, 프로미스는 어떤 타입을 반환하는 지 알 수 있음
// 이는 작업을 수행할 때마다 타스의 도움을 받는 데에 사용된다
// 정보를 미리 아는 데에 사용 할 수 있음!
// 물론 클래스나 함수에 이용하면 다른 기능으로 쓸 수 있다..!

// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }

// console.log(merge({ name: "Max" }, { age: 30 })); // 이것은 문제 없이 실행됨.

// 문제는 저장할 때임!

// const mergedObj = merge({ name: "Max" }, { age: 30 });
// mergedObj.name // 접근할 수 없다.

// object가 구체적인 객체가 아니라 어떤 객체든 될 수 있기 때문에 타입스트립트는 인터섹션이 반환된다고 추론할 수 있음
// 제네릭 타입을 사용하게 되면 두 매개변수가 서로 다른 타입이 될 수도 있다고 알려줄 수 있음
// 무작위가 아닌 다양한 타입 데이터를 얻는 것이라고 알려주는 것
// 정확한 객체나 타입을 알 필요가 없음.
// 특정 객체가 아닌 인터섹션을 반환한다는 것만 알려주면 됨

// 제네릭 타입의 제약조건
// Object.assign()은 서로 다른 객체만 반환함 > 그래서 에러가 발생했던 듯
// 제네릭 타입에 extends를 사용하여 제약 조건을 설정할 수 있다
// 어떤 값이든 올 수 있지만 객체라는 것을 의미
// 어떤 타입이든 쓸 수 있다. 객체, 유니언 타입, 사용자 지정 타입 등등..
// 아래 처럼 작성하면 에러가 발생하지 않음
// 하나의 변수에만 할당할 수도 있는데, 아래의 예시에서는 둘다 객체여야 하기 때문에 둘다 작성하는 것이 일반적이다
// 이렇게 작성하면 객체가 아닌 경우에는 에러가 발생한다

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// 위 처럼 작성하면 타스가 알아서 타입을 추론함
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.name);
// 물론 아래처럼 세부적으로 알려줄 수 있음
// 그냥 <{}, {}> 이런식으로 하면 에러 발생
// 하지만 굳이 아래처럼 할 필요는 없다!
// const mergedObj2 = merge<{ name: string; hobbies: string[] }, { age: number }>({ name: "Max", hobbies: ["Cooking}"] }, { age: 30 });

// 새로운 타입 지정
interface Lengthy {
  length: number;
}

// 우리가 받는 매개변수가 어떤 값이든 length 속성이 있는 것만 올 수 있음. string, array 상관 없이
// 올 수 있는 값을 유연하게 설정할 수 있음. 어떤 타입이든 length 속성이 있는 타입이 오도록 설정하는 것
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!")); //['Hi there!', 'Got 9 elements.']
console.log(countAndDescribe(["sports", "cooking"])); //[Array(2), 'Got 2 elements.']
console.log(countAndDescribe([])); //[Array(0), 'Got no value.']
// console.log(countAndDescribe(10)); // 에러. number는 length 속성이 없음

// keyof 부분이 없는 경우, 객체에 해당 키가 있는지 알 수 없기 때문에 에러가 발생함
// 존재하지 않는 속성에 접근하려는 것을 방지 할 수 있음
function extractAndconvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return "Value " + obj[key];
}
extractAndconvert({ name: "Max" }, "name");
// extractAndconvert({ name: "Max" }, "age"); //에러

// 제네릭 클래스
// 사용방식을 미세하게 조절하는 것보다(객체 사용 등..) 원시값만 사용할 수 있도록 지정하는 것이 더 낫다
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  // 클래스 안에 있는 메소드에도 다른 제네럴 타입을 지정해서 쓸 수도 있다!
  removeItem(item: T) {
    // 이를 해결하기 위해서 if문 이용
    if (this.data.indexOf(item) === -1) {
      return; // 없으면 그냥 반환
    }
    this.data.splice(this.data.indexOf(item), 1);
    // 객체인 경우, 주소를 찾지만 주소가 없음.. 그래서 마지막 요소를 지우게 됨
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
// textStorage.addItem(10); //에러
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// 해당 클래스가 원시값에만 작동하도록 수정했기 때문에 아래는 쓸 수 없음!

// const objStorage = new DataStorage<object>();

// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem({ name: "Max" });
// console.log(objStorage.getItems()); //원하는 대로 작동하지 않음. 객체는 원시타입이 아니라 참조타입이기 때문..!! indexOf를 통해 아이템을 제거하는 데, 이는 참조타입에는 맞지 않는 방식임

// //객체에서 사용할 수 있는 방법은 같은 객체를 추가하고 제거하는 것뿐
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.removeItem(maxObj);
