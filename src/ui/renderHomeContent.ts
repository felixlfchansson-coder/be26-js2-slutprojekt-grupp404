
import { getData } from "../modules/firebaseRequest.ts";

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

// Projekt sparas som YYYYMMDD, exempelvis 20261020.
// Tasks sparas som DDMMYY, exempelvis 201026.
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
        // padStart hanterar datum där en inledande nolla
        // försvunnit när datumet sparades som number.
        const formatted = raw.padStart(6, "0");

        if (!/^\d{6}$/.test(formatted)) return null;

        day = Number(formatted.slice(0, 2));
        month = Number(formatted.slice(2, 4));
        year = 2000 + Number(formatted.slice(4, 6));
    }

    const date = new Date(year, month - 1, day);

    // Kontrollera att datumet verkligen existerar.
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}

export async function renderHomeContent(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<
            Record<string, FirebaseProject> | null
        >,
        getData("members") as Promise<
            Record<string, FirebaseMember> | null
        >
    ]);

    const projectsContainer =
        document.getElementById("home-projects");

    const tasksContainer =
        document.getElementById("home-tasks");

    const deadlinesContainer =
        document.getElementById("home-deadlines");

    const membersContainer =
        document.getElementById("home-members");

    // Användaren kan ha bytt sida medan Firebase laddade.
    if (
        !projectsContainer ||
        !tasksContainer ||
        !deadlinesContainer ||
        !membersContainer
    ) {
        return;
    }

    const projectEntries = Object.entries(projects ?? {});
    const memberEntries = Object.values(members ?? {});

    // =====================================
    // PROJEKTÖVERSIKT
    // =====================================

    projectsContainer.replaceChildren();

    if (projectEntries.length === 0) {
        projectsContainer.append(
            createTextElement(
                "p",
                "home__empty",
                "Inga projekt att visa ännu."
            )
        );
    }

    projectEntries.forEach(([, project]) => {
        const card = document.createElement("div");
        card.className = "home__item";

        const taskCount =
            Object.keys(project.tasks ?? {}).length;

        const deadlineDate = parseDeadline(
            project.projectDeadline,
            "project"
        );

        const deadline = deadlineDate
            ? deadlineDate.toLocaleDateString("sv-SE")
            : "Ingen deadline";

        card.append(
            createTextElement(
                "strong",
                "home__item-title",
                project.projectTitle
            ),
            createTextElement(
                "span",
                "home__item-meta",
                `${taskCount} uppgifter · Deadline: ${deadline}`
            )
        );

        projectsContainer.append(card);
    });

    // =====================================
    // PÅGÅENDE UPPGIFTER
    // =====================================

    tasksContainer.replaceChildren();

    const allTasks = projectEntries.flatMap(
        ([, project]) =>
            Object.values(project.tasks ?? {}).map(task => ({
                ...task,
                projectTitle: project.projectTitle
            }))
    );

    const ongoingTasks = allTasks.filter(
        task => task.taskStatus === "In Progress"
    );

    if (ongoingTasks.length === 0) {
        tasksContainer.append(
            createTextElement(
                "p",
                "home__empty",
                "Inga pågående uppgifter."
            )
        );
    }

    ongoingTasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "home__item";

        card.append(
            createTextElement(
                "strong",
                "home__item-title",
                task.taskTitle
            ),
            createTextElement(
                "span",
                "home__item-meta",
                `${task.projectTitle} · ${
                    task.taskCategory ?? "Ingen kategori"
                }`
            )
        );

        tasksContainer.append(card);
    });

    // =====================================
    // KOMMANDE DEADLINES
    // =====================================

    deadlinesContainer.replaceChildren();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineItems: DeadlineItem[] = [];

    projectEntries.forEach(([, project]) => {
        // Projektets deadline
        const projectDeadline = parseDeadline(
            project.projectDeadline,
            "project"
        );

        if (projectDeadline && projectDeadline >= today) {
            deadlineItems.push({
                title: project.projectTitle,
                projectTitle: project.projectTitle,
                type: "Projekt",
                date: projectDeadline
            });
        }

        // Uppgifternas deadlines
        Object.values(project.tasks ?? {}).forEach(task => {
            const taskDeadline = parseDeadline(
                task.taskDeadline,
                "task"
            );

            if (
                taskDeadline &&
                taskDeadline >= today &&
                task.taskStatus !== "Completed"
            ) {
                deadlineItems.push({
                    title: task.taskTitle,
                    projectTitle: project.projectTitle,
                    type: "Uppgift",
                    date: taskDeadline
                });
            }
        });
    });

    // Närmaste deadline först, max fem.
    const upcomingDeadlines = deadlineItems
        .sort(
            (a, b) =>
                a.date.getTime() - b.date.getTime()
        )
        .slice(0, 5);

    if (upcomingDeadlines.length === 0) {
        deadlinesContainer.append(
            createTextElement(
                "p",
                "home__empty",
                "Inga kommande deadlines."
            )
        );
    }

    upcomingDeadlines.forEach(item => {
        const card = document.createElement("div");
        card.className = "home__item";

        const formattedDate = item.date.toLocaleDateString(
            "sv-SE",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

        card.append(
            createTextElement(
                "strong",
                "home__item-title",
                item.title
            ),
            createTextElement(
                "span",
                "home__item-meta",
                `${item.type} · ${item.projectTitle} · ${formattedDate}`
            )
        );

        deadlinesContainer.append(card);
    });

    // =====================================
    // TEAMMEDLEMMAR
    // =====================================

    membersContainer.replaceChildren();

    if (memberEntries.length === 0) {
        membersContainer.append(
            createTextElement(
                "p",
                "home__empty",
                "Inga medlemmar att visa ännu."
            )
        );
    }

    memberEntries.forEach(member => {
        const card = document.createElement("div");
        card.className = "home__item";

        card.append(
            createTextElement(
                "strong",
                "home__item-title",
                `${member.firstName} ${member.secondName}`
            ),
            createTextElement(
                "span",
                "home__item-meta",
                `${member.category ?? "Ingen kategori"} · ${
                    member.ongoingTasks ?? 0
                } pågående uppgifter`
            )
        );

        membersContainer.append(card);
    });
}
