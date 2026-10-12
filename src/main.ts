
import "./styles/style.css";
import { createIcons, ChartNoAxesColumnIncreasing, UserRoundPlus, CalendarDays, Folder } from "lucide";
import { renderProjects } from "./ui/renderProjects.ts";
import { getData  } from "./modules/firebaseRequest.ts";
import { Project } from "./model/Project.ts";
import { Member } from "./model/Members.ts";
import type {MemberCategory,TaskPriority, TaskStatus } from "./model/Task.ts"
import {Task } from "./model/Task.ts";
import { initProjectController } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";

createIcons({
  icons: {
    ChartNoAxesColumnIncreasing,
    UserRoundPlus,
    Folder,
    CalendarDays
  },
});


async function init() {
    initProjectController();
    initTaskController();
    
    const projects = await getData("projects");

    console.log(projects);
    console.log("TASKS FRÅN FIREBASE:", projects.tasks);

    renderProjects(projects);
}

init();
