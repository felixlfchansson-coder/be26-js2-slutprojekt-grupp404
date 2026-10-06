export type MemberCategory='frontend'|'backend'|'ux'
export type TaskPriority='1'|'2'|'3'
export type TaskStatus = 'toDo'|'inProgress'|'completed'


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

