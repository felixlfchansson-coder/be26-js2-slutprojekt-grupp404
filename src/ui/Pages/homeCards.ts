
import type {
    FirebaseProject,
    FirebaseMember,
    DashboardTask
} from "../../model/HomeType.ts";

import { parseDeadline, formatDate } from "../components/DateFormater.ts";

function createDashboardItem(
    title: string,
    description: string
): HTMLElement {
    const item = document.createElement("div");
    item.className = "home__list-item";

    const heading = document.createElement("strong");
    heading.textContent = title;

    const details = document.createElement("p");
    details.textContent = description;

    item.append(heading, details);

    return item;
}

function renderEmpty(
    container: HTMLElement,
    message: string
): void {
    const paragraph = document.createElement("p");
    paragraph.className = "home__empty";
    paragraph.textContent = message;
    container.appendChild(paragraph);
}

export function renderDashboardStats(
    memberProjects: FirebaseProject[],
    memberTasks: DashboardTask[],
    member: FirebaseMember | undefined
): void {
    const projectsTotal = document.getElementById("home-projects-total");
    const tasksTotal = document.getElementById("home-tasks-total");
    const membersTotal = document.getElementById("home-members-total");
    const deadlineElement = document.getElementById("home-deadline");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ongoingTasks = memberTasks.filter(
        task => task.status === "In Progress"
    );

    const upcomingTasks = memberTasks
        .filter(
            task =>
                task.status !== "Completed" &&
                task.deadline !== null &&
                task.deadline >= today
        )
        .sort((a, b) =>
            a.deadline!.getTime() - b.deadline!.getTime()
        );

    if (projectsTotal) {
        projectsTotal.textContent = String(memberProjects.length);
    }

    if (tasksTotal) {
        tasksTotal.textContent = String(ongoingTasks.length);
    }

    if (membersTotal) {
        membersTotal.textContent = member ? "1" : "0";
    }

    if (deadlineElement) {
        deadlineElement.textContent = upcomingTasks.length > 0
            ? formatDate(upcomingTasks[0].deadline)
            : "–";
    }
}

export function renderDashboardLists(
    memberProjects: FirebaseProject[],
    memberTasks: DashboardTask[]
): void {
    const projectsContainer = document.getElementById("home-member-projects");
    const tasksContainer = document.getElementById("home-member-tasks");
    const deadlinesContainer = document.getElementById("home-member-deadlines");
    const overdueContainer = document.getElementById("home-member-overdue");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeTasks = memberTasks.filter(
        task => task.status !== "Completed"
    );

    const upcomingTasks = activeTasks
        .filter(task => task.deadline !== null && task.deadline >= today)
        .sort((a, b) =>
            a.deadline!.getTime() - b.deadline!.getTime()
        );

    const overdueTasks = activeTasks
        .filter(task => task.deadline !== null && task.deadline < today)
        .sort((a, b) =>
            a.deadline!.getTime() - b.deadline!.getTime()
        );

    // Mina projekt
    if (projectsContainer) {
        projectsContainer.replaceChildren();

        memberProjects.forEach(project => {
            projectsContainer.appendChild(
                createDashboardItem(
                    project.projectTitle,
                    `Projektdeadline: ${formatDate(
                        parseDeadline(project.projectDeadline)
                    )}`
                )
            );
        });

        if (memberProjects.length === 0) {
            renderEmpty(
                projectsContainer,
                "Inga projekt för den valda medlemmen."
            );
        }
    }

    // Mina uppgifter
    if (tasksContainer) {
        tasksContainer.replaceChildren();

        activeTasks
            .sort((a, b) =>
                (a.deadline?.getTime() ?? Infinity) -
                (b.deadline?.getTime() ?? Infinity)
            )
            .forEach(task => {
                const status = task.status === "In Progress"
                    ? "Pågående"
                    : "Att göra";

                tasksContainer.appendChild(
                    createDashboardItem(
                        task.title,
                        `${task.project} · ${status} · ${formatDate(task.deadline)}`
                    )
                );
            });

        if (activeTasks.length === 0) {
            renderEmpty(
                tasksContainer,
                "Inga aktiva uppgifter för den valda medlemmen."
            );
        }
    }

    // Kommande deadlines
    if (deadlinesContainer) {
        deadlinesContainer.replaceChildren();

        upcomingTasks.forEach(task => {
            deadlinesContainer.appendChild(
                createDashboardItem(
                    task.title,
                    `${task.project} · ${formatDate(task.deadline)}`
                )
            );
        });

        if (upcomingTasks.length === 0) {
            renderEmpty(
                deadlinesContainer,
                "Inga kommande deadlines."
            );
        }
    }

    // Försenade uppgifter
    if (overdueContainer) {
        overdueContainer.replaceChildren();

        overdueTasks.forEach(task => {
            overdueContainer.appendChild(
                createDashboardItem(
                    task.title,
                    `${task.project} · Deadline passerad: ${formatDate(task.deadline)}`
                )
            );
        });

       if (overdueTasks.length === 0) {
        renderEmpty(
            overdueContainer,
            "✓ Allt är i fas! Inga försenade uppgifter."
        );
    }
    }
}
