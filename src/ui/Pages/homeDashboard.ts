
import type {
    FirebaseProject,
    FirebaseMember,
    DashboardTask
} from "../../model/HomeType.ts";

import { belongsToMember } from "../../controllers/homeMembers.ts";
import { parseDeadline } from "../components/DateFormater.ts";

export function getMemberData(
    projects: Record<string, FirebaseProject>,
    memberID: string,
    member: FirebaseMember | undefined
): {
    memberProjects: FirebaseProject[];
    memberTasks: DashboardTask[];
} {
    const memberProjects: FirebaseProject[] = [];
    const memberTasks: DashboardTask[] = [];

    if (!member) {
        return { memberProjects, memberTasks };
    }

    Object.entries(projects).forEach(([, project]) => {
        const tasks = Object.values(project.tasks ?? {});

        const assignedTasks = tasks.filter(task =>
            belongsToMember(
                task.taskMembers,
                memberID,
                member
            )
        );

        const isProjectMember = belongsToMember(
            project.projectMembers,
            memberID,
            member
        );

        if (isProjectMember || assignedTasks.length > 0) {
            memberProjects.push(project);
        }

        assignedTasks.forEach(task => {
            memberTasks.push({
                title: task.taskTitle ?? "Namnlös uppgift",
                project: project.projectTitle,
                status: task.taskStatus ?? "To Do",
                deadline: parseDeadline(task.taskDeadline)
            });
        });
    });

    return { memberProjects, memberTasks };
}
