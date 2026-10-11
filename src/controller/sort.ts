import {Task } from "../model/Task.ts";
import {Project} from "../model/Project.ts";
const sortTaskBtn=document.querySelector<HTMLSelectElement>("#project-sort")


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

sortTaskBtn?.addEventListener("change",()=> {

const tasks = project.projectTasks;
if (sortTaskBtn.value==="sortAZ") {
 console.log(sortTasksAZ(tasks));
    } else if (sortTaskBtn.value === "sortZA") {
        console.log(sortTasksZA(tasks));
    } else if (sortTaskBtn.value === "closestDate") {
        console.log(sortTasksByClosestDate(tasks));
    } else if (sortTaskBtn.value === "farthestDate") {
        console.log(sortTasksByFarthestDate(tasks));
    }
    else {
    console.log(tasks);
}
});



