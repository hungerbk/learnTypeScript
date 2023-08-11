// Project Type
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}

// Project State Management
type Listener<T> = (items: T[]) => void;
// 리스너는 함수의 배열임!
// 리스너로 작업하는 부분은 반환값이 필요 없음

class State<T> {
  // 결국 리스너는 리스너 함수 배열이다
  protected listeners: Listener<T>[] = []; // 리스너 목록 관리. 함수 참조 리스트
  // protected 클래스 밖에서 접근할 수 없지만, 상속받은 클래스에서는 접근할 수 있음

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
    this.projects.push(newProject);
    // 모든 리스너 함수를 불러온 뒤
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // 해당하는 함수를 실행 // 이때 참조복사가 아니라 새로운 복사 값으로 전송하도록 함(리스너 함수의 출처는 수정X)
    }
  }
}

// 전역상수를 설정하여 다른 데서도 사용할 수 있게 하기
// 아래처럼 static 메서드를 사용하는 방식으로 하면 항상 같은 객체로 작업할 수 있음 => 우리가 이렇게 작업해둠. 하나의 객체만 반환함
const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: boolean; // 선택사항이기 때문에 ? 추가. | undefined를 해도 같음
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // != null 부분을 추가하면, 최소길이가 0이어도 검증을 실행함
  if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// Component Base Class
// 클래스를 추상화하여 직접 인스턴스를 만들 수 없게 함
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  // templateElement는 항상 HTMLTemplateElement지만, hostElement와 element는 아님. 상황에 따라 더 세부적이기도/다르기도 함 => 제네릭을 이용
  // 위 처럼 제네릭을 사용하면, 이 클래스로부터 상속을 받을 때마다 구현타입을 정할 수 있고, 우리가 상속받는 다양한 위치에서 다양한 타입으로 작업이 가능함
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  // 필수 매개변수는 선택적 매개변수 앞에!
  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      // optional 이기 때문에 if문에 넣어줘야 함
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }
  private attach(insertAtBiginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBiginning ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.project.people.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// projectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  // 활성화된 리스트와 비활성화된 리스트를 구분할 것이기 때문에 type을 추가함(이렇게 쓰면 type을 쓸 수 있음)
  constructor(private type: "active" | "finished") {
    // super가 끝나기 전에는 this를 사용할 수 없다
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = []; // 빈 배열로 초기화

    this.configure();
    this.renderContent();
  }

  configure() {
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

// projectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    // 클래스에 기반하여 생성된 모든 객체에 접근할 수 있다
    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
  }

  configure() {
    // this.element.addEventListener("submit", this.submitHandler.bind(this)); // bind 하지 않으면 핸들러에서 에러가 발생함. this가 가리키는 대상이 다르기 때문. 하지만 이렇게 작성하는 것이 아니라 데코레이터를 이용해서 할 수 있음
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      // index.html 에도 min, max가 설정되어 있지만, 여기에 새로 지정한 값이 적용됨
      min: 1,
      max: 5,
    };

    // if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
    // 위 코드를 재사용 가능한 검증으로 만들기
    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("Invalid input, please try again!"); // 이 경우에는 튜플을 반환하지 않기 때문에 에러가 발생함. 아무것도 반환하지 않거나(return;), throw new Error해야 함
      return; // 물론 이 경우에도 튜플을 반환하는 것이 아니기 때문에, 튜플을 반환하거나 아무것도 반환하지 않도록 수정해야 함
      // 단, 함수는 undefined를 반환하지 못하게 하기 때문에 void를 입력한다
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault(); // 기본으로 하는 http 제출을 막음
    // console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // 자바스크립트에는 튜플이 없음. 타스에서의 튜플은 자스에서 배열이기 때문에 배열인지 확인(물론 튜플과 배열이 일치하는 것은 아니지만.. 튜플은 일단 배열이다)
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInput();
    }
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
