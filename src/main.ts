
import "./styles/style.css";
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";
import { renderProjects } from "./ui/renderProjects.ts";
import { getData  } from "./modules/firebaseRequest.ts";


import { initProjectController } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";

createIcons({
  icons: {
    House,
    ChartNoAxesColumnIncreasing,
    MessageSquare,
    Folder,
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