import { renderProjectForm } from "../ui/projectForm";
import { addNewProject } from "../modules/projects";

export function initProjectController() {
    const newProjectButton = document.getElementById("new-project-button");

    console.log("Hittade knappen:", newProjectButton);

    if (!newProjectButton) return;

    newProjectButton.addEventListener("click", () => {
        console.log("Knappen klickades!");

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
            // const members = String[](formData.get("project-members-list") ?? "")

                try {
                    await addNewProject(
                        title,
                        description,
                        Date.parse(deadline),
                        members // commented line above - needs array data type to make work.
                )

            console.log("Project added!")
            closeModal()

            } catch (error) {
                console.error("Could not add project: ", error)
            }
        })
    });
}