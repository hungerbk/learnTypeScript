/// <reference path='base-component.ts' />

namespace App {
  // projectList class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    // 활성화된 리스트와 비활성화된 리스트를 구분할 것이기 때문에 type을 추가함(이렇게 쓰면 type을 쓸 수 있음)
    constructor(private type: "active" | "finished") {
      // super가 끝나기 전에는 this를 사용할 수 없다
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = []; // 빈 배열로 초기화

      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault(); // 자바스크립트는 실제로 드롭을 막음 > 그래서 막는 것을 하지 않게 설정 > 우리가 허용한 곳에서는 드롭을 할 수 있게 하는 것
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain"); // 드래그한 대상 id 추출
      projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects(); // 순서상 이게 먼저 실랭된 것처럼 보이지만, 콘텐츠가 생성이 된 뒤에 추가할 수 있기 때문에, 사실은 this.renderContent(); 가 먼저 실행 됨
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + "PROJECTS";
    }

    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      // 이부분은 리스트 항목을 모두 확인하고 새로 붙이는데, 리스트가 기존에 존재할 수 있기 때문에 에러가 발생함 > 항목이 중복으로 노출됨
      // 제일 좋은 것은 기존에 있는 것과 추가해야할 것을 비교하여 없는 것만 추가하는 것. 하지만 dom을 비교하는 것은 어렵다
      listEl.innerHTML = ""; // 이렇게 리스트를 비운 뒤 새로 추가해도 됨. 그러면 항목을 추가할 때마다 전체가 다시 리렌더링됨. 지금 앱에선 괜찮음
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem); // element는 박스 그 자체. li나 ul이 아님. 그래서 그 안을 찾아서 넣어줘야 함
      }
    }
  }
}
