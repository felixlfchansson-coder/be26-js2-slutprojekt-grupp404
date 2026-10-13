import { Task } from "../model/Task.ts";


export function sortTasksAZ(tasks:Task[]):Task[]{ 
    return tasks.toSorted((a, b)=>a.taskTitle.localeCompare(b.taskTitle))  
}

export function sortTasksZA(tasks:Task[]):Task[]{
   
    return tasks.toSorted((a, b)=>b.taskTitle.localeCompare(a.taskTitle))
}

export function sortTasksByClosestDate (tasks:Task[]):Task[]{
    return tasks.toSorted((a, b)=>a.taskDeadline - b.taskDeadline)
}

export function sortTasksByFarthestDate (tasks:Task[]):Task[]{
    return tasks.toSorted((a, b)=>b.taskDeadline - a.taskDeadline)
}


