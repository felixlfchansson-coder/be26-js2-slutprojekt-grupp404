
import { renderMemberForm } from "../ui/memberForm";
import { addNewMember } from "../modules/members";

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
