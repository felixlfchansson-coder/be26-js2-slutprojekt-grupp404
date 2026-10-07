import { baseURL } from "../modules/firebaseRequests.ts";
import type {MemberCategory} from "./task";
import type {Task } from "./task.ts";
//This is a draft for the class, and we can change the properties if you think they are inadequate

export class Project {
  public readonly projectID: number;
  public readonly projectTitle: string;
  public readonly projectURL: string;
  private _projectDescription: string;
  private _projectDeadline: number;
  private _projectMembers: MemberCategory;
  //Not sure about having Task as the type...
  private _projectTasks: Task;
//Felix: i changed to tile instead of name to make it match firebase.
  constructor(
    projectID: number,
    projectTitle: string,
    projectDescription: string,
    projectDeadline: number,
    projectMembers: MemberCategory,
    projectTasks: Task,
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
  set projectMembers(newProjectMembers: MemberCategory) {
    this._projectMembers = newProjectMembers;
  }

  get projectTasks() {
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks: Task) {
    this._projectTasks = newProjectTasks;
  }
}
