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

function generateError(message: string, code: number): never {
  throw { message: message, code: code };
  // 이 함수는 void를 반환하는 것이 아님
  // never를 반환하지만 반환 값을 생성하지 않는 것임!
  // 물론 반환값이 없기 때문에 void도 가능함! 하지만 의도적으로 명시하는 것임
  // throw와 충돌되기 때문에 이 밑에 다른 코드를 넣어도 실행이 되지 않음
  // try catch를 써서 실행할 수는 있지만, 이 함수는 여전히 반환값을 갖지 않음
  // never를 명시함으로써 개발자가 이 함수는 의도적으로 스크립트 일부를 충돌시키거나 망가트리기 위한 코드임을 알 수 있음
  // 코드 품질 관점에서 의도를 더욱 분명하게 할 수 있음!

  // 반환되지 않는 함수는 무한 루프 함수가 가능하지 않다
  // while(true) {}
  // 이렇게 하면 무한루프가 생성되는데, 이런 함수는 에러함수를 반환하지 않거나, 중단된 에러를 생성하는 함수가 사용하기에 더 일반적임
  // throw문과 충돌하여 아래 구문은 실행되지 않기 때문에 while문이 실행되지 않음
}

generateError("An error occurred!", 500);
