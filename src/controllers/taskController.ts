import { renderTaskForm } from "../ui/taskForm";

export function initTaskController() {
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const addTaskButton = target.closest(".project__add-task");

        if (!addTaskButton) return;

        const overlay = renderTaskForm();
        document.body.appendChild(overlay);

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
    });
}