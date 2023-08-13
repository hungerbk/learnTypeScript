import { Draggable } from "../models/drag-drop.js"; // 컴파일된 것을 전달해야 하기 때문에 js로 해야 함
import { Project } from "../models/project.js";
import Component from "./base-component.js";
import { autobind } from "../decorators/autobind.js";

// ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id); // 드래그 이벤트 시, 브라우저와 자바스크립트가 데이터를 저장하고 붙일 수 있게 함
    // dataTransfer는 우리가 어디에서 이벤트 리스너를 사용하냐에 따라 데이터 전송이 불가능할 수 있기 때문에 null이 올 수도 있음.
    // 즉 모든 드래그 이벤트가 데이터 전송 객체가 있는 이벤트를 생성하지는 않음! > ! 써준 이유
    event.dataTransfer!.effectAllowed = "move"; // 커서 모양을 조절하고 브라우저에 우리의 의도에 대해 더 알려줄 수 있음
  }

  dragEndHandler(_: DragEvent) {
    console.log("DragEnd");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned"; // getter는 일반 프로퍼티처럼 접근한다. () 붙이지 않음
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
