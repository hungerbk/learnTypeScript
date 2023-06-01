function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result: " + num);
  return;
}
// 28. 함수 타입 및 콜백
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
  // 콜백함수의 반환타입을 void로 지정한 것 = addAndHandle 내에서 어떠한 값도 반환하지 않겠다는 것을 의미
  // 하지만 이것이 콜백함수가 리턴 값이 없어야 한다는 것을 의미하는 것은 아님.
  // addAndHandle 함수가 (콜백함수가) 반환할 수 있는 값을 사용하지 않겠다는 것을 의미
  // 그렇기 때문에 아래에서 함수를 실행할 때 return을 입력해도 에러가 발생하는 것이 아니라 그저 return 값을 받지 않는 것임!
  // 하지만 매개변수의 경우는 다르다.
  // 콜백함수에서 하나의 매개변수만 받는 것으로 명시했기 때문에, 함수를 실행할 때 2개의 매개변수를 입력하면 에러가 발생함
  // 위 과정은 addAndHandle 함수에서 하는 것임! addAndHandle 함수가 콜백함수가 호출되는 위치이기 때문.
  // 이 처럼 타스는 콜백함수와 콜백함수의 매개변수, 매개변수에는 엄격하게 관여하지만, 반환타입에는 관여하지 않는다
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

addAndHandle(10, 20, (result) => {
  console.log(result);
  return result; // 이 부분은 실행되지 않는다.
  // 위에서(함수 정의문) 콜백함수는 void라고 타입 지정했기 때문에 addAndHandle 함수는 리턴하는 값이 없다고 명시한 것임. 그렇기 때문에 리턴을 입력해도 실행되지 않음
});
