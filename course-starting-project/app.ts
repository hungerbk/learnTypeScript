// const person: object = {
//   name: "Maximilian",
//   age: 30,
// };

// 타입스크립트 객체는 세미콜론으로 구분함. 자스는 쉼표
// 이렇게 작성하면 name은 string으로, age는 number로 추론
// 키-값 쌍이 아니라, 키-타입 쌍을 작성하는 것임!

// console.log(person.name);
// name이라는 객체가 이미 있기 때문에 에러가 발생함
// 타스는 현재 아무런 정보도 주지 않는 객체가 있다고 추론함
// 사실 이 부분이 잘 이해가 되지 않음.... 무슨..말이지..?

// 중괄호를 입력하면, object를 입력한 것과 같음. 객체라고 알려주는 것
// const person2: {
//   name: string;
//   age: number;
// 여기에서 number가 아니라 특정 값을 입력하면, 아래에서 다른 값을 입력하는 즉시 에러가 발생함
// } = {
//   name: "Maximilian",
//   age: 30,
// 위에 적지 않은 키를 입력하면 에러가 발생함.
// };
// 하지만 이렇게 명시적으로 타입을 지정하는 것은 좋지 않음!

// console.log(person2.name);

// 이렇게 작성하는 것이 제일 좋음
// const person3: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; //이게 튜플을 명시적으로 표기한 것
// } = {
//   name: "Maximilian",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"], //첫번째는 number, 두번째는 string 타입이 와야 함.
//   // 하지만 이상태로는 배열인지 튜플인지 알 수 없음. 첫번째 값을 문자열로 바꿀 수 있고, 배열에 요소도 추가할 수 있음
//   // 튜플은 명시적으로 표기해줘야 함
// };

// person3.role.push("admin"); // 아쉽게도 푸시는 걸러내지 못함.. 첫번째와 두번째 요소 타입만 지정한 것.
// 하지만 잘못된 타입의 값이 할당되지 않도록 함!
// person3.role = [1, "aa", "bb"]; // 이 경우에는 에러. 재할당할 때에는 처음에 지정한 대로 해야 함! 길이와 타입이 일치해야 한다.

// person3.role[1] = 10; // 에러. 타입이 다름

// 아래와 같은 방식이 자스에서 사용하는 것
// 전역 상수를 지정하고 사용함. 이렇게 하면 role의 타입이 number로 지정되는 단점이 있음..
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN = 5, // 이렇게 숫자를 지정하면 시작 숫자를 바꿀 수 있음. 이렇게 작성하면 다음 요소 부터는 1씩 증가
  READ_ONLY = 100, // 이렇게 모든 값에 특정 숫자를 지정할 수 있음
  AUTHOR = "AUTHOR", // 숫자뿐 아니라 어떤 것이든 할당할 수 있음
}
// 인간이 알아볼 수 있는 라벨로 작성 가능
// 문자열로만 role을 입력해서 확인하는 경우, 정확히 일치하지 않으면 판별 불가
// 자스 방식을 사용하면 전역 상수를 따로 관리해야 하고, role의 타입이 number로 지정되는 단점
// enum을 사용하면 타입에도 쓸 수 있고, if문에서 판별할 때도 사용할 수 있음

const person3 = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person3.role === Role.AUTHOR) {
  console.log("is admin");
}

// 배열의 타입을 명시적으로 지정하는 방법. 단 이 배열 안에는 문자열만 올 수 있다
let favoriteActivities: string[];
// favoriteActivities = "Spots"; //에러. 배열이기 때문에 배열로 입력해야 함
favoriteActivities = ["Spots"]; // 이렇게 작성해야 함
// favoriteActivities = ["Spots", 1]; // 에러. 문자열만 올 수 있음

// person3.hobbies는 문자열 배열로 인식
for (const hobby of person3.hobbies) {
  // hobby를 문자열로 인식하기 때문에 아래처럼 문자열에 사용하는 함수를 사용할 수 있음!
  // 문자열 배열 안에 있는 것이기 때문에 문자열로 인식!
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); // 이 경우에는 에러를 보여줌. map()은 문자열이 아닌 배열의 함수니까!
}

// 배열 요소의 타입을 혼합하여 사용하고 싶으면 any 타입을 지정해야 함
let favoriteActivities2: any[];
favoriteActivities2 = ["Spots", 1];

// 하지만 any는 잘 사용하지 않음. 타스의 장점을 잘 활용하지 못하게 할 수도 있음!
