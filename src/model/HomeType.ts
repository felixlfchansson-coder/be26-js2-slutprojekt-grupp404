export type FirebaseTask = {
    taskTitle?: string;
    taskStatus?: string;
    taskDeadline?: number | string;
    taskCategory?: string;
    taskMembers?: string[];
};

export type FirebaseProject = {
    projectTitle: string;
    projectDeadline?: number | string;
    projectMembers?: string[] | string;
    tasks?: Record<string, FirebaseTask>;
};

export type FirebaseMember = {
    firstName: string;
    secondName: string;
    category?: string;
    role?: string;
    ongoingTasks?: number;
    projectMember?: string[];
};

export type DashboardTask = {
    title: string;
    project: string;
    status: string;
    deadline: Date | null;
};

export type DeadlineItem = {
    title: string;
    projectTitle: string;
    type: "Projekt" | "Uppgift";
    date: Date;
};