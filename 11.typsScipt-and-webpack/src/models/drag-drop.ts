// Drag & Drop Interface
// namespace App {
// 이것은 자바스크립트가 아니라 타입스크립트 기능이다. 바닐라 자바스크립트로는 컴파일되지 않음
// 이는 기본적으로 객체로 컴파일되기 때문에 우리가 입력하는 것은 속성에 저장됨
// 네임스페이스 안에 우리가 넣고 싶은 클래스, 변수 다 넣을 수 있지만
// 네임스페이스 안에 있는 인터페이스는 이 안에서만 사용할 수 있음
// export 키워드를 사용하면, 해당 인터페이스들을 네임스페이스 내부와 외부 파일 모두에서 사용할 수 있음을 의미함
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // 브라우저와 자바스크립트에 우리가 하고자 하는 드래그가 유효한 타겟임을 알려줌. 드래그 이벤트가 발생할 때마다 실행됨
  dropHandler(event: DragEvent): void; // 드롭 이벤트. 드래그 핸들러가 드롭을 허용함.
  dragLeaveHandler(event: DragEvent): void; // 사용자에게 비주얼 피드백을 줄 때 유용함. 변경사항이 없을 때에도 사용하여 비주얼 업데이트를 되돌림
}
// }
