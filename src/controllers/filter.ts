import { Task } from "../model/Task.ts";

  export function filterTasksByCategory(tasks: Task[], category: string): Task[] {
if (category === "all") {
    return tasks;
}
else{
return tasks.filter(task => task.taskCategory === category);    
} 
}

export function filterTasksByMember(tasks: Task[], member: string): Task[] {
  if (member === "all") {
    return tasks;
  } else {
    return tasks.filter(task => task.taskMembers[0] === member);
  }
}