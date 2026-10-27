import { renderEditTaskTForm } from "../ui/tasks/editTaskForm";
import { changeTaskDeadline, changePriority } from "../firebaseRequests/tasks";
import { dateToNumber } from "../ui/components/DateFormater";
import { refreshPage } from "./refreshPage.ts";

export function openEditTaskModal(projectID: string, taskID: string) {
    const editTaskOverlay = renderEditTaskTForm();

    document.body.appendChild(editTaskOverlay);

    const closeButton = editTaskOverlay.querySelector(".modal__close");
    const cancelButton = editTaskOverlay.querySelector(".modal__cancel");

    function closeModal() {
        editTaskOverlay.remove();
    }

    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    editTaskOverlay.addEventListener("click", (event) => {
        if (event.target === editTaskOverlay) {
            closeModal();
        }
    });

    const form = editTaskOverlay.querySelector<HTMLFormElement>(
        "#edit-task-form"
    );

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const deadline = String(formData.get("taskDeadline") ?? "");
        const priority = String(formData.get("taskPriority") ?? "");

        try {
            await changePriority(priority, projectID, taskID);
            await changeTaskDeadline(
                dateToNumber(deadline),
                projectID,
                taskID
            );

            await refreshPage();

            editTaskOverlay.remove();

        } catch (error) {
            console.error("Could not update task:", error);
            window.alert(
                "Something went wrong. The task could not be updated."
            );
        }
    });
}
