
import type { FirebaseProject } from "../../model/HomeType.ts";

import {
    createHomeCard,
    renderEmptyMessage
} from "./homeContentHelpers.ts";

export function renderHomeTasks(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    const ongoingTasks = projects.flatMap((project) =>
        Object.values(project.tasks ?? {})
            .filter(task => task.taskStatus === "In Progress")
            .map(task => ({
                ...task,
                projectTitle: project.projectTitle
            }))
    );

    if (ongoingTasks.length === 0) {
        renderEmptyMessage(container, "Inga pågående uppgifter.");
        return;
    }

    ongoingTasks.forEach(task => {
        container.appendChild(
            createHomeCard(
                task.taskTitle ?? "Namnlös uppgift",
                `${task.projectTitle} · ${task.taskCategory ?? "Ingen kategori"}`
            )
        );
    });
}
