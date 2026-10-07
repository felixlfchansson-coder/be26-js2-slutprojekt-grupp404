export type MemberCategory='frontend'|'backend'|'ux'
export type TaskPriority='High'|'Medium'|'Low'
export type TaskStatus = 'To Do'|'In Progress'|'Completed'


export interface Task {
    taskID:string;
    taskTitle:string;
    taskDescription:string;
    taskCategory:MemberCategory;
    status:TaskStatus;
    taskPriority:TaskPriority;
    taskDeadline:number;
    taskCreationDate:number;
    
}