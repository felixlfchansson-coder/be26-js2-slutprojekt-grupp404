import { Task } from "../model/task.ts";


export function sortTasksAZ(tasks:Task[]):Task[]{ 
    return tasks.toSorted((a, b)=>a.taskTitle.localeCompare(b.taskTitle))  
}

export function sortTasksZA(tasks:Task[]):Task[]{
   
    return tasks.toSorted((a, b)=>b.taskTitle.localeCompare(a.taskTitle))
}

export function sortTasksByClosestDate(tasks: Task[]): Task[] {
    return tasks.toSorted((a, b) => {
        const dateA = a.taskDeadline.toString();

        const dayA = Number(dateA.slice(0, 2));
        const monthA = Number(dateA.slice(2, 4));
        const yearA = Number(dateA.slice(4, 6)) + 2000;
const deadlineA = new Date(yearA, monthA - 1, dayA);
  const dateB = b.taskDeadline.toString();

        const dayB = Number(dateB.slice(0, 2));
        const monthB= Number(dateB.slice(2, 4));
        const yearB = Number(dateB.slice(4, 6)) + 2000;
const deadlineB = new Date(yearB, monthB - 1, dayB);
        return deadlineA.getTime() - deadlineB.getTime();
    });
}

export function sortTasksByFarthestDate (tasks:Task[]):Task[]{
   return tasks.toSorted((a, b) => {
        const dateA = a.taskDeadline.toString();

        const dayA = Number(dateA.slice(0, 2));
        const monthA = Number(dateA.slice(2, 4));
        const yearA = Number(dateA.slice(4, 6)) + 2000;
const deadlineA = new Date(yearA, monthA - 1, dayA);
  const dateB = b.taskDeadline.toString();

        const dayB = Number(dateB.slice(0, 2));
        const monthB= Number(dateB.slice(2, 4));
        const yearB = Number(dateB.slice(4, 6)) + 2000;
const deadlineB = new Date(yearB, monthB - 1, dayB);
        return deadlineB.getTime() - deadlineA.getTime();
    });
    
}