function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("Result: " + num);
  return;
}

printResult(add(5, 12));

let someValue: undefined;

// 타스에서 언디파인드는 타입임
// 하지만 반환 타입으로 undefined를 사용할 수 없음 (사용하지 않음?)
// 언디파인드를 사용하는 것은 아무런 값도 반환하지 않는 반환문이 있다는 것을 의미함
// 언디파인드는 드물게 사용하는데, 실제 값을 반환하지 않을 때 사용할 수 있다
// 함수가 언디파인드를 비롯하여 반환하는 것이 없다면 void를 사용해야 함 ⇒ 이 함수에 의도적으로 반환문이 없다는 것을 의미하는 것이기 때문
// 타스가 언디파인드를 추론할 수는 없다. 보이드를 사용하는 것이 표준.
