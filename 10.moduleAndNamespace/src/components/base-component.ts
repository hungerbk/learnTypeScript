namespace App {
  // Component Base Class
  // 클래스를 추상화하여 직접 인스턴스를 만들 수 없게 함
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
