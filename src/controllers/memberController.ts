import { renderMemberForm } from "../ui/memberForm";
import { addNewMember } from "../modules/members";

export function initNewMemberController() {
    const newMemberButton = document.getElementById("nav-add-member")

    if (!newMemberButton) return;
    
    newMemberButton.addEventListener("click", () => {

        const memberOverlay = renderMemberForm()

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

        const form = memberOverlay.querySelector<HTMLFormElement>("#member-form")
        form?.addEventListener("submit", async event =>{
            event.preventDefault()
    
            const formData = new FormData(form)

            const firstName = String(formData.get("firstName") ?? "")
            const secondName = String(formData.get("secondName") ?? "")
            const category = Object(formData.get("role") ?? "")

                try {
                    await addNewMember(
                        firstName,
                        secondName,
                        category
                )

            console.log("Member added!")
            closeModal()

            } catch (error) {
                console.error("Could not add member: ", error)
            }
        })
    })
}