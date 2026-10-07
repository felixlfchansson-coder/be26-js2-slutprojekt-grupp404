import {Project } from "./modules/Project.ts";
import { User } from ".modules/User.ts";
import type {MemberCategory,TaskPriority, TaskStatus } from "./modules/task.ts"
import "./styles/style.css";
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";
import { renderProjects } from "./ui/renderProjects.js";
import { getData  } from "./modules/firebaseRequests.js";
import {Project } from "./model/Project.ts";
import type { User } from ".model/User.ts";
import type {MemberCategory,TaskPriority, TaskStatus } from "./model/task.ts"

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