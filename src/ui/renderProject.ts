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

export function renderProject(project: Project) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
        <div class="project__header">
            <div>
                <h3>${project.projectTitle}</h3>
                <p>${project.projectDescription}</p>
            </div>

           <div class="project__info">
            <span>Deadline: ${formatDeadline(project.projectDeadline)}</span>
            <span>Medlem: ${project.projectMembers}</span>
        </div>
        </div>

        <div class="kanban">
            <section class="kanban__column kanban__column--todo">
                <h4>Att göra</h4>
                <div class="task-list task-list--todo"></div>
            </section>

            <section class="kanban__column kanban__column--progress">
                <h4>Pågående</h4>
                <div class="task-list task-list--progress"></div>
            </section>

            <section class="kanban__column kanban__column--done">
                <h4>Klart</h4>
                <div class="task-list task-list--done"></div>
            </section>
        </div>
    `;

    return projectElement;
}