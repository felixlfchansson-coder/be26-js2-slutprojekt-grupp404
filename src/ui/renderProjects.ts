import type { Project } from "../model/Project";
import { renderProject } from "./renderProject";

export function renderProjects(projects: Record<string, Project>) {
    const projectsContainer = document.getElementById("projects-container");

    if (projectsContainer) {
        projectsContainer.innerHTML = "";

        Object.entries(projects).forEach(([key, project]) => {
            const projectElement = renderProject(project);

            projectsContainer.appendChild(projectElement);
        });
    }
}
