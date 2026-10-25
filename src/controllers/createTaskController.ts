
import { renderTaskForm } from "../ui/tasks/taskForm";
import { addNewTask } from "../firebaseRequests/tasks";
import { dateToNumber } from "../ui/components/DateFormater";
import { refreshPage } from "./refreshPage.ts";

export function openTaskModal(projectID: string) {
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
        const taskStatus = "To Do";

        try {
            await addNewTask(
                projectID,
                title,
                description,
                category,
                dateToNumber(deadline),
                priority,
                taskStatus,
                0
            );

            await refreshPage();

            console.log("Task sparad i projekt:", projectID);

            overlay.remove();

        } catch (error) {
            console.error("Kunde inte skapa task:", error);
            window.alert(
                "Something went wrong. The task could not be created"
            );
        }
    });
}
