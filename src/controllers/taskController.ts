
import { renderTaskForm } from "../ui/taskForm";
import { addNewTask } from "../modules/tasks";

export function initTaskController() {
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const addTaskButton = target.closest(".project__add-task");

        if (!addTaskButton) return;

        // Hitta projektet som knappen tillhör
        const projectElement = addTaskButton.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;

        if (!projectID) {
            console.error("Kunde inte hitta projektets ID");
            return;
        }

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
