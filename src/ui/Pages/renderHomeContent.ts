
import { getData } from "../../modules/firebaseRequest.ts";

type FirebaseTask = {
    taskTitle: string;
    taskCategory?: string;
    taskStatus?: string;
    taskDeadline?: number | string;
};

type FirebaseProject = {
    projectTitle: string;
    projectDeadline?: number | string;
    tasks?: Record<string, FirebaseTask>;
};

type FirebaseMember = {
    firstName: string;
    secondName: string;
    category?: string;
    ongoingTasks?: number;
};

type DeadlineItem = {
    title: string;
    projectTitle: string;
    type: "Projekt" | "Uppgift";
    date: Date;
};


function createTextElement(
    tag: string,
    className: string,
    text: string
): HTMLElement {
    const element = document.createElement(tag);

    element.className = className;
    element.textContent = text;

    return element;
}


function createHomeCard(
    title: string,
    description: string
): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "home__item";

    card.append(
        createTextElement("strong", "home__item-title", title),
        createTextElement("span", "home__item-meta", description)
    );

    return card;
}


function renderEmptyMessage(
    container: HTMLElement,
    message: string
): void {
    container.appendChild(
        createTextElement("p", "home__empty", message)
    );
}


function parseDeadline(
    value: number | string | undefined,
    type: "project" | "task"
): Date | null {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    const raw = String(value).trim();

    let year: number;
    let month: number;
    let day: number;

    if (type === "project") {
        if (!/^\d{8}$/.test(raw)) return null;

        year = Number(raw.slice(0, 4));
        month = Number(raw.slice(4, 6));
        day = Number(raw.slice(6, 8));
    } else {
        const formatted = raw.padStart(6, "0");

        if (!/^\d{6}$/.test(formatted)) return null;

        day = Number(formatted.slice(0, 2));
        month = Number(formatted.slice(2, 4));
        year = 2000 + Number(formatted.slice(4, 6));
    }

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}


function renderHomeProjects(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    if (projects.length === 0) {
        renderEmptyMessage(container, "Inga projekt att visa ännu.");
        return;
    }

    projects.forEach((project) => {
        const taskCount = Object.keys(project.tasks ?? {}).length;

        const deadlineDate = parseDeadline(
            project.projectDeadline,
            "project"
        );

        const deadline = deadlineDate
            ? deadlineDate.toLocaleDateString("sv-SE")
            : "Ingen deadline";

        container.appendChild(
            createHomeCard(
                project.projectTitle,
                `${taskCount} uppgifter · Deadline: ${deadline}`
            )
        );
    });
}


function renderHomeTasks(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    const ongoingTasks = projects.flatMap((project) =>
        Object.values(project.tasks ?? {})
            .filter((task) => task.taskStatus === "In Progress")
            .map((task) => ({
                ...task,
                projectTitle: project.projectTitle
            }))
    );

    if (ongoingTasks.length === 0) {
        renderEmptyMessage(container, "Inga pågående uppgifter.");
        return;
    }

    ongoingTasks.forEach((task) => {
        container.appendChild(
            createHomeCard(
                task.taskTitle,
                `${task.projectTitle} · ${task.taskCategory ?? "Ingen kategori"}`
            )
        );
    });
}


function getUpcomingDeadlines(
    projects: FirebaseProject[]
): DeadlineItem[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlines: DeadlineItem[] = [];

    projects.forEach((project) => {
        const projectDeadline = parseDeadline(
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

        Object.values(project.tasks ?? {}).forEach((task) => {
            const taskDeadline = parseDeadline(
                task.taskDeadline,
                "task"
            );

            if (
                taskDeadline &&
                taskDeadline >= today &&
                task.taskStatus !== "Completed"
            ) {
                deadlines.push({
                    title: task.taskTitle,
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


function renderHomeDeadlines(
    container: HTMLElement,
    projects: FirebaseProject[]
): void {
    container.replaceChildren();

    const deadlines = getUpcomingDeadlines(projects);

    if (deadlines.length === 0) {
        renderEmptyMessage(container, "Inga kommande deadlines.");
        return;
    }

    deadlines.forEach((item) => {
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


function renderHomeMembers(
    container: HTMLElement,
    members: FirebaseMember[]
): void {
    container.replaceChildren();

    if (members.length === 0) {
        renderEmptyMessage(container, "Inga medlemmar att visa ännu.");
        return;
    }

    members.forEach((member) => {
        container.appendChild(
            createHomeCard(
                `${member.firstName} ${member.secondName}`,
                `${member.category ?? "Ingen kategori"} · ${member.ongoingTasks ?? 0} pågående uppgifter`
            )
        );
    });
}


export async function renderHomeContent(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<Record<string, FirebaseProject> | null>,
        getData("members") as Promise<Record<string, FirebaseMember> | null>
    ]);

    const projectsContainer = document.getElementById("home-projects");
    const tasksContainer = document.getElementById("home-tasks");
    const deadlinesContainer = document.getElementById("home-deadlines");
    const membersContainer = document.getElementById("home-members");

    if (
        !projectsContainer ||
        !tasksContainer ||
        !deadlinesContainer ||
        !membersContainer
    ) {
        return;
    }

    const projectList = Object.values(projects ?? {});
    const memberList = Object.values(members ?? {});

    renderHomeProjects(projectsContainer, projectList);
    renderHomeTasks(tasksContainer, projectList);
    renderHomeDeadlines(deadlinesContainer, projectList);
    renderHomeMembers(membersContainer, memberList);
}
