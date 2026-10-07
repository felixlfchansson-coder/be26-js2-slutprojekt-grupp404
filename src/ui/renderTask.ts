import type { Task } from "../model/task";

export function renderTask(task: Task) {
    const taskElement = document.createElement("article");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <div class="task__header">
            <h5>${task.taskTitle}</h5>
            <span class="task__priority">
                Prioritet ${task.taskPriority}
            </span>
        </div>

        <p class="task__description">
            ${task.taskDescription}
        </p>

        <div class="task__footer">
            <span>${task.taskCategory}</span>
            <span>Deadline: ${task.taskDeadline}</span>
        </div>
    `;

    return taskElement;
}