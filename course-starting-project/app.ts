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
const person3 = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

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
  console.log(hobby.map()); // 이 경우에는 에러를 보여줌. map()은 문자열이 아닌 배열의 함수니까!
}

// 배열 요소의 타입을 혼합하여 사용하고 싶으면 any 타입을 지정해야 함
let favoriteActivities2: any[];
favoriteActivities2 = ["Spots", 1];

// 하지만 any는 잘 사용하지 않음. 타스의 장점을 잘 활용하지 못하게 할 수도 있음!
