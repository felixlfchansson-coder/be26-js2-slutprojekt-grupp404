import { renderTask } from "../tasks/renderTask";
import { setupDescriptionToggle } from "../components/descriptionToggle";

import type { Task } from "../../model/task";
import type { ProjectData } from "../projects/projectData";

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
    const value = String(deadline).padStart(6, "0");

    let year: number;
    let month: number;
    let day: number;

    if (value.length === 8) {
        year = Number(value.slice(0, 4));
        month = Number(value.slice(4, 6));
        day = Number(value.slice(6, 8));
    } else if (value.length === 6) {
        day = Number(value.slice(0, 2));
        month = Number(value.slice(2, 4));
        year = 2000 + Number(value.slice(4, 6));
    } else {
        return "Ingen giltig deadline";
    }

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
    tasks: Task[] = []
): HTMLElement {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    const isExpanded = false;

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
                <div class="project__meta">
                    <span class="project__deadline">
                        <span class="project__deadline-icon"></span>
                        Deadline: ${formatDeadline(project.projectDeadline)}
                    </span>

                   <div class="project__members">
                    <span class="project__members-icon"></span>
                    <span class="project__members-text"></span>

                    <button
                        class="project__members-toggle"
                        type="button"
                        aria-expanded="false"
                    >
                        Visa alla medlemmar
                    </button>

                    <ul class="project__members-list" hidden></ul>
                </div>
                </div>

                <div class="project__actions">
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

   
const title = projectElement.querySelector<HTMLElement>(".project__title")!;
const description = projectElement.querySelector<HTMLElement>(".project__description")!;
const members = projectElement.querySelector<HTMLElement>(".project__members-text")!;

const toggleButton = projectElement.querySelector<HTMLButtonElement>(".project__toggle");
const kanban = projectElement.querySelector<HTMLElement>(".kanban");
const arrow = projectElement.querySelector<HTMLElement>(".project__arrow");

title.textContent = project.projectTitle;
description.textContent = project.projectDescription;

const projectMembers = project.projectMembers ?? [];

const membersToggle = projectElement.querySelector<HTMLButtonElement>(
    ".project__members-toggle"
)!;

const membersList = projectElement.querySelector<HTMLUListElement>(
    ".project__members-list"
)!;

members.textContent = `Medlemmar: ${projectMembers.length}`;

if (projectMembers.length === 0) {
    membersToggle.hidden = true;
    membersList.hidden = true;
} else {
    projectMembers.forEach(member => {
        const listItem = document.createElement("li");

        // Projektmedlemmar sparas som "Namn, kategori"
        const memberName = member.split(",")[0].trim();

        // Räkna pågående tasks för medlemmen i detta projekt
       const ongoingTasks = tasks.filter(task =>
            task.taskStatus === "In Progress" &&
            (task.taskMembers ?? []).some(assignedMember =>
                assignedMember.split(",")[0].trim() === memberName
            )
        ).length;

        const memberText = document.createElement("span");
        memberText.textContent = member;

        const taskCount = document.createElement("span");
        taskCount.classList.add("project__member-task-count");
        taskCount.textContent = `${ongoingTasks} pågående`;

        listItem.append(memberText, taskCount);
        membersList.appendChild(listItem);
    });

    membersToggle.addEventListener("click", () => {
        membersList.hidden = !membersList.hidden;

        const expanded = !membersList.hidden;

        membersToggle.setAttribute(
            "aria-expanded",
            String(expanded)
        );

        membersToggle.textContent = expanded
            ? "Dölj medlemmar"
            : "Visa alla medlemmar";
    });
}

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

    function addIcon(
        selector: string,
        icon: typeof Plus
    ): void {
        const element = projectElement.querySelector(selector);

        if (!element) return;

        element.appendChild(
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

    setupDescriptionToggle(projectElement, ".project__description");
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

        const taskList = projectElement.querySelector<HTMLElement>(
            columnSelector
        );

        if (!taskList) return;

        taskList.appendChild(renderTask(task));

        const column = taskList.closest(".kanban__column");
        const counter = column?.querySelector<HTMLElement>(".kanban__count");

        if (counter) {
            counter.textContent = String(taskList.children.length);
        }
    });
}


export function renderError(
    message: string,
    element: HTMLElement
): void {
    element.innerHTML = `<p>${message}</p>`;
}
