import { openTaskModal } from "./createTaskController";
import { openEditTaskModal } from "./editTaskController";
import { openAssignTaskModal } from "./assignTaskController";
import {
    handleDeleteTask,
    handleCompleteTask
} from "./deleteTaskController";

export function initTaskController() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const deleteButton = target.closest<HTMLButtonElement>(
            ".task__action--delete"
        );

        const completeTaskButton = target.closest<HTMLButtonElement>(
            ".task__action--complete"
        );

        const assignMemberButton = target.closest<HTMLButtonElement>(
            ".task__action--assign"
        );

        const editTaskButton = target.closest<HTMLButtonElement>(
            ".task__action--edit"
        );

        if (deleteButton) {
            const taskElement = deleteButton.closest<HTMLElement>(".task");
            const projectElement = deleteButton.closest<HTMLElement>(".project");

            const taskID = taskElement?.dataset.taskId;
            const projectID = projectElement?.dataset.projectId;

            if (!taskID || !projectID) return;

            await handleDeleteTask(projectID, taskID, deleteButton);
            return;
        }

        if (completeTaskButton) {
            const taskElement = completeTaskButton.closest<HTMLElement>(".task");
            const projectElement = completeTaskButton.closest<HTMLElement>(".project");

            const taskID = taskElement?.dataset.taskId;
            const projectID = projectElement?.dataset.projectId;

            if (!taskID || !projectID) return;

            await handleCompleteTask(projectID, taskID);
            return;
        }

        if (assignMemberButton) {
            const taskElement = assignMemberButton.closest<HTMLElement>(".task");
            const projectElement = assignMemberButton.closest<HTMLElement>(".project");

            const taskID = taskElement?.dataset.taskId;
            const projectID = projectElement?.dataset.projectId;

            if (!taskID || !projectID) return;

            await openAssignTaskModal(projectID, taskID);
            return;
        }

        if (editTaskButton) {
            const taskElement = editTaskButton.closest<HTMLElement>(".task");
            const projectElement = editTaskButton.closest<HTMLElement>(".project");

            const taskID = taskElement?.dataset.taskId;
            const projectID = projectElement?.dataset.projectId;

            if (!taskID || !projectID) return;

            openEditTaskModal(projectID, taskID);
            return;
        }

        const addTaskButton = target.closest(".project__add-task");

        if (!addTaskButton) return;

        const projectElement = addTaskButton.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;

        if (!projectID) return;

        openTaskModal(projectID);
    });
}
