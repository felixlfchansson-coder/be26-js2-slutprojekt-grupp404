import { baseURL } from "../modules/firebaseRequest.ts";
import type {MemberCategory} from "./task";
import type {Task } from "./task.ts";
//This is a draft for the class, and we can change the properties if you think they are inadequate

export class Project {
  public readonly projectID: number;
  public readonly projectName: string;
  public readonly projectURL: string;
  private _projectDescription: string;
  private _projectDeadline: number;
  private _projectMember: MemberCategory;
  //Not sure about having Task as the type...
  private _projectTasks: Task;

  constructor(
    projectID: number,
    projectName: string,
    projectDescription: string,
    projectDeadline: number,
    projectMember: MemberCategory,
    projectTasks: Task,
  ) {
    this.projectID = projectID;
    this.projectName = projectName;
    this.projectURL = `${baseURL}/${this.projectID}.json`;
    this._projectDescription = projectDescription;
    this._projectDeadline = projectDeadline;
    this._projectMember = projectMember;
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

  get projectMember() {
    return this._projectMember;
  }
  set projectMember(newProjectMember: MemberCategory) {
    this._projectMember = newProjectMember;
  }

  get projectTasks() {
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks: Task) {
    this._projectTasks = newProjectTasks;
  }
}
