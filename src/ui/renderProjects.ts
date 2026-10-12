import { renderProject } from "./renderProject";
import {
    Task,
    type MemberCategory,
    type TaskPriority,
    type TaskStatus
} from "../model/task";
type FirebaseTask = {
    taskTitle: string;
    taskDescription: string;
    taskCategory: MemberCategory;
    taskPriority: TaskPriority;
    taskStatus: TaskStatus;
    taskDeadline: number;
    taskMember?: string[];
    taskCreationDate?: number;
};

type FirebaseProject = {
    projectTitle: string;
    projectDescription: string;
    projectDeadline: number;
    projectMembers?: string[];
    tasks?: Record<string, FirebaseTask>;
};

export function renderProjects(projects: Record<string, FirebaseProject>) {
    const projectsContainer = document.getElementById("projects-container");

    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    Object.entries(projects)
        .filter(([projectID]) => projectID !== "tasks")
        .forEach(([projectID, project], index) => {
            console.log("PROJEKT:", projectID);
console.log("TASKS FRÅN PROJEKTET:", project.tasks);
            const tasks = Object.entries(project.tasks ?? {})
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
    task.taskMember ?? [],
    task.taskCategory,
    status,
    priority,
    task.taskDeadline,
    task.taskCreationDate ?? Date.now(),
    projectID
);
                });

            const projectElement = renderProject(project, index, tasks);

            projectElement.dataset.projectId = projectID;

            projectsContainer.appendChild(projectElement);
        });
}