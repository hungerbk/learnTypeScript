const person: object = {
  name: "Maximilian",
  age: 30,
};

// 타입스크립트 객체는 세미콜론으로 구분함. 자스는 쉼표
// 이렇게 작성하면 name은 string으로, age는 number로 추론
// 키-값 쌍이 아니라, 키-타입 쌍을 작성하는 것임!

console.log(person.name);
// name이라는 객체가 이미 있기 때문에 에러가 발생함
// 타스는 현재 아무런 정보도 주지 않는 객체가 있다고 추론함
// 사실 이 부분이 잘 이해가 되지 않음.... 무슨..말이지..?

// 중괄호를 입력하면, object를 입력한 것과 같음. 객체라고 알려주는 것
const person2: {
  name: string;
  age: number;
  // 여기에서 number가 아니라 특정 값을 입력하면, 아래에서 다른 값을 입력하는 즉시 에러가 발생함
} = {
  name: "Maximilian",
  age: 30,
  // 위에 적지 않은 키를 입력하면 에러가 발생함.
};
// 하지만 이렇게 명시적으로 타입을 지정하는 것은 좋지 않음!

console.log(person2.name);

const person3 = {
  name: "Maximilian",
  age: 30,
};

// 이렇게 작성하는 것이 제일 좋음
