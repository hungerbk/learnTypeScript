let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
  userName = userInput;
}
// 타입 검사를 통해 원하는 기능을 수행할 수 있음
// any의 경우 어떤 값이든 할당할 수 있기 때문에 타입 검사 없이도 userName에 userInput을 할당할 수 있음
// unknown은 unknown인 채로 타입 검사를 통해서 그 값을 할당할 수 있음
// 4, 5번 처렁 할당해도 userInput이 숫자나 문자열이 되는 것은 아님. 그대로 unknown 타입임
// 입력하는 값의 타입을 미리 알 수 있으면 문자열이나 유니언 타입을 쓰는 것이 좋다!
