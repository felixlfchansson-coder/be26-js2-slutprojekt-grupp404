
import type {
    FirebaseProject,
    DeadlineItem
} from "../../model/HomeType.ts";

import {
    createHomeCard,
    renderEmptyMessage,
    parseHomeDeadline
} from "./homeContentHelpers.ts";

function getUpcomingDeadlines(
    projects: FirebaseProject[]
): DeadlineItem[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlines: DeadlineItem[] = [];

    projects.forEach(project => {
        const projectDeadline = parseHomeDeadline(
            project.projectDeadline,
            "project"
        );

        if (projectDeadline && projectDeadline >= today) {
            deadlines.push({
                title: project.projectTitle,
                projectTitle: project.projectTitle,
                type: "Projekt",
                date: projectDeadline
            });
        }

        Object.values(project.tasks ?? {}).forEach(task => {
            const taskDeadline = parseHomeDeadline(
                task.taskDeadline,
                "task"
            );

            if (
                taskDeadline &&
                taskDeadline >= today &&
                task.taskStatus !== "Completed"
            ) {
                deadlines.push({
                    title: task.taskTitle ?? "Namnlös uppgift",
                    projectTitle: project.projectTitle,
                    type: "Uppgift",
                    date: taskDeadline
                });
            }
        });
    });

    return deadlines
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);
}

export function renderHomeDeadlines(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    const deadlines = getUpcomingDeadlines(projects);

    if (deadlines.length === 0) {
        renderEmptyMessage(container, "Inga kommande deadlines.");
        return;
    }

    deadlines.forEach(item => {
        const formattedDate = item.date.toLocaleDateString(
            "sv-SE",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

        container.appendChild(
            createHomeCard(
                item.title,
                `${item.type} · ${item.projectTitle} · ${formattedDate}`
            )
        );
    });
}
