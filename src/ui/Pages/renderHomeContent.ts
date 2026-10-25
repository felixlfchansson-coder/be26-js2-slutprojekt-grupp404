
import { getData } from "../../modules/firebaseRequest.ts";

import type {
    FirebaseProject,
    FirebaseMember
} from "../../model/HomeType.ts";

import { renderHomeProjects } from "./renderHomeProjects.ts";
import { renderHomeTasks } from "./renderHomeTasks.ts";
import { renderHomeDeadlines } from "./renderHomeDeadlines.ts";
import { renderHomeMembers } from "./renderHomeMembers.ts";

export async function renderHomeContent(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<Record<string, FirebaseProject> | null>,
        getData("members") as Promise<Record<string, FirebaseMember> | null>
    ]);

    const projectsContainer = document.getElementById("home-projects");
    const tasksContainer = document.getElementById("home-tasks");
    const deadlinesContainer = document.getElementById("home-deadlines");
    const membersContainer = document.getElementById("home-members");

    if (
        !projectsContainer ||
        !tasksContainer ||
        !deadlinesContainer ||
        !membersContainer
    ) {
        return;
    }

    const projectList = Object.values(projects ?? {});
    const memberList = Object.values(members ?? {});

    renderHomeProjects(projectsContainer, projectList);
    renderHomeTasks(tasksContainer, projectList);
    renderHomeDeadlines(deadlinesContainer, projectList);
    renderHomeMembers(membersContainer, memberList);
}
