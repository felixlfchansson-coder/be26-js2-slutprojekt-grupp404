import { baseURL } from "../firebaseRequests/dataRequest.ts";
import type { MemberCategory } from "./task.ts";

export class Member {
  public readonly memberID: number;
  public readonly memberFirstName: string;
  public readonly memberSecondName: string;
  public readonly memberURL: string;
  private _memberCategory: MemberCategory;
  private _memberTasks: string[];
  private _memberProjects: string[];

  constructor(
    memberID: number,
    memberFirstName: string,
    memberSecondName: string,
    memberCategory: MemberCategory,
    memberTasks: string[],
    memberProjects: string[],
  ) {
    this.memberID = memberID;
    this.memberFirstName = memberFirstName;
    this.memberSecondName = memberSecondName;
    this.memberURL = `${baseURL}/${this.memberID}.json`;
    this._memberCategory = memberCategory;
    this._memberTasks = memberTasks;
    this._memberProjects = memberProjects;
  }

  get memberCategory() {
    return this._memberCategory;
  }

  set memberCategory(newmemberCategory) {
    this._memberCategory = newmemberCategory;
  }

  get memberTasks() {
    return this._memberTasks;
  }

  set memberTasks(newmemberTasks) {
    this._memberTasks = newmemberTasks;
  }

  get memberProjects() {
    return this._memberProjects;
  }
  set memberProjects(newmemberProjects) {
    this._memberProjects = newmemberProjects;
  }
}

