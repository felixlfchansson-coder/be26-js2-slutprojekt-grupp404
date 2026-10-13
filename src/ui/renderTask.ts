import type { Task } from "../model/Task";
import { createElement, UserRoundPlus, UsersRound, Check, Trash2 } from "lucide";
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

    taskElement.querySelector<HTMLElement>(".task__title")!.textContent =
        task.taskTitle;

    const priorityElement =
        taskElement.querySelector<HTMLElement>(".task__priority")!;

    const priorityLabels: Record<string, string> = {
        High: "Hög",
        Medium: "Medel",
        Low: "Låg"
    };

    priorityElement.textContent =
        priorityLabels[task.taskPriority] ?? task.taskPriority;

    priorityElement.classList.add(
        `task__priority--${task.taskPriority.toLowerCase()}`
    );

    taskElement.querySelector<HTMLElement>(".task__description")!.textContent =
        task.taskDescription;

    taskElement.querySelector<HTMLElement>(".task__category")!.textContent =
        task.taskCategory;

    taskElement.querySelector<HTMLElement>(".task__deadline")!.textContent =
        `📅 ${formatDeadline(task.taskDeadline)}`;

    const actions =
        taskElement.querySelector<HTMLElement>(".task__actions")!;

    // Olika knappar beroende på taskens status
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

    button.appendChild(createElement(icon, {
        width: 15,
        height: 15
    }));

    return button;
}

function formatDeadline(deadline: number): string {
    const date = String(deadline).padStart(6, "0");

    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = `20${date.slice(4, 6)}`;

    return `${day}/${month}/${year}`;
}
