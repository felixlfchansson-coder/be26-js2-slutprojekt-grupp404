export function renderProject(project: any) {
    // TODO: Byt ut any och uppdatera property-namnen när Project class/type är klar

    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    projectElement.innerHTML = `
        <div class="project__header">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
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