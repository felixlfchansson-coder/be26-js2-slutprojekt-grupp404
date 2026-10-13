import { renderMemberForm } from "../ui/memberForm";
import { addNewMember } from "../modules/members";
import { renderAssignMember, assignableMembersToProject } from "../ui/assignMember";
import { getData } from "../modules/firebaseRequest";
import { updateMemberProjects  } from "../modules/members";

export function initNewMemberController() {
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const newMemberButton = target.closest(
            "#nav-add-member, #new-member-button"
        );

        if (!newMemberButton) return;

        openMemberForm();
    });
}

function openMemberForm() {
    const memberOverlay = renderMemberForm();

    document.body.appendChild(memberOverlay);

    const closeButton = memberOverlay.querySelector(".modal__close");
    const cancelButton = memberOverlay.querySelector(".modal__cancel");

    function closeModal() {
        memberOverlay.remove();
    }

    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    memberOverlay.addEventListener("click", (event) => {
        if (event.target === memberOverlay) {
            closeModal();
        }
    });

    const form = memberOverlay.querySelector<HTMLFormElement>("#member-form");

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const firstName = String(formData.get("firstName") ?? "");
        const secondName = String(formData.get("secondName") ?? "");
        const category = String(formData.get("role") ?? "");

        try {
            await addNewMember(
                firstName,
                secondName,
                category
            );

            closeModal();

        } catch (error) {
            console.error("Could not add member:", error);
        }
    });
}

export function addMembersToProject() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const addTaskButton = target.closest(".project__add-member");

        if (!addTaskButton) return;

        const projectElement = addTaskButton.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;
        if (!projectID) return;

        openTaskModal(projectID);
    })
}

async function openTaskModal(projectID: string) {
    const assignMemberOverlay = renderAssignMember()
    assignableMembersToProject()
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
    const projects = await getData("projects")
    const form = assignMemberOverlay.querySelector<HTMLFormElement>("#assign-member-form")
    form?.addEventListener("submit", async event => {
        event.preventDefault()

        let memberProjects:string[] = []
        for (const ID in members) {
            console.log("ID ", ID)
            console.log("Members ", members)
            const projectTitle = projects[projectID].projectTitle
            if (!projectTitle) return;
            let checkbox = assignMemberOverlay.querySelector<HTMLFormElement>(`#${ID}`)
            if (checkbox?.checked) {
                
                memberProjects = members[ID].projectMember
                memberProjects.push(projectTitle)

                try {
                    await updateMemberProjects(memberProjects, ID)
                } catch {
                    window.alert("Something went wrong. Could not assign members to task.");
                }
            }
        }
        closeModal()
        return;
    })
}