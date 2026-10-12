
import "./styles/style.css";
import {
    createIcons,
    ChartNoAxesColumnIncreasing,
    UserRoundPlus,
    UserRound,
    BriefcaseBusiness,
    CalendarDays,
    Folder,
    X,
    Check
} from "lucide";
import { renderProjects } from "./ui/renderProjects.ts";
import { getData  } from "./modules/firebaseRequest.ts";
import { initProjectController } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";
import { initNewMemberController } from "./controllers/memberController.ts";

createIcons({
    icons: {
        ChartNoAxesColumnIncreasing,
        UserRoundPlus,
        UserRound,
        BriefcaseBusiness,
        Folder,
        CalendarDays,
        X,
        Check
    }
});


async function init() {
    initProjectController();
    initTaskController();
    initNewMemberController();
    
    const projects = await getData("projects");

    console.log(projects);
    console.log("TASKS FRÅN FIREBASE:", projects.tasks);

    renderProjects(projects);
}

init();
