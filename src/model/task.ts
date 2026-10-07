import { baseURL } from "../modules/firebaseRequests.ts"
export type MemberCategory = "frontend" | "backend" | "ux";
export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Completed";

export class Task {
  public readonly taskID: string;
  public readonly taskTitle: string;
  public readonly taskURL: string;
  private _taskDescription: string;
  //added taskMember as one should be able to assign a task to a member. Don't know if the type is correct thought...
  private _taskMember:string[];
  private _taskCategory: MemberCategory;
  private _taskStatus: TaskStatus;
  private _taskPriority: TaskPriority;
  private _taskDeadline: number;
  public readonly taskCreationDate: number;

  constructor(
    taskID:string,
    taskTitle:string,
    taskDescription: string,
    taskMember:string[],
    taskCategory:MemberCategory,
    taskStatus: TaskStatus,
    taskPriority:TaskPriority,
    taskDeadline:number,
    taskCreationDate:number,
    
  ){

    this.taskID=taskID;
    this.taskTitle=taskTitle;
    this.taskURL=`${baseURL}/${this.taskID}.json`;
    this._taskDescription=taskDescription;
    this._taskMember=taskMember
    this._taskCategory=taskCategory;
    this._taskStatus=taskStatus;
    this._taskPriority=taskPriority;
    this._taskDeadline=taskDeadline;
    this.taskCreationDate=taskCreationDate;
  }

  get taskDescription(){
    return this._taskDescription
  
  }

  set taskDescription(newTaskDescription:string){
    this._taskDescription=newTaskDescription
  }

  get taskMember(){
    return this._taskMember
  }

  set taskMember(newTaskMember){
    this._taskMember=newTaskMember
  }

  get taskCategory(){
    return this._taskCategory
  }

  set taskCategory(newTaskCategory){
    this._taskCategory=newTaskCategory
  }

  get taskStatus(){
    return this._taskStatus
  }

  set taskStatus(newTaskStatus){
    this._taskStatus=newTaskStatus
  }

  get taskPriority(){
    return this._taskPriority
  }

  set taskPriority(newTaskPriority){
    this._taskPriority=newTaskPriority
  }

  get taskDeadline(){
    return this._taskDeadline
  }
  set taskDeadline (newTaskDeadline){
    this._taskDeadline=newTaskDeadline
  }
}
