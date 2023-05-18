function combine(input1: number | string, input2: number | string) {
  let result;
  // 유니언 타입을 사용할 때는 이러한 런타임 타입 체크가 종종 필요함
  // 유니언 타입을 사용하면 매개변수를 좀더 유연하게 사용할 수 있음
  // 로직과 타입에 따라 런타임 타입 체크가 필요할 수도 있고 아닐 수 있음! => 실행되는 코드가 바뀔 수 있기 때문에 그 경우에는 필요함
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 24);
console.log(combinedAges);
const combinedNames = combine("Max", "Anna");
console.log(combinedNames);
