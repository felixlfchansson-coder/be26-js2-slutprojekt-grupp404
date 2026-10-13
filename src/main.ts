
import "./styles/style.css";

import {
    createIcons,
    ChartNoAxesColumnIncreasing,
    UserRoundPlus,
    UserRound,
    UsersRound,
    BriefcaseBusiness,
    CalendarDays,
    Folder,
    X,
    Check
} from "lucide";
import { renderMembers } from "./ui/renderMembers";
import { projectPage } from "./Pages/projectPage";
import { membersPage } from "./Pages/membersPage";

import { renderProjects } from "./ui/renderProjects.ts";
import { getData } from "./modules/firebaseRequest.ts";

import { initProjectController } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";
import { initNewMemberController } from "./controllers/memberController.ts";

import { addMembersToProject } from "./controllers/memberController.ts";

createIcons({
    icons: {
        ChartNoAxesColumnIncreasing,
        UserRoundPlus,
        UserRound,
        UsersRound,
        BriefcaseBusiness,
        Folder,
        CalendarDays,
        X,
        Check
    }
});

async function init() {
    const app = document.getElementById("app");

    const navProjects = document.getElementById("nav-projects");
    const navMembers = document.getElementById("nav-members");

    if (!app || !navProjects || !navMembers) return;

    app.replaceChildren(projectPage());

    initProjectController();
    initTaskController();
    initNewMemberController();
    addMembersToProject()
    
    const projects = await getData("projects");

    renderProjects(projects);

    function setActiveNav(activeNav: HTMLElement) {
    if (!navProjects || !navMembers) return;

    navProjects.classList.remove("sidebar__link--active");
    navMembers.classList.remove("sidebar__link--active");

    activeNav.classList.add("sidebar__link--active");
}

    navProjects.addEventListener("click", (event) => {
        event.preventDefault();

        app.replaceChildren(projectPage());
        renderProjects(projects);

        setActiveNav(navProjects);
    });

   navMembers.addEventListener("click", async () => {

    app.replaceChildren(membersPage());

    setActiveNav(navMembers);

    const members = await getData("members");

    if (!app.querySelector("#members-container")) return;

    renderMembers(members);
});
}

init();
