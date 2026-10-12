
import { renderTaskForm } from "../ui/taskForm";
import { addNewTask, deleteTask, changeTaskStatus } from "../modules/tasks";


export function initTaskController() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;
    // TA BORT TASK
    const deleteButton = target.closest<HTMLButtonElement>(
        ".task__action--delete"
    );
    const completeTaskButton = target.closest<HTMLButtonElement>(
        ".task__action--complete"
    );

    if (deleteButton) {
        const taskElement = deleteButton.closest<HTMLElement>(".task");
        const projectElement = deleteButton.closest<HTMLElement>(".project");

        const taskID = taskElement?.dataset.taskId;
        const projectID = projectElement?.dataset.projectId;

        if (!taskID || !projectID || !taskElement) return;

        const confirmDeletion = window.confirm(
            "Är du säker på att du vill ta bort denna task?"
        );

        if (!confirmDeletion) return;

        deleteButton.disabled = true;

        try {
            // Använder er befintliga Firebase-funktion
            await deleteTask(projectID, taskID);

            // Hitta kolumnen innan tasken tas bort
            const taskList = taskElement.closest(".task-list");
            const count = taskElement
                .closest(".kanban__column")
                ?.querySelector(".kanban__count");

            // Ta bort kortet från sidan
            taskElement.remove();

            // Uppdatera antalet tasks
            if (count && taskList) {
                count.textContent = String(
                    taskList.querySelectorAll(".task").length
                );
            }
        } catch {
            deleteButton.disabled = false;
            window.alert("Det gick inte att ta bort tasken.");
        }

        return;
    }

    if (completeTaskButton) {
        const taskElement = completeTaskButton.closest<HTMLElement>(".task");
        const projectElement = completeTaskButton.closest<HTMLElement>(".project");
        const taskID = taskElement?.dataset.taskId;
        const projectID = projectElement?.dataset.projectId;
        if (!taskID || !projectID || !taskElement) return;

        const confirmCompletion = window.confirm(
            "Är du säker på att du vill klara denna task?"
        );
        
        if (!confirmCompletion) return;
        
        try {
            const taskStatus = "Completed"
            await changeTaskStatus(taskStatus, projectID, taskID);
        } catch {
            completeTaskButton.disabled = false;
            window.alert("Det gick inte att klara tasken.");
        }

        return;
    }
        // LÄGG TILL TASK (din befintliga funktion)
        const addTaskButton = target.closest(".project__add-task");

        if (!addTaskButton) return;

        const projectElement = addTaskButton.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;
        if (!projectID) return;

        openTaskModal(projectID);
    });
}


function openTaskModal(projectID: string) {
    const overlay = renderTaskForm();

    document.body.appendChild(overlay);

    setupModalClose(overlay);
    setupTaskSubmit(overlay, projectID);
}

function setupModalClose(overlay: HTMLDivElement) {
    const closeButton = overlay.querySelector(".modal__close");
    const cancelButton = overlay.querySelector(".modal__cancel");

    function closeModal() {
        overlay.remove();
    }

    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });
}

function setupTaskSubmit(overlay: HTMLDivElement, projectID: string) {
    const form = overlay.querySelector<HTMLFormElement>("#task-form");

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const title = String(formData.get("taskTitle") ?? "");
        const description = String(formData.get("taskDescription") ?? "");
        const category = String(formData.get("taskCategory") ?? "");
        const deadline = String(formData.get("taskDeadline") ?? "");
        const priority = String(formData.get("taskPriority") ?? "");
        const taskStatus = String(formData.get("taskStatus") ?? "");

        try {
            await addNewTask(
                projectID,
                title,
                description,
                category,
                dateToNumber(deadline),
                priority,
                taskStatus
            );

            console.log("Task sparad i projekt:", projectID);

            overlay.remove();

        } catch (error) {
            console.error("Kunde inte skapa task:", error);
        }
    });
}

function dateToNumber(date: string): number {
    const [year, month, day] = date.split("-");

    return Number(`${day}${month}${year.slice(-2)}`);
}