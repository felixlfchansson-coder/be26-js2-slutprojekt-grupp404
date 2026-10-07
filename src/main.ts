import "./styles/style.css";
//this lucide thing is creating an error for me so that i can't view the scrumboard at all...ts is angry
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";
//ts instead of js?
import { renderProjects } from "./ui/renderProjects.js";
//ts instead of js?
import { getData  } from "./modules/firebaseRequests.js";
import { Project } from "./model/Project.ts";
import  { User } from ".model/User.ts";
import type {MemberCategory,TaskPriority, TaskStatus } from "./model/Task.ts"
import {Task } from "./model/Task.ts";

createIcons({
  icons: {
    House,
    ChartNoAxesColumnIncreasing,
    MessageSquare,
    Folder,
  },
});

async function init() {
    const projects = await getData("projects");

    console.log(projects);

    renderProjects(projects);
}

init();
