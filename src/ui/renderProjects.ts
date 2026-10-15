import { getData } from "../modules/firebaseRequest.ts";
import { renderProject } from "./renderProject";
import {
  Task,
  type MemberCategory,
  type TaskPriority,
  type TaskStatus,
} from "../model/Task.ts";

import {
  filterTasksByCategory,
  filterTasksByMember,
} from "../controllers/filter.ts";
import {
  sortTasksAZ,
  sortTasksZA,
  sortTasksByClosestDate,
  sortTasksByFarthestDate,
} from "../controllers/sort.ts";

let sortOrder = "sortAZ";
let filterCategory = "all";
let filterMember = "all";

type FirebaseTask = {
  taskTitle: string;
  taskDescription: string;
  taskCategory: MemberCategory;
  taskPriority: TaskPriority;
  taskStatus: TaskStatus;
  taskDeadline: number;
  taskMembers?: string[];
  taskCreationDate?: number;
  taskCompleteDate?: number;
};

let projectsData: Record<string, FirebaseProject> = {};

type FirebaseProject = {
  projectTitle: string;
  projectDescription: string;
  projectDeadline: number;
  projectMembers?: string[];
  tasks?: Record<string, FirebaseTask>;
};


async function updateMemberDropdown() {
  const select = document.getElementById("member-filter") as HTMLSelectElement;

  if (!select || select.dataset.loaded === "true") return;

  const members = await getData("members");
 Object.values(members).forEach((member: any) => {
   const name = `${member.firstName} ${member.secondName}, ${member.category}`;

    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;

    select.appendChild(option);
  });

  select.dataset.loaded = "true";
}



export function renderProjects(projects: Record<string, FirebaseProject>) {
  const projectsContainer = document.getElementById("projects-container");
  projectsData = projects;
  
  if (!projectsContainer) return;
updateMemberDropdown();
  projectsContainer.innerHTML = "";

  Object.entries(projects)
    .filter(([projectID]) => projectID !== "tasks")
    .forEach(([projectID, project], index) => {
      console.log("PROJEKT:", projectID);
      console.log("TASKS FRÅN PROJEKTET:", project.tasks);
      const tasks = Object.entries(project.tasks ?? {})
        .filter(([, task]) => Boolean(task?.taskTitle))
        .map(([taskID, task]) => {
          const status =
            task.taskStatus === "In Progress" || task.taskStatus === "Completed"
              ? task.taskStatus
              : "To Do";

          const priority =
            task.taskPriority === "High" ||
            task.taskPriority === "Medium" ||
            task.taskPriority === "Low"
              ? task.taskPriority
              : task.taskPriority === "1"
                ? "High"
                : task.taskPriority === "2"
                  ? "Medium"
                  : "Low";

          return new Task(
            taskID,
            task.taskTitle,
            task.taskDescription ?? "",
            task.taskMembers ?? [],
            task.taskCategory,
            status,
            priority,
            task.taskDeadline,
            task.taskCreationDate ?? Date.now(),
            task.taskCompleteDate ?? 0,
            projectID,
          );
        });
      let sortedTasks: Task[];

      if (sortOrder === "sortAZ") {
        sortedTasks = sortTasksAZ(tasks);
      } else if (sortOrder === "sortZA") {
        sortedTasks = sortTasksZA(tasks);
      } else if (sortOrder === "closestDeadline") {
        sortedTasks = sortTasksByClosestDate(tasks);
      } else {
        sortedTasks = sortTasksByFarthestDate(tasks);
      }
      const filteredTasksByCategory = filterTasksByCategory(
        sortedTasks,
        filterCategory,
      );
     
      const filteredTasksByMember = filterTasksByMember(
        filteredTasksByCategory,
        filterMember,
      );

      const projectElement = renderProject(
        project,
        index,
        
        filteredTasksByMember,
      );
      //replaced tasks with sortedTask
      projectElement.dataset.projectId = projectID;

      projectsContainer.appendChild(projectElement);
    });
}

document.addEventListener("change", (event) => {
  const sortTaskBtn = event.target as HTMLSelectElement;

  if (sortTaskBtn.id !== "project-sort") return;

  sortOrder = sortTaskBtn.value;
  renderProjects(projectsData);
});

document.addEventListener("change", (event) => {
  const filterTasksByMemberBtn = event.target as HTMLSelectElement;

  if (filterTasksByMemberBtn.id !== "member-filter") return;

  filterMember = filterTasksByMemberBtn.value;
 console.log("VALD MEDLEM:", filterMember);

console.log(
  "TASK MEMBERS:",
  Object.values(projectsData).flatMap(project =>
    Object.values(project.tasks ?? {}).map(task => ({
      title: task.taskTitle,
      members: task.taskMembers ?? []
    }))
  )
);
  renderProjects(projectsData);
});

document.addEventListener("change", (event) => {
  const filterTasksByCategoryBtn = event.target as HTMLSelectElement;

  if (filterTasksByCategoryBtn.id !== "category-filter") return;

filterCategory = filterTasksByCategoryBtn.value;
  renderProjects(projectsData);
});

export async function refreshProjects(): Promise<void> {
    const projects = await getData("projects");

    renderProjects(projects ?? {});
}