function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result: " + num);
  return;
}

printResult(add(5, 12));

// let combineValues: Function;
let combineValues: (a: number, b: number) => number;
// 두 개의 매개변수(타입: 넘버)를 갖고, 넘버를 반환하는 함수만 지정할 수 있음
combineValues = add;
// combineValues = printResult;
// combineValues = 5;
console.log(combineValues(8, 8));

// let someValue: undefined;
