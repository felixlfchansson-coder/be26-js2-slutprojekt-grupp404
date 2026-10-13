
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
    const now = Date.now();

    const deadlines = projectList
        .map(project => project.projectDeadline)
        .filter(
            (deadline): deadline is number =>
                typeof deadline === "number" && deadline >= now
        )
        .sort((a, b) => a - b);

    const deadlineElement = document.getElementById("home-deadline");

    if (deadlineElement && deadlines.length > 0) {
        deadlineElement.textContent = new Date(
            deadlines[0]
        ).toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short"
        });
    }
}
