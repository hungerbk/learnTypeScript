/// <reference path='components/project-input.ts' />
/// <reference path='components/project-list.ts' />
// 슬래시 3개로 시작하는 것은 일반 주석이 아님. 타입스크립트가 채택하는 구문
// 위처럼 작성하면 타입스크립트가 레퍼런스 처럼 이해하는 구문이 됨

// 하지만 컴파일 시 따로 컴파일 됨
// 위의 참조는 단지 어디에서 찾아야하는 지는 전달할 뿐인데, 자바스크립트로 컴파일되면 이 연결은 끊어지는 것이 됨
// tsconfig.json 에서 outFile 을 설정해야 함. 이는 타입스크립트가 네임스페이스와 연결되게 함
// 여러개 파일로 컴파일하는 것이 아니라 컴파일 중에 연결되는 reference 들을 하나의 자바스크립트 파일로 연결함

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
