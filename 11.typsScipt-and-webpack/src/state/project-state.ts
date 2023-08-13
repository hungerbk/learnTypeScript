import { Project, ProjectStatus } from "../models/project";

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

// 리스너 타입과 스테이트 클래스는 export할 필요 없다. 이 안에서만 사용하기 때문

export class ProjectState extends State<Project> {
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
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      // 드래그 앤 드롭을 하면 리렌더링되기 때문에 상태가 바뀌는 경우에만 리렌더링하도록 조건 추가
      project.status = newStatus;
      this.updateListeners(); // 이렇게 했기 때문에 다른 클래스에서도 우리가 만들어둔 리스너를 쓸 수 있음. 우리가 만든 리스너는 모두 저장하기 때문에
    }
  }

  private updateListeners() {
    // 모든 리스너 함수를 불러온 뒤
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // 해당하는 함수를 실행 // 이때 참조복사가 아니라 새로운 복사 값으로 전송하도록 함(리스너 함수의 출처는 수정X)
    }
  }
}

// 전역상수를 설정하여 다른 데서도 사용할 수 있게 하기
// 아래처럼 static 메서드를 사용하는 방식으로 하면 항상 같은 객체로 작업할 수 있음 => 우리가 이렇게 작업해둠. 하나의 객체만 반환함
export const projectState = ProjectState.getInstance();
// 이 상수는 여러 파일에서 임포트돼서 사용되고 있음
// 그렇다면 여러번 임포트될 때마다 계속 상수가 생성되는 걸까?
// 파일이 최초로 임포트되었을 때 1회만 실행됨
// 다른 파일이 같은 파일을 임포트하는 경우 다시 실행되지 않음
// console.log('RUNNING') 을 위에 입력하면 콘솔에 한번만 나옴. 다른 액션을 해도 더 출력되지 않음
