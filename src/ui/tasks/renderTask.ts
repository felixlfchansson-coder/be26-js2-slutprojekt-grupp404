
import type { Task } from "../../model/task";
import { setupDescriptionToggle } from "../components/descriptionToggle";

import {
    createElement,
    UserRoundPlus,
    Check,
    Trash2,
    Pencil
} from "lucide";


export function renderTask(task: Task): HTMLElement {
    const taskElement = document.createElement("article");

    taskElement.classList.add("task");
    taskElement.dataset.taskId = task.taskID;

    taskElement.innerHTML = `
        <div class="task__header">
            <h5 class="task__title"></h5>
            <span class="task__priority"></span>
        </div>

        <p class="task__description"></p>

        <div class="task__footer">
            <span class="task__category"></span>
            <span class="task__deadline"></span>
        </div>

        <div class="task__actions"></div>
    `;

    const title = taskElement.querySelector<HTMLElement>(".task__title")!;
    const priority = taskElement.querySelector<HTMLElement>(".task__priority")!;
    const description = taskElement.querySelector<HTMLElement>(".task__description")!;
    const category = taskElement.querySelector<HTMLElement>(".task__category")!;
    const deadline = taskElement.querySelector<HTMLElement>(".task__deadline")!;
    const actions = taskElement.querySelector<HTMLElement>(".task__actions")!;

    const priorityLabels: Record<string, string> = {
        High: "Hög",
        Medium: "Medel",
        Low: "Låg"
    };

    title.textContent = task.taskTitle;
    description.textContent = task.taskDescription;
    category.textContent = task.taskCategory;

    priority.textContent =
        priorityLabels[task.taskPriority] ?? task.taskPriority;

    priority.classList.add(
        `task__priority--${task.taskPriority.toLowerCase()}`
    );

    if (task.taskStatus === "To Do" || task.taskStatus === "In Progress") {
        deadline.textContent = `📅 ${formatDeadline(task.taskDeadline)}`;
    }

    if (task.taskStatus === "Completed") {
        deadline.textContent = task.taskCompleteDate
            ? `Completed on: 📅 ${formatCompleteDate(task.taskCompleteDate)}`
            : "Completed";
    }

    actions.appendChild(
        createActionButton("edit", "Redigera uppgift", Pencil)
    );

    if (task.taskStatus === "To Do") {
        actions.appendChild(
            createActionButton("assign", "Tilldela task", UserRoundPlus)
        );
    }

    if (task.taskStatus === "In Progress") {
        actions.appendChild(
            createActionButton("complete", "Markera klar", Check)
        );
    }

    actions.appendChild(
        createActionButton("delete", "Ta bort task", Trash2)
    );

    setupDescriptionToggle(taskElement, ".task__description");

    return taskElement;
}


function createActionButton(
    action: string,
    label: string,
    icon: typeof Trash2
): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `task__action task__action--${action}`;
    button.dataset.action = action;
    button.title = label;
    button.setAttribute("aria-label", label);

    button.appendChild(
        createElement(icon, {
            width: 15,
            height: 15
        })
    );

    return button;
}


export function formatDeadline(deadline: number): string {
    const date = String(deadline).padStart(6, "0");

    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = `20${date.slice(4, 6)}`;

    return `${day}/${month}/${year}`;
}


function formatCompleteDate(completeDate: number): string {
    const date = String(completeDate);

    if (date.length === 6) {
        const day = date.slice(0, 2);
        const month = date.slice(2, 4);
        const year = `20${date.slice(4, 6)}`;

        return `${day}/${month}/${year}`;
    }

    if (date.length === 8) {
        const day = date.slice(0, 2);
        const month = date.slice(2, 4);
        const year = date.slice(4, 8);

        return `${day}/${month}/${year}`;
    }

    return "Okänt datum";
}
