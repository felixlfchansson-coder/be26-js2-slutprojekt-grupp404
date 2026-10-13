
import { renderTask } from "./renderTask";
import type { Task } from "../model/Task";
import type { ProjectData } from "./projectData";

import {
    createElement,
    ChevronDown,
    ChevronRight,
    CalendarDays,
    UsersRound,
    Plus,
    ListTodo,
    Clock3,
    CircleCheck
} from "lucide";

function formatDeadline(deadline: number): string {
    const value = deadline.toString().padStart(6, "0");

    const day = value.slice(0, 2);
    const month = value.slice(2, 4);
    const year = `20${value.slice(4, 6)}`;

    const date = new Date(`${year}-${month}-${day}`);

    return date.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

export function renderProject(
    project: ProjectData,
    index: number,
    tasks: Task[] = []
): HTMLElement {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    const isExpanded = index === 0;

    projectElement.innerHTML = `
        <div class="project__header">
            <div>
                <button
                    class="project__toggle"
                    type="button"
                    aria-expanded="${isExpanded}"
                >
                    <span class="project__arrow"></span>
                    <span>${project.projectTitle}</span>
                </button>

                <p>${project.projectDescription}</p>
            </div>

            <div class="project__info">
                <span class="project__deadline">
                    <span class="project__deadline-icon"></span>
                    Deadline: ${formatDeadline(project.projectDeadline)}
                </span>

                <span class="project__members">
                    <span class="project__members-icon"></span>
                    Medlem: ${project.projectMembers ?? "Inga medlemmar"}
                </span>

                <button
                    class="project__add-task"
                    type="button"
                >
                    <span class="project__add-icon"></span>
                    Lägg till task
                </button>
            </div>
        </div>

        <div class="kanban" ${isExpanded ? "" : "hidden"}>

            <section class="kanban__column kanban__column--todo">
              <div class="kanban__header">
                <h4>
                    <span class="kanban__icon kanban__icon--todo"></span>
                    Att göra
                </h4>
                <span class="kanban__count">0</span>
            </div>

                <div class="task-list task-list--todo"></div>
                <p class="kanban__empty">Inga tasks ännu</p>
            </section>

            <section class="kanban__column kanban__column--progress">
                <div class="kanban__header">
                    <h4>
                        <span class="kanban__icon kanban__icon--progress"></span>
                        Pågående
                    </h4>
                    <span class="kanban__count">0</span>
                </div>

                <div class="task-list task-list--progress"></div>
                <p class="kanban__empty">Inga tasks ännu</p>
            </section>

            <section class="kanban__column kanban__column--done">
                <div class="kanban__header">
                    <h4>
                        <span class="kanban__icon kanban__icon--done"></span>
                        Klart
                    </h4>
                    <span class="kanban__count">0</span>
                </div>

                <div class="task-list task-list--done"></div>
                <p class="kanban__empty">Inga tasks ännu</p>
            </section>

        </div>
    `;

    // Hämta element för expandering
    const toggleButton =
        projectElement.querySelector<HTMLButtonElement>(
            ".project__toggle"
        );

    const kanban =
        projectElement.querySelector<HTMLElement>(".kanban");

    const arrow =
        projectElement.querySelector<HTMLElement>(
            ".project__arrow"
        );

    // Uppdatera pilen beroende på om projektet är öppet
    function updateArrow(expanded: boolean) {
        if (!arrow) return;

        arrow.replaceChildren(
            createElement(
                expanded ? ChevronDown : ChevronRight,
                {
                    width: 18,
                    height: 18
                }
            )
        );
    }

    // Lägg till Lucide-ikoner
    function addIcon(
        selector: string,
        icon: typeof Plus
    ) {
        const element = projectElement.querySelector(selector);

        element?.appendChild(
            createElement(icon, {
                width: 16,
                height: 16
            })
        );
    }

    updateArrow(isExpanded);

    addIcon(".project__deadline-icon", CalendarDays);
    addIcon(".project__members-icon", UsersRound);
    addIcon(".project__add-icon", Plus);
    addIcon(".kanban__icon--todo", ListTodo);
    addIcon(".kanban__icon--progress", Clock3);
    addIcon(".kanban__icon--done", CircleCheck);

    toggleButton?.addEventListener("click", () => {
        if (!kanban) return;

        kanban.hidden = !kanban.hidden;

        const expanded = !kanban.hidden;

        toggleButton.setAttribute(
            "aria-expanded",
            String(expanded)
        );

        updateArrow(expanded);
    });


    renderProjectTasks(projectElement, tasks);

    return projectElement;
}

function renderProjectTasks(
    projectElement: HTMLElement,
    tasks: Task[]
): void {
    tasks.forEach((task) => {
        let columnSelector: string;

        switch (task.taskStatus) {
            case "To Do":
                columnSelector = ".task-list--todo";
                break;

            case "In Progress":
                columnSelector = ".task-list--progress";
                break;

            case "Completed":
                columnSelector = ".task-list--done";
                break;

            default:
                console.warn(
                    "Okänd task-status:",
                    task.taskStatus
                );
                return;
        }

        const taskList =
            projectElement.querySelector<HTMLElement>(
                columnSelector
            );

        if (!taskList) return;

    
        taskList.appendChild(renderTask(task));

        const column = taskList.closest(".kanban__column");

        const counter =
            column?.querySelector<HTMLElement>(
                ".kanban__count"
            );

        if (counter) {
            counter.textContent = String(
                taskList.children.length
            );
        }
    });
}
