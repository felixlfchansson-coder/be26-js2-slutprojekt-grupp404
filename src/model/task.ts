import { baseURL } from "../modules/firebaseRequest.ts";
export type MemberCategory = "frontend" | "backend" | "ux";
export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Completed";

export class Task {
  public readonly taskID: string;
  public readonly taskTitle: string;
  public readonly taskURL: string;
  private _taskDescription: string;
  private _taskMembers: string[];
  private _taskCategory: MemberCategory;
  private _taskStatus: TaskStatus;
  private _taskPriority: TaskPriority;
  private _taskDeadline: number;
  public readonly taskCreationDate: number;

  constructor(
    taskID: string,
    taskTitle: string,
    taskDescription: string,
    taskMembers: string[],
    taskCategory: MemberCategory,
    taskStatus: TaskStatus,
    taskPriority: TaskPriority,
    taskDeadline: number,
    taskCreationDate: number,
    projectID: string,
  ) {
    this.taskID = taskID;
    this.taskTitle = taskTitle;
    this.taskURL = `${baseURL}/projects/${projectID}tasks${taskID}.json`;
    this._taskDescription = taskDescription;
    this._taskMembers = taskMembers;
    this._taskCategory = taskCategory;
    this._taskStatus = taskStatus;
    this._taskPriority = taskPriority;
    this._taskDeadline = taskDeadline;
    this.taskCreationDate = taskCreationDate;
  }

  get taskDescription() {
    return this._taskDescription;
  }

  set taskDescription(newTaskDescription: string) {
    this._taskDescription = newTaskDescription;
  }

  get taskMembers() {
    return this._taskMembers;
  }

  set taskMembers(newTaskMember: string[]) {
    this._taskMembers = newTaskMember;
  }

  get taskCategory() {
    return this._taskCategory;
  }

  set taskCategory(newTaskCategory) {
    this._taskCategory = newTaskCategory;
  }

  get taskStatus() {
    return this._taskStatus;
  }

  set taskStatus(newTaskStatus) {
    this._taskStatus = newTaskStatus;
  }

  get taskPriority() {
    return this._taskPriority;
  }

  set taskPriority(newTaskPriority) {
    this._taskPriority = newTaskPriority;
  }

  get taskDeadline() {
    return this._taskDeadline;
  }
  set taskDeadline(newTaskDeadline) {
    this._taskDeadline = newTaskDeadline;
  }
}
