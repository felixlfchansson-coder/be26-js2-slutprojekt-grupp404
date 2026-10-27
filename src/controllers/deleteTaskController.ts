import {
    deleteTask,
    changeTaskStatus,
    patchCompletedDate
} from "../firebaseRequests/tasks";

import { getData } from "../firebaseRequests/dataRequest.ts";
import { updateMemberTasks } from "../firebaseRequests/members";
import { getTodaysDate } from "../ui/components/DateFormater";
import { refreshPage } from "./refreshPage.ts";

export async function handleDeleteTask(
    projectID: string,
    taskID: string,
    deleteButton: HTMLButtonElement
) {
    const confirmDeletion = window.confirm(
        "Är du säker på att du vill ta bort denna task?"
    );

    if (!confirmDeletion) return;

    deleteButton.disabled = true;

    try {
        const members = await getData("members");
        const projects = await getData("projects");

        const taskMembers =
            projects[projectID].tasks[taskID].taskMembers;

        const taskStatus =
            projects[projectID].tasks[taskID].taskStatus;

        if (taskStatus === "In Progress") {
            for (const member in taskMembers) {
                for (const ID in members) {
                    const memberName =
                        `${members[ID].firstName} ${members[ID].secondName}, ${members[ID].category}`;

                    if (memberName === taskMembers[member]) {
                        const ongoingTasks =
                            members[ID].ongoingTasks - 1;

                        await updateMemberTasks(ongoingTasks, ID);
                    }
                }
            }
        }

        await deleteTask(projectID, taskID);

        await refreshPage();

    } catch (error) {
        deleteButton.disabled = false;

        console.error("Could not delete task:", error);

        window.alert(
            "Something went wrong. The task could not be deleted."
        );
    }
}

export async function handleCompleteTask(
    projectID: string,
    taskID: string
) {
    const confirmCompletion = window.confirm(
        "Är du säker på att du vill klara denna task?"
    );

    if (!confirmCompletion) return;

    try {
        const members = await getData("members");
        const projects = await getData("projects");

        const taskStatus = "Completed";
        const todaysDate = getTodaysDate();

        await changeTaskStatus(taskStatus, projectID, taskID);

        await patchCompletedDate(
            todaysDate,
            projectID,
            taskID
        );

        const taskMembers =
            projects[projectID].tasks[taskID].taskMembers;

        for (const member in taskMembers) {
            for (const ID in members) {
                const memberName =
                    `${members[ID].firstName} ${members[ID].secondName}, ${members[ID].category}`;

                if (memberName === taskMembers[member]) {
                    const ongoingTasks =
                        members[ID].ongoingTasks - 1;

                    await updateMemberTasks(ongoingTasks, ID);
                }
            }
        }

        await refreshPage();

    } catch (error) {
        console.error("Could not complete task:", error);

        window.alert(
            "Something went wrong. The task could not be completed."
        );
    }
}
