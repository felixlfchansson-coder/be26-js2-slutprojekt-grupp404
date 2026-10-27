import { getData } from "../../firebaseRequests/dataRequest";
import { renderProject } from "./renderProject.ts";

import {
    Task,
    type MemberCategory,
    type TaskPriority,
    type TaskStatus
} from "../../model/task.ts";

import {
    filterTasksByCategory,
    filterTasksByMember
} from "../../controllers/filter.ts";

import {
    sortTasksAZ,
    sortTasksZA,
    sortTasksByClosestDate,
    sortTasksByFarthestDate
} from "../../controllers/sort.ts";


type FirebaseTask = {
    taskTitle: string;
    taskDescription: string;
    taskCategory: MemberCategory;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    taskDeadline: number;
    taskMembers?: string[];
    taskCreationDate?: number;
    taskCompleteDate?: number;
};

type FirebaseProject = {
    projectTitle: string;
    projectDescription: string;
    projectDeadline: number;
    projectMembers?: string[];
    tasks?: Record<string, FirebaseTask>;
};

type FirebaseMember = {
    firstName: string;
    secondName: string;
    category: MemberCategory;
};


let sortOrder = "sortAZ";
let filterCategory = "all";
let filterMember = "all";

let projectsData: Record<string, FirebaseProject> = {};


async function updateMemberDropdown(): Promise<void> {
    const select = document.getElementById(
        "member-filter"
    ) as HTMLSelectElement | null;

    if (!select || select.dataset.loaded === "true") return;

    const members = await getData("members") as Record<string, FirebaseMember>;

    Object.values(members).forEach((member) => {
        const name =
            `${member.firstName} ${member.secondName}, ${member.category}`;

        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        select.appendChild(option);
    });

    select.dataset.loaded = "true";
}


function createProjectTasks(
    projectID: string,
    project: FirebaseProject
): Task[] {
    return Object.entries(project.tasks ?? {})
        .filter(([, task]) => Boolean(task?.taskTitle))
        .map(([taskID, task]) => {
            const status =
                task.taskStatus === "In Progress" ||
                task.taskStatus === "Completed"
                    ? task.taskStatus
                    : "To Do";

            const priority =
                task.taskPriority === "High" ||
                task.taskPriority === "Medium" ||
                task.taskPriority === "Low"
                    ? task.taskPriority
                    : task.taskPriority === "1"
                        ? "High"
                        : task.taskPriority === "2"
                            ? "Medium"
                            : "Low";

            return new Task(
                taskID,
                task.taskTitle,
                task.taskDescription ?? "",
                task.taskMembers ?? [],
                task.taskCategory,
                status,
                priority,
                task.taskDeadline,
                task.taskCreationDate ?? Date.now(),
                task.taskCompleteDate ?? 0,
                projectID
            );
        });
}


function sortProjectTasks(tasks: Task[]): Task[] {
    switch (sortOrder) {
        case "sortAZ":
            return sortTasksAZ(tasks);

        case "sortZA":
            return sortTasksZA(tasks);

        case "closestDeadline":
            return sortTasksByClosestDate(tasks);

        default:
            return sortTasksByFarthestDate(tasks);
    }
}


function filterProjectTasks(tasks: Task[]): Task[] {
    const tasksByCategory = filterTasksByCategory(
        tasks,
        filterCategory
    );

    return filterTasksByMember(
        tasksByCategory,
        filterMember
    );
}


export function renderProjects(
    projects: Record<string, FirebaseProject>
): void {
    const container = document.getElementById("projects-container");

    projectsData = projects;

    if (!container) return;

    void updateMemberDropdown();

    // Spara vilka projekt som är öppna före uppdateringen
    const openProjectIDs = new Set<string>();

    container.querySelectorAll<HTMLElement>(".project").forEach(project => {
        const toggle = project.querySelector<HTMLButtonElement>(
            ".project__toggle"
        );

        if (toggle?.getAttribute("aria-expanded") === "true") {
            const projectID = project.dataset.projectId;

            if (projectID) {
                openProjectIDs.add(projectID);
            }
        }
    });

    // Bygg om projektlistan med aktuell data
    container.replaceChildren();

    Object.entries(projects)
        .filter(([projectID]) => projectID !== "tasks")
        .forEach(([projectID, project]) => {
            const tasks = createProjectTasks(projectID, project);
            const sortedTasks = sortProjectTasks(tasks);
            const filteredTasks = filterProjectTasks(sortedTasks);

            const projectElement = renderProject(
                project,
                filteredTasks
            );

            projectElement.dataset.projectId = projectID;

            // Återställ projekt som var öppna
            if (openProjectIDs.has(projectID)) {
                const toggle = projectElement.querySelector<HTMLButtonElement>(
                    ".project__toggle"
                );

                toggle?.click();
            }

            container.appendChild(projectElement);
        });
}


document.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLSelectElement)) return;

    switch (target.id) {
        case "project-sort":
            sortOrder = target.value;
            break;

        case "member-filter":
            filterMember = target.value;
            break;

        case "category-filter":
            filterCategory = target.value;
            break;

        default:
            return;
    }

    renderProjects(projectsData);
});


export async function refreshProjects(): Promise<void> {
    const projects = await getData("projects");

    renderProjects(projects ?? {});
}
