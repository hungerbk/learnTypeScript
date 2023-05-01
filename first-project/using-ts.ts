const button = document.querySelector("button")!;
// 처음 이 파일을 만들었을 때, 변수에 모두 빨간 줄이 생김
// js-only.js 파일과 같은 변수 명을 사용하기 때문에 발생하는 오류
// 강의에서는 파일을 삭제했지만, 나는 js 파일을 전부 주석처리했음

// 우리는 이 값이 존재하는지 아닌지 알 수 없음. 이 페이지에 있는 것이 아니기 때문
// 아래와 같이 쓰면 이 값은 절대 null을 반환하지 않는 것을 의미함 (끝에 느낌표(!))
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});
