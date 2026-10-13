
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
    Check,
    Home,
    Sparkles,
    Plus,
    ArrowRight,
    FolderKanban,
    ListChecks,
    ListTodo,
    Activity
} from "lucide";

import { homePage } from "./Pages/homePage";
import { projectPage } from "./Pages/projectPage";
import { membersPage } from "./Pages/membersPage";

import { renderProjects } from "./ui/renderProjects.ts";
import { renderMembers } from "./ui/renderMembers";
import { renderHomeContent } from "./ui/renderHomeContent.ts";

import { getData } from "./modules/firebaseRequest.ts";

import { initProjectController } from "./controllers/projectController";
import { initTaskController } from "./controllers/taskController";
import { initNewMemberController, addMembersToProject } from "./controllers/memberController.ts";
import { renderHome } from "./ui/renderHome";


/* ==========================================
   LUCIDE ICONS
========================================== */

function renderIcons() {
    createIcons({
        icons: {
            ChartNoAxesColumnIncreasing,
            Home,
            UserRoundPlus,
            UserRound,
            UsersRound,
            BriefcaseBusiness,
            Folder,
            CalendarDays,
            X,
            Check,
            Sparkles,
            Plus,
            ArrowRight,
            FolderKanban,
            ListChecks,
            ListTodo,
            Activity
        },
        attrs: {
            "stroke-width": 1.8
        }
    });
}

async function init() {
    const app = document.getElementById("app");

    const navHome = document.getElementById("nav-home");
    const navProjects = document.getElementById("nav-projects");
    const navMembers = document.getElementById("nav-members");

    if (!app || !navHome || !navProjects || !navMembers) {
        return;
    }


    initProjectController();
    initTaskController();
    initNewMemberController();
    addMembersToProject()

    function setActiveNav(activeNav: HTMLElement) {
        if (!navHome || !navProjects || !navMembers) {
            return;
        }

        navHome.classList.remove("sidebar__link--active");
        navProjects.classList.remove("sidebar__link--active");
        navMembers.classList.remove("sidebar__link--active");

        activeNav.classList.add("sidebar__link--active");
    }


   
      async function showHome() {
      if (!app || !navHome) return;

      app.replaceChildren(homePage());

      renderIcons();
      setActiveNav(navHome);

      await Promise.all([
          renderHome(),
          renderHomeContent()
      ]);
  }



    async function showProjects() {
        if (!app) return;

        app.replaceChildren(projectPage());

        renderIcons();
        setActiveNav(navProjects!);

        const projects = await getData("projects");

        if (!app.querySelector("#projects-container")) {
            return;
        }

        renderProjects(projects);

        renderIcons();
    }


    async function showMembers() {
        if (!app) return;

        app.replaceChildren(membersPage());

        renderIcons();
        setActiveNav(navMembers!);

        const members = await getData("members");

        if (!app.querySelector("#members-container")) {
            return;
        }

        renderMembers(members);

        renderIcons();
    }


    showHome();


    navHome.addEventListener("click", (event) => {
        event.preventDefault();

        showHome();
    });

    navProjects.addEventListener("click", async (event) => {
        event.preventDefault();

        await showProjects();
    });

    navMembers.addEventListener("click", async (event) => {
        event.preventDefault();

        await showMembers();
    });

    document.getElementById("app")?.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    if (
        target.closest("#home-view-projects") ||
        target.closest("#home-all-projects")
    ) {
        navProjects.click();
    }
});
}


init();
