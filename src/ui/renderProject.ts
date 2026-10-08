import type { Project } from "../model/Project";

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

export function renderProject(project: Project, index: number) {
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
                    <span class="project__arrow">${isExpanded ? "▼" : "▶"}</span>
                    <span>${project.projectTitle}</span>
                </button>

                <p>${project.projectDescription}</p>
            </div>

            <div class="project__info">
                <span>Deadline: ${formatDeadline(project.projectDeadline)}</span>
                <span>Medlem: ${project.projectMembers ?? "Inga medlemmar"}</span>
                <button class="project__add-task" type="button">
                    + Lägg till task
                </button>
            </div>
        </div>
      <div class="kanban" ${isExpanded ? "" : "hidden"}>

        <section class="kanban__column kanban__column--todo">
            <div class="kanban__header">
                <h4>Att göra</h4>
                <span class="kanban__count">0</span>
            </div>

            <div class="task-list task-list--todo"></div>
            <p class="kanban__empty">Inga tasks ännu</p>
        </section>

        <section class="kanban__column kanban__column--progress">
            <div class="kanban__header">
                <h4>Pågående</h4>
                <span class="kanban__count">0</span>
            </div>

            <div class="task-list task-list--progress"></div>
            <p class="kanban__empty">Inga tasks ännu</p>
        </section>

        <section class="kanban__column kanban__column--done">
            <div class="kanban__header">
                <h4>Klart</h4>
                <span class="kanban__count">0</span>
            </div>

            <div class="task-list task-list--done"></div>
            <p class="kanban__empty">Inga tasks ännu</p>
        </section>

    </div>
    `;


    const toggleButton = projectElement.querySelector<HTMLButtonElement>(
    ".project__toggle"
        );

        const kanban = projectElement.querySelector<HTMLElement>(".kanban");

        const arrow = projectElement.querySelector<HTMLElement>(
            ".project__arrow"
        );

        toggleButton?.addEventListener("click", () => {
            if (!kanban) return;

            kanban.hidden = !kanban.hidden;

            const expanded = !kanban.hidden;

            toggleButton.setAttribute("aria-expanded", String(expanded));

            if (arrow) {
                arrow.textContent = expanded ? "▼" : "▶";
            }
        });
    return projectElement;
}