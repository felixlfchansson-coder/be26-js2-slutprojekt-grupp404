export function renderTask(task: any) {
    const taskElement = document.createElement("div");
     taskElement.classList.add("task");
// TODO: Byt ut any och uppdatera property-namnen när Task class/type är klar
    taskElement.innerHTML = `
        <h3>${task.name}</h3>
        <p>${task.description}</p>
    `;

    return taskElement;
}