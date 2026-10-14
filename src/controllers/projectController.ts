import { renderProjectForm } from "../ui/projectForm";
import { addNewProject, deleteProject } from "../modules/projects";

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
        
        const form = overlay.querySelector<HTMLFormElement>("#project-form")
        form?.addEventListener("submit", async event =>{
            event.preventDefault()
    
            const formData = new FormData(form)

            const title = String(formData.get("projectTitle") ?? "")
            const description = String(formData.get("projectDescription") ?? "")
            const deadline = String(formData.get("projectDeadline") ?? "")
                let returnDeadline: string | number = deadline.replaceAll("-", "")
                    returnDeadline = parseFloat(returnDeadline)
            const members = Object(formData.get("project-members-list") ?? "")

                try {
                    await addNewProject(
                        title,
                        description,
                        returnDeadline,
                        members
                )

            console.log("Project added!")
            closeModal()

            } catch (error) {
                console.error("Could not add project: ", error)
            }
        })
    });   
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

            projectElement.remove();
        } catch {
            window.alert("Det gick inte att ta bort projektet. Försök igen.");
        }
    });
}