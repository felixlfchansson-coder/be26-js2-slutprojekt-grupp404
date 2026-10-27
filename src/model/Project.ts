import { baseURL } from "../firebaseRequests/dataRequest";
import { Task } from "./task.ts"


export class Project {
  public readonly projectID: number;
  public readonly projectTitle: string;
  public readonly projectURL: string;
  private _projectDescription: string;
  private _projectDeadline: number;
  
  private _projectMembers: string[];
  private _projectTasks: Task[];
  constructor(
    projectID: number,
    projectTitle: string,
    projectDescription: string,
    projectDeadline: number,
    projectMembers: string[],
    projectTasks: Task[]=[],

  ) {
    this.projectID = projectID;
    this.projectTitle = projectTitle;
    this.projectURL = `${baseURL}/${this.projectID}.json`;
    this._projectDescription = projectDescription;
    this._projectDeadline = projectDeadline;
    this._projectMembers = projectMembers;
    this._projectTasks = projectTasks;
  }
  get projectDescription() {
    return this._projectDescription;
  }

  set projectDescription(newProjectDescription: string) {
    this._projectDescription = newProjectDescription;
  }

  get projectDeadline() {
    return this._projectDeadline;
  }
  set projectDeadline(newProjectDeadline: number) {
    this._projectDeadline = newProjectDeadline;
  }

  get projectMembers() {
    return this._projectMembers;
  }
  set projectMember(newProjectMembers: string[]) {
    this._projectMembers = newProjectMembers;
  }

  get projectTasks(): Task[] {
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks: Task[]) {
    this._projectTasks = newProjectTasks;
  }
}
