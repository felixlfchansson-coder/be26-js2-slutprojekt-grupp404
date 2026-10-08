
import "./styles/style.css";
//this lucide thing is creating an error for me so that i can't view the scrumboard at all...ts is angry
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";
//ts instead of js?
import { renderProjects } from "./ui/renderProjects.ts";
//ts instead of js?
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

    renderProjects(projects);
}

init();