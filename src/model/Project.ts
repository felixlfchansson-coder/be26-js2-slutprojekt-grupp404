import { baseURL } from "../modules/firebaseRequest.ts";
import  {Task} from "./Task.ts";
//This is a draft for the class, and we can change the properties if you think they are inadequate

export class Project {
  public readonly projectID: number;
  public readonly projectTitle: string;
  public readonly projectURL: string;
  private _projectDescription: string;
  private _projectDeadline: number;
  
  //Ash you said to change projectMember to string[], right?
  //Should i change the member variable in the user too?
  private _projectMember: string[];
  //Not sure about having Task as the type...
  private _projectTasks: Task;
//Felix: i changed to tile instead of name to make it match firebase.
  constructor(
    projectID: number,
    projectTitle: string,
    projectDescription: string,
    projectDeadline: number,
    projectMember: string[],
    projectTasks: Task,
  ) {
    this.projectID = projectID;
    this.projectTitle = projectTitle;
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
  set projectMember(newProjectMember: string[]) {
    this._projectMember = newProjectMember;
  }

  get projectTasks() {
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks: Task) {
    this._projectTasks = newProjectTasks;
  }
}
