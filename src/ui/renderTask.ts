import type { Task } from "../model/task";

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
    `;

    taskElement.querySelector<HTMLElement>(".task__title")!.textContent =
        task.taskTitle;

const priorityElement =
    taskElement.querySelector<HTMLElement>(".task__priority")!;

const priorityLabels = {
    High: "Hög",
    Medium: "Medel",
    Low: "Låg"
};

priorityElement.textContent = priorityLabels[task.taskPriority];
priorityElement.classList.add(
    `task__priority--${task.taskPriority.toLowerCase()}`
);

    taskElement.querySelector<HTMLElement>(".task__description")!.textContent =
        task.taskDescription;

    taskElement.querySelector<HTMLElement>(".task__category")!.textContent =
        task.taskCategory;

    taskElement.querySelector<HTMLElement>(".task__deadline")!.textContent =
        `📅 ${formatDeadline(task.taskDeadline)}`;

    return taskElement;
}

function formatDeadline(deadline: number): string {
    const date = String(deadline).padStart(6, "0");

    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = `20${date.slice(4, 6)}`;

    return `${day}/${month}/${year}`;
}