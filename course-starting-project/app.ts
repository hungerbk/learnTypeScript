function combine(input1: number | string, input2: number | string, resultConversion: "as-number" | "as-text") {
  // 위에서 지정한 "as-number" | "as-text" 텍스트만 값으로 받을 수 있음
  // 유니언 타입을 결합하는 데에 리터럴 타입을 이용한다
  let result;
  if ((typeof input1 === "number" && typeof input2 === "number") || resultConversion === "as-number") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;

  // if (resultConversion === "as-number") {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 24, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "24", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
