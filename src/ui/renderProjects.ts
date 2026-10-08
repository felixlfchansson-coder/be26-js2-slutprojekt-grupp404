import type { Project } from "../model/Project";
import { renderProject } from "./renderProject";

export function renderProjects(projects: Record<string, Project>) {
    const projectsContainer = document.getElementById("projects-container");

    if (projectsContainer) {
        projectsContainer.innerHTML = "";

       Object.entries(projects).forEach(([key, project], index) => {
            const projectElement = renderProject(project as Project, index);
            projectsContainer.appendChild(projectElement);
        });
    }
}
