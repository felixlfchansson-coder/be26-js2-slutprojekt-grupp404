import { baseURL } from "../modules/firebaseRequests.ts";
import type { MemberCategory } from "./task.ts";
export type MemberNames = "Felix" | "Ash" | "Tatiana";

export class User {
  public readonly userID: number;
  public readonly userName: MemberNames;
  public readonly url: string;
  private _userCategory: MemberCategory;
  private _userTasks: number;
  private _userProjects: string[];

  constructor(
    userID: number,
    userName: MemberNames,
    userCategory: MemberCategory,
    userTasks: number,
    userProjects: string[],
  ) {
    this.userID = userID;
    this.userName = userName;
    this.url = `${baseURL}/${this.userID}.json`;
    this._userCategory = userCategory;
    this._userTasks = userTasks;
    this._userProjects = userProjects;
  }

  get userCategory() {
    return this._userCategory;
  }

  set userCategory(newUserCategory) {
    this._userCategory = newUserCategory;
  }

  get userTasks() {
    return this._userTasks;
  }

  set userTasks(newUserTasks) {
    this._userTasks = newUserTasks;
  }

  get userProjects() {
    return this._userProjects;
  }
  set userProjects(newUserProjects) {
    this._userProjects = newUserProjects;
  }
}

