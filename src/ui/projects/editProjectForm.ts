
import {
    createElement,
    CalendarDays,
    X,
    Check
} from "lucide";

export function renderEditProjectForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-project-form-title"
        >
            <div class="modal__header">
                <h2 id="edit-project-form-title">
                    Ändra projektets deadline
                </h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng formuläret"
                ></button>
            </div>

            <form id="edit-project-form">
                <div class="form-group">
                    <label for="project-deadline">
                        <span class="project-form__deadline-icon"></span>
                        Deadline
                    </label>

                    <input
                        type="date"
                        id="project-deadline"
                        name="projectDeadline"
                        required
                    >
                </div>

                <div class="modal__actions">
                    <button
                        type="button"
                        class="modal__cancel"
                    >
                        Avbryt
                    </button>

                    <button
                        type="submit"
                        class="modal__submit"
                        id="projectSubmitButton"
                    >
                        <span class="project-form__submit-icon"></span>
                        Spara ändringar
                    </button>
                </div>
            </form>
        </div>
    `;

    function addIcon(
        selector: string,
        icon: typeof CalendarDays,
        size = 16
    ): void {
        const element = overlay.querySelector(selector);

        if (!element) return;

        element.appendChild(
            createElement(icon, {
                width: size,
                height: size
            })
        );
    }

    addIcon(".modal__close", X, 18);
    addIcon(".project-form__deadline-icon", CalendarDays);
    addIcon(".project-form__submit-icon", Check);

    return overlay;
}
