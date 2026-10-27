import type { FirebaseProject } from "../../model/HomeType.ts";

import {
    createHomeCard,
    renderEmptyMessage,
    parseHomeDeadline
} from "./homeContentHelpers.ts";

export function renderHomeProjects(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    if (projects.length === 0) {
        renderEmptyMessage(container, "Inga projekt att visa ännu.");
        return;
    }

    projects.forEach((project) => {
        const ongoingTasks = Object.values(project.tasks ?? {})
            .filter(task => task.taskStatus === "In Progress")
            .length;

        const projectMembers = project.projectMembers ?? [];

        const memberCount = Array.isArray(projectMembers)
            ? projectMembers.length
            : projectMembers.split(",")
                .filter(member => member.trim())
                .length;

        const deadlineDate = parseHomeDeadline(
            project.projectDeadline,
            "project"
        );

        const deadline = deadlineDate
            ? deadlineDate.toLocaleDateString("sv-SE")
            : "Ingen deadline";

        container.appendChild(
            createHomeCard(
                project.projectTitle,
                `${ongoingTasks} pågående uppgifter · ${memberCount} medlemmar · Deadline: ${deadline}`
            )
        );
    });
}
