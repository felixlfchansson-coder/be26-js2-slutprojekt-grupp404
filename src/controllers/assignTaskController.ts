import {
    renderAssignMember,
    assignableMembersToTasks
} from "../ui/tasks/assignMember";

import { getData } from "../firebaseRequests/dataRequest";
import { updateMemberTasks } from "../firebaseRequests/members";
import { assignMembersToTask } from "../firebaseRequests/tasks";
import { refreshPage } from "./refreshPage.ts";

export async function openAssignTaskModal(
    projectID: string,
    taskID: string
) {
    const assignMemberOverlay = renderAssignMember();

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

    try {
        await assignableMembersToTasks(projectID, taskID);

        const members = await getData("members");

        const form = assignMemberOverlay.querySelector<HTMLFormElement>(
            "#assign-member-form"
        );

        form?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const assignedMembers: string[] = [];
            try {
                for (const ID in members) {
                    const checkbox =
                        assignMemberOverlay.querySelector<HTMLInputElement>(
                            `#${ID}`
                        );
                    if (checkbox?.checked) {
                        const assignedMember =
                            assignMemberOverlay.querySelector<HTMLLabelElement>(
                                `label[for="${ID}"]`
                            );
                    if (!assignedMember) continue;
                    const memberName =
                        assignedMember.textContent?.trim() ?? "";
                    if (!memberName) continue;

                    assignedMembers.push(memberName);
                    }
                }

                await assignMembersToTask(
                    assignedMembers,
                    projectID,
                    taskID
                );

                for (const ID in members) {
                    const checkbox =
                        assignMemberOverlay.querySelector<HTMLInputElement>(
                            `#${ID}`
                        );

                    if (checkbox?.checked) {
                        const ongoingTasks =
                            (members[ID].ongoingTasks ?? 0) + 1;

                        await updateMemberTasks(ongoingTasks, ID);
                    }
                }

                await refreshPage();

                closeModal();

            } catch (error) {
                console.error(
                    "Could not assign members to task:",
                    error
                );
                window.alert(
                    "Something went wrong. Could not assign members to task."
                );
            }
        });

    } catch (error) {
        console.error("Could not load assignable members:", error);
        window.alert("Could not load members.");
        closeModal();
    }
}
