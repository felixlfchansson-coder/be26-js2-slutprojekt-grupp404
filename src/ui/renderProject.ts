
import { renderTask } from "./renderTask";
import type { Task } from "../model/Task";
import { setupDescriptionToggle } from "./descriptionToggle";
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
    CircleCheck,
    UserRoundPlus,
    Pencil,
    Trash2
} from "lucide";

function formatDeadline(deadline: number): string {
    const value = String(deadline);

    if (!/^\d{8}$/.test(value)) {
        return "Ingen giltig deadline";
    }

    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6));
    const day = Number(value.slice(6, 8));

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return "Ingen giltig deadline";
    }

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

            <div class="project__details">
                <button
                    class="project__toggle"
                    type="button"
                    aria-expanded="${isExpanded}"
                >
                    <span class="project__arrow"></span>
                    <span class="project__title"></span>
                </button>

                <p class="project__description"></p>
            </div>

            <div class="project__info">
                <span class="project__deadline">
                    <span class="project__deadline-icon"></span>
                    Deadline: ${formatDeadline(project.projectDeadline)}
                </span>

                <span class="project__members">
                    <span class="project__members-icon"></span>
                    <span class="project__members-text"></span>
                </span>

                <button
                    class="project__add-member"
                    type="button"
                >
                    <span class="project__add-member-icon"></span>
                    Lägg till medlem
                </button>

                <button
                    class="project__add-task"
                    type="button"
                >
                    <span class="project__add-icon"></span>
                    Lägg till task
                </button>

                <button
                    class="project__edit"
                    type="button"
                    title="Redigera projekt"
                    aria-label="Redigera projekt"
                >
                    <span class="project__edit-icon"></span>
                </button>

                <button
                    class="project__delete"
                    type="button"
                    title="Ta bort projekt"
                    aria-label="Ta bort projekt"
                >
                    <span class="project__delete-icon"></span>
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

    // Projektinformation
    projectElement.querySelector<HTMLElement>(
        ".project__title"
    )!.textContent = project.projectTitle;

    projectElement.querySelector<HTMLElement>(
        ".project__description"
    )!.textContent = project.projectDescription;

    projectElement.querySelector<HTMLElement>(
        ".project__members-text"
    )!.textContent =
        `Medlem: ${project.projectMembers ?? "Inga medlemmar"}`;

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
    function updateArrow(expanded: boolean): void {
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
    setupDescriptionToggle(projectElement, ".project__description");

    // Lägg till Lucide-ikoner
    function addIcon(
        selector: string,
        icon: typeof Plus
    ): void {
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
    addIcon(".project__add-member-icon", UserRoundPlus);

    addIcon(".project__edit-icon", Pencil);
    addIcon(".project__delete-icon", Trash2);

    addIcon(".kanban__icon--todo", ListTodo);
    addIcon(".kanban__icon--progress", Clock3);
    addIcon(".kanban__icon--done", CircleCheck);

    // Expandera eller stäng projektets Kanban
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

    // Rendera projektets tasks
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
