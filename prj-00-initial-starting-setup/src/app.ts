class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // getElementById()는 어떤 HTML 요소를 가져오는 지 확실히 알 수 없기 때문에 에러가 발생한다.
    // 우리가 위에서 templateElement: HTMLTemplateElement; 라고 정의했기 때문에 발생하는 에러
    // 그렇기 때문에 우리가 가져오는 요소가 HTMLTemplateElement라는 것을 알려줘야 함! 아래 두가지 방식을 쓸 수 있다
    // this.templateElement = <HTMLTemplateElement>document.getElementById("project-input")!;
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input"; //요소에 id 지정

    // 클래스에 기반하여 생성된 모든 객체에 접근할 수 있다
    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault(); // 기본으로 하는 http 제출을 막음
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this)); // bind 하지 않으면 핸들러에서 에러가 발생함. this가 가리키는 대상이 다르기 때문. 하지만 이렇게 작성하는 것이 아니라 데코레이터를 이용해서 할 수 있음
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
