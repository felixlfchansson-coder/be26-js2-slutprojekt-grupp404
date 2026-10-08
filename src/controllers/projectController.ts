import { renderProjectForm } from "../ui/projectForm";


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
    });
}