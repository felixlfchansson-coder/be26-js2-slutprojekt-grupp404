
import { getData } from "../../modules/firebaseRequest.ts";

type FirebaseTask = {
    taskStatus?: string;
};

type FirebaseProject = {
    projectTitle: string;
    projectDeadline?: number;
    tasks?: Record<string, FirebaseTask>;
};

type FirebaseMember = {
    firstName: string;
    secondName: string;
};


function parseProjectDeadline(deadline: number): Date | null {
    const value = String(deadline);

    if (!/^\d{8}$/.test(value)) return null;

    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6));
    const day = Number(value.slice(6, 8));

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


function countOngoingTasks(projects: FirebaseProject[]): number {
    return projects.reduce((total, project) => {
        const tasks = Object.values(project.tasks ?? {});

        const ongoingTasks = tasks.filter(
            (task) => task.taskStatus === "In Progress"
        );

        return total + ongoingTasks.length;
    }, 0);
}


function getClosestProjectDeadline(
    projects: FirebaseProject[]
): Date | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlines = projects
        .map((project) =>
            project.projectDeadline
                ? parseProjectDeadline(project.projectDeadline)
                : null
        )
        .filter(
            (deadline): deadline is Date =>
                deadline !== null && deadline >= today
        )
        .sort((a, b) => a.getTime() - b.getTime());

    return deadlines[0] ?? null;
}


export async function renderHome(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<Record<string, FirebaseProject> | null>,
        getData("members") as Promise<Record<string, FirebaseMember> | null>
    ]);

    const projectList = Object.values(projects ?? {});
    const memberList = Object.values(members ?? {});

    const projectsTotal = document.getElementById("home-projects-total");
    const membersTotal = document.getElementById("home-members-total");
    const tasksTotal = document.getElementById("home-tasks-total");
    const deadlineElement = document.getElementById("home-deadline");

    const ongoingTasks = countOngoingTasks(projectList);
    const closestDeadline = getClosestProjectDeadline(projectList);

    if (projectsTotal) {
        projectsTotal.textContent = String(projectList.length);
    }

    if (membersTotal) {
        membersTotal.textContent = String(memberList.length);
    }

    if (tasksTotal) {
        tasksTotal.textContent = String(ongoingTasks);
    }

    if (deadlineElement) {
        deadlineElement.textContent = closestDeadline
            ? closestDeadline.toLocaleDateString("sv-SE", {
                day: "numeric",
                month: "short"
            })
            : "–";
    }
}
