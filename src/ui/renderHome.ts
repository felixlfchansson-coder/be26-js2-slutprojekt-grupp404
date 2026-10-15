
import { getData } from "../modules/firebaseRequest.ts";

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

export async function renderHome(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<Record<string, FirebaseProject> | null>,
        getData("members") as Promise<Record<string, FirebaseMember> | null>
    ]);

    const projectList = Object.values(projects ?? {});
    const memberList = Object.values(members ?? {});

    // Totalt antal projekt
    const projectsTotal = document.getElementById("home-projects-total");

    if (projectsTotal) {
        projectsTotal.textContent = String(projectList.length);
    }

    // Totalt antal medlemmar
    const membersTotal = document.getElementById("home-members-total");

    if (membersTotal) {
        membersTotal.textContent = String(memberList.length);
    }

    // Pågående uppgifter
    const ongoingTasks = projectList.reduce((total, project) => {
        const tasks = Object.values(project.tasks ?? {});

        return total + tasks.filter(
            task => task.taskStatus === "In Progress"
        ).length;
    }, 0);

    const tasksTotal = document.getElementById("home-tasks-total");

    if (tasksTotal) {
        tasksTotal.textContent = String(ongoingTasks);
    }

    // Närmaste kommande projektdeadline
  
    // Närmaste kommande projektdeadline
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlines = projectList
        .map(project =>
            project.projectDeadline
                ? parseProjectDeadline(project.projectDeadline)
                : null
        )
        .filter(
            (deadline): deadline is Date =>
                deadline !== null && deadline >= today
        )
        .sort((a, b) => a.getTime() - b.getTime());

    const deadlineElement = document.getElementById("home-deadline");

    if (deadlineElement) {
        deadlineElement.textContent = deadlines.length > 0
            ? deadlines[0].toLocaleDateString("sv-SE", {
                day: "numeric",
                month: "short"
            })
            : "–";
    }
}
