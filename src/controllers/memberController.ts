
import { renderMemberForm } from "../ui/members/memberForm";
import { addNewMember } from "../modules/members";
import { renderAssignMember, assignableMembersToProject } from "../ui/tasks/assignMember";
import { getData } from "../modules/firebaseRequest";
import { updateMemberProjects } from "../modules/members";
import { addProjectMembers } from "../modules/projects";
import { refreshPage } from "./refreshPage.ts";


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

            // NYTT: Uppdatera den aktiva sidan efter sparning
            await refreshPage();

            closeModal();

        } catch (error) {
            window.alert(
                "Something went wrong. The new member could not be added."
            );

            console.error("Could not add member:", error);
        }
    });
}

export function addMembersToProject() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const addMembersToProject = target.closest(".project__add-member");

        if (!addMembersToProject) return;

        const projectElement = addMembersToProject.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;

        if (!projectID) return;

        openTaskModal(projectID);
    });
}

async function openTaskModal(projectID: string) {
    const assignMemberOverlay = renderAssignMember();

    document.body.appendChild(assignMemberOverlay);

    await assignableMembersToProject(projectID);

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

    const members = await getData("members");
    const projects = await getData("projects");

    const form = assignMemberOverlay.querySelector<HTMLFormElement>(
        "#assign-member-form"
    );

    form?.addEventListener("submit", async event => {
        event.preventDefault();

        let memberProjects: string[] = [];

        // ÄNDRAT: Skapa en kopia av projektets medlemslista
        let projectMembers: string[] = [
            ...(projects[projectID].projectMembers ?? [])
        ];

        try {
            for (const ID in members) {
                const projectTitle = projects[projectID].projectTitle;

                if (!projectTitle) return;

                const checkbox = assignMemberOverlay.querySelector<HTMLInputElement>(
                    `#${ID}`
                );

                if (checkbox?.checked) {
                    const memberName =
                        `${members[ID].firstName} ${members[ID].secondName}, ${members[ID].category}`;

                    // NYTT: Undvik dubbla medlemmar i projektet
                    if (!projectMembers.includes(memberName)) {
                        projectMembers.push(memberName);
                    }

                    // ÄNDRAT: Hantera medlemmar utan tidigare projekt
                    memberProjects = [
                        ...(members[ID].projectMember ?? [])
                    ];

                    // NYTT: Undvik dubbla projekt hos medlemmen
                    if (!memberProjects.includes(projectTitle)) {
                        memberProjects.push(projectTitle);
                    }

                    if (projectMembers[0] === "") {
                        projectMembers.shift();
                    }

                    await updateMemberProjects(memberProjects, ID);
                }
            }

            // ÄNDRAT: Spara projektets medlemslista först
            await addProjectMembers(projectMembers, projectID);

            // NYTT: Uppdatera sidan efter att allt har sparats
            await refreshPage();

            closeModal();

        } catch (error) {
            console.error(
                "Could not assign members to project:",
                error
            );

            window.alert(
                "Something went wrong. Could not assign members to the project."
            );
        }
    });
}
