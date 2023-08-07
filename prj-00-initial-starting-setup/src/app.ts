class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // getElementById()는 어떤 HTML 요소를 가져오는 지 확실히 알 수 없기 때문에 에러가 발생한다.
    // 우리가 위에서 templateElement: HTMLTemplateElement; 라고 정의했기 때문에 발생하는 에러
    // 그렇기 때문에 우리가 가져오는 요소가 HTMLTemplateElement라는 것을 알려줘야 함! 아래 두가지 방식을 쓸 수 있다
    // this.templateElement = <HTMLTemplateElement>document.getElementById("project-input")!;
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
