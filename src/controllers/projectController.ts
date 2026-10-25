import { renderProjectForm } from "../ui/projects/projectForm";
import { addNewProject, editProjectDeadline, deleteProject } from "../firebaseRequests/projects";
import { dateToNumber } from "../ui/components/DateFormater";
import { renderEditProjectForm } from "../ui/projects/editProjectForm";
import { refreshPage } from "./refreshPage.ts";

export function initProjectController() {
    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const newProjectButton = target.closest("#new-project-button");

        if (!newProjectButton) return;

        const overlay = renderProjectForm();

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
            
        const newProjectForm = overlay.querySelector<HTMLFormElement>("#project-form")
        newProjectForm?.addEventListener("submit", async event =>{
            event.preventDefault()
    
            const formData = new FormData(newProjectForm)

            const title = String(formData.get("projectTitle") ?? "")
            const description = String(formData.get("projectDescription") ?? "")
            const deadline = String(formData.get("projectDeadline") ?? "")
            const members = Object(formData.get("project-members-list") ?? "")

                try {
                 await addNewProject(
                    title,
                    description,
                    dateToNumber(deadline),
                    members
                );

                await refreshPage();

            console.log("Project added!")
            closeModal()

            } catch (error) {
                console.error("Could not add project: ", error)
                window.alert("Something went wrong. The new project could not be added.");
            }
        })
    });
}

export function editProjectDeadlineForm() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;
        const editProjectButton = target.closest(".project__edit");

        if (!editProjectButton) return;

        const projectElement = editProjectButton.closest<HTMLElement>(".project");
        const projectID = projectElement?.dataset.projectId;
        if (!projectID) return;

        openTaskModal(projectID);

    })
}

async function openTaskModal(projectID:string) {

    const editProjectOverlay = renderEditProjectForm()

    document.body.appendChild(editProjectOverlay);

    const closeButton = editProjectOverlay.querySelector(".modal__close");
    const cancelButton = editProjectOverlay.querySelector(".modal__cancel");

    function closeModal() {
        editProjectOverlay.remove();
    }

    closeButton?.addEventListener("click", closeModal);
    cancelButton?.addEventListener("click", closeModal);

    editProjectOverlay.addEventListener("click", (event) => {
        if (event.target === editProjectOverlay) {
            closeModal();
        }
    });

    const form = editProjectOverlay.querySelector<HTMLFormElement>("#edit-project-form")
    form?.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const deadline = String(formData.get("projectDeadline") ?? "")

       try {
            await editProjectDeadline(dateToNumber(deadline), projectID);

            await refreshPage();
            closeModal();
        } catch (error) {
            console.error("Could not update project deadline.", error);
            window.alert("Something went wrong. The project's deadline could not be updated.");
        }
        return;
    })
}

export function initDeleteProjectController() {
    document.addEventListener("click", async (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const deleteButton = target.closest(".project__delete");
        if (!deleteButton) return;

        const projectElement = deleteButton.closest<HTMLElement>(".project");
        if (!projectElement) return;

        const projectID = projectElement.dataset.projectId;
        if (!projectID) return;

        const projectTitle =
            projectElement.querySelector(".project__title")?.textContent
            ?? "det här projektet";

        const confirmed = window.confirm(
            `Vill du verkligen ta bort "${projectTitle}"?\n\nAlla tasks i projektet kommer också att tas bort.`
        );

        if (!confirmed) return;

        try {
            await deleteProject(projectID);

            await refreshPage();
        } catch {
            window.alert("Det gick inte att ta bort projektet. Försök igen.");
        }
    });
}