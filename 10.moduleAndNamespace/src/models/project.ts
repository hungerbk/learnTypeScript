namespace App {
  // Project Type

  // 우리가 app.ts에서도 사용할 네임스페이스와 이름이 같아야 함
  // 네임스페이스는 이름이 같은 다른 파일에 있는 네임스페이스에서도 같은 기능을 사용할 수 있음!!
  export enum ProjectStatus {
    Active,
    Finished,
  }

  export class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
  }
}
