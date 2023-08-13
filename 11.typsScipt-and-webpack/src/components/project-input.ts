import Cmp from "./base-component"; // export default로 내보낸 것은 우리가 원하는 이름으로 가져올 수 있음
import * as Validation from "../util/validation"; // 그룹화
import { autobind as Autobind } from "../decorators/autobind"; //alias. A as B > 여기 파일에서는 A를 B로 사용하겠다
import { projectState } from "../state/project-state";

// projectInput class
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
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

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      // index.html 에도 min, max가 설정되어 있지만, 여기에 새로 지정한 값이 적용됨
      min: 1,
      max: 5,
    };

    // if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
    // 위 코드를 재사용 가능한 검증으로 만들기
    if (!Validation.validate(titleValidatable) || !Validation.validate(descriptionValidatable) || !Validation.validate(peopleValidatable)) {
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

  @Autobind
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
