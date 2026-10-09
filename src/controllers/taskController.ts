import { renderTaskForm } from "../ui/taskForm";
import { addNewTask } from "../modules/tasks";

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

        // currently works, but not as intended.
        // the task is not inside the project it is a part of.
        const form = overlay.querySelector<HTMLFormElement>("#task-form")
        form?.addEventListener("submit", async event =>{
            event.preventDefault()
    
            const formData = new FormData(form)

            const projectID = "" // Not sure where this comes from currently. Should be an auto fill as the the add task button is attatched to the project
            const title = String(formData.get("taskTitle") ?? "")
            const description = String(formData.get("taskDescription") ?? "")
            const category = String(formData.get("taskCategory") ?? "")
            const deadline = String(formData.get("taskDeadline") ?? "")
                let returnDeadline: string | number= deadline.replaceAll("-", "")
                    returnDeadline = parseFloat(returnDeadline)
            const priority = String(formData.get("taskPriority") ?? "")
            const taskStatus = String(formData.get("status") ?? "")

                try {
                    await addNewTask(
                        projectID,
                        title,
                        description,
                        category,
                        returnDeadline,
                        priority,
                        taskStatus,

                )

            console.log("Task added!")
            closeModal()

            } catch (error) {
                console.error("Could not add task: ", error)
            }
        })
    });
}
