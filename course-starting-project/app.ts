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
  // const aaa = cb(result);
  // 이렇게 작성하면 하단에 return aaa 했을 때 true가 콘솔에 찍힘.. 뭐징 void라고 했는뎀

  // 콜백함수의 반환타입을 void로 지정한 것 = addAndHandle 내에서 어떠한 값도 반환하지 않겠다는 것을 의미
  // 하지만 이것이 콜백함수가 리턴 값이 없어야 한다는 것을 의미하는 것은 아님.
  // addAndHandle 함수가 (콜백함수가) 반환할 수 있는 값을 사용하지 않겠다는 것을 의미
  // 그렇기 때문에 아래에서 함수를 실행할 때 return을 입력해도 에러가 발생하는 것이 아니라 그저 return 값을 받지 않는 것임!

  // 하지만 매개변수의 경우는 다르다.
  // 콜백함수에서 하나의 매개변수만 받는 것으로 명시했기 때문에, 함수를 실행할 때 2개의 매개변수를 입력하면 에러가 발생함
  // 위 과정은 addAndHandle 함수에서 하는 것임! addAndHandle 함수가 콜백함수가 호출되는 위치이기 때문.
  // 이 처럼 타스는 콜백함수와 콜백함수의 매개변수, 매개변수에는 엄격하게 관여하지만, 반환타입에는 관여하지 않는다
  // return false; // 이 코드를 입력하면 false가 출력됨
  // return aaa;
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

console.log(
  addAndHandle(10, 20, (result) => {
    console.log(result);
    return true; // 이 부분을 입력해도 컴파일 에러가 발생하지 않음
  })
);
// 위 코드를 실행했을 때, true가 출력되는 것이 아니라 undefined가 출력됨
