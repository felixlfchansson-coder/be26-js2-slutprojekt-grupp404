import { renderTaskForm } from "../ui/taskForm";
import { addNewTask, deleteTask, changeTaskStatus, assignMembers } from "../modules/tasks";
import { renderAssignMember } from "../ui/assignMember";
import { assignableMemberOptions } from "../ui/assignMember";
import { getData } from "../modules/firebaseRequest";
import { updateMemberTasks } from "../modules/members";

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
    const assignMemberButton = target.closest<HTMLButtonElement>(
        ".task__action--assign"
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
            const members = await getData("members")
            const projects = await getData("projects")
            const taskMembers = projects[projectID].tasks[taskID].taskMembers
            const taskStatus = projects[projectID].tasks[taskID].taskStatus
            if (taskStatus === "In Progress") {
                for (const member in taskMembers) {
                    for (const ID in members) {
                        let memberName = `${members[ID].firstName} ${members[ID].secondName}, ${members[ID]. category}`
                        if (memberName === taskMembers[member]) {
                            let ongoingTasks = members[ID].ongoingTasks - 1
                            await updateMemberTasks(ongoingTasks, ID)
                        }
                    }
                }
            }

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
        const members = await getData("members")
        const projects = await getData("projects")
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

            const taskMembers = projects[projectID].tasks[taskID].taskMembers
            for (const member in taskMembers) {
                for (const ID in members) {
                    let memberName = `${members[ID].firstName} ${members[ID].secondName}, ${members[ID]. category}`
                    if (memberName === taskMembers[member]) {
                        let ongoingTasks = members[ID].ongoingTasks - 1
                        await updateMemberTasks(ongoingTasks, ID)
                    }
                }
            }
        } catch {
            window.alert("Det gick inte att klara tasken.");
        }

        return;
    }

    if (assignMemberButton) {
        const taskElement = assignMemberButton.closest<HTMLElement>(".task");
        const projectElement = assignMemberButton.closest<HTMLElement>(".project");
        const taskID = taskElement?.dataset.taskId;
        const projectID = projectElement?.dataset.projectId;

        if (!taskID || !projectID || !taskElement) return;

        assignableMemberOptions(projectID, taskID)

        const assignMemberOverlay = renderAssignMember()

        document.body.appendChild(assignMemberOverlay);

        const closeButton = assignMemberOverlay.querySelector(".modal__close");
        const cancelButton = assignMemberOverlay.querySelector(".modal__cancel");

        function closeModal() {
            assignMemberOverlay.remove();
        }

        closeButton?.addEventListener("click", closeModal);
        cancelButton?.addEventListener("click", closeModal);

        assignMemberOverlay.addEventListener("click", (event) => {
            if (event.target === assignMemberOverlay) {
                closeModal();
            }
        });
        const members = await getData("members")
        const form = assignMemberOverlay.querySelector<HTMLFormElement>("#assign-member-form")
        form?.addEventListener("submit", async event => {
            event.preventDefault()

            let assignedMembers:string[] = []
            for (const ID in members) {
                let checkbox = assignMemberOverlay.querySelector<HTMLFormElement>(`#${ID}`)
                if (checkbox?.checked) {
                    let assignedMember = document.querySelector("label[for=" + `${ID}` + "]");
                    if (!assignedMember) return;

                    try {
                        let ongoingTasks = members[ID].ongoingTasks + 1
                        await updateMemberTasks(ongoingTasks, ID)

                        assignedMembers.push(assignedMember?.innerHTML)
                        await assignMembers(assignedMembers, projectID, taskID)

                    } catch {
                        window.alert("Something went wrong. Could not assign members to task.");
                    }
                }
                closeModal()
                return;
            }
        })
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
