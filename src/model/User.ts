import { baseURL } from "../modules/firebaseRequest.ts";
import type { MemberCategory } from "./task.ts";
//do we need this union type (MemberNames)?
//Should i replace it by string[]?
export type MemberNames = "Felix" | "Ash" | "Tatiana";

export class Member {
  public readonly memberID: number;
  public readonly memberName: MemberNames;
  public readonly memberURL: string;
  private _memberCategory: MemberCategory;
  private _memberTasks: number;
  private _memberProjects: string[];

  constructor(
    memberID: number,
    memberName: MemberNames,
    memberCategory: MemberCategory,
    memberTasks: number,
    memberProjects: string[],
  ) {
    this.memberID = memberID;
    this.memberName = memberName;
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

