import {
    createElement,
    Folder,
    FileText,
    CalendarDays,
    UsersRound,
    X,
    Check
} from "lucide";

export function renderEditProjectForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="edit-project-form-title">

            <div class="modal__header">
                <h2 id="edit-project-form-title">Nytt projekt</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng">
                </button>
            </div>

            <form id="edit-project-form">

                <div class="form-group">
                    <label for="project-deadline">
                        <span class="project-form__deadline-icon"></span>
                        Deadline
                    </label>

                    <input
                        id="project-deadline"
                        name="projectDeadline"
                        type="date"
                        required
                    >
                </div>

                <div class="modal__actions">
                    <button type="button" class="modal__cancel">
                        Avbryt
                    </button>

                    <button
                        type="submit"
                        class="modal__submit"
                        id="projectSubmitButton">
                        <span class="project-form__submit-icon"></span>
                        Skapa projekt
                    </button>
                </div>

            </form>
        </div>
    `;

    const addIcon = (
        selector: string,
        icon: typeof Folder,
        size = 16
    ) => {
        const element = overlay.querySelector(selector);

        element?.appendChild(
            createElement(icon, {
                width: size,
                height: size
            })
        );
    };

    addIcon(".modal__close", X, 18);
    addIcon(".project-form__title-icon", Folder);
    addIcon(".project-form__description-icon", FileText);
    addIcon(".project-form__deadline-icon", CalendarDays);
    addIcon(".project-form__members-icon", UsersRound);
    addIcon(".project-form__submit-icon", Check);

    return overlay;
}