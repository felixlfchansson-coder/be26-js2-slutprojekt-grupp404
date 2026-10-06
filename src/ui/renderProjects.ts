import { renderProject } from "./renderProject";


export function renderProjects(projects: any) {
    const projectsContainer = document.getElementById("projects-container");

    if (projectsContainer) {
        projectsContainer.innerHTML = "";

        Object.entries(projects).forEach(([key, project]: [string, any]) => {
            const projectElement = renderProject(project);

            projectsContainer.appendChild(projectElement);
        });
    }
}
