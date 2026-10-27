import {
    createElement,
    Folder,
    FileText,
    CalendarDays,
    UsersRound,
    X,
    Check
} from "lucide";

export function renderProjectForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-form-title"
        >
            <div class="modal__header">
                <h2 id="project-form-title">Nytt projekt</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng"
                ></button>
            </div>

            <form id="project-form">
                <div class="form-group">
                    <label for="project-title">
                        <span class="project-form__title-icon"></span>
                        Projektnamn
                    </label>

                    <input
                        type="text"
                        id="project-title"
                        name="projectTitle"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="project-description">
                        <span class="project-form__description-icon"></span>
                        Beskrivning (Markdown)
                    </label>

                    <textarea
                        id="project-description"
                        name="projectDescription"
                        rows="5"
                        placeholder="Beskriv projektet..."
                        required
                    ></textarea>
                </div>

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

                <fieldset class="form-group">
                    <legend>
                        <span class="project-form__members-icon"></span>
                        Projektmedlemmar
                    </legend>

                    <div id="project-members-list"></div>
                </fieldset>

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
                        Skapa projekt
                    </button>
                </div>
            </form>
        </div>
    `;

    function addIcon(
        selector: string,
        icon: typeof Folder,
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
    addIcon(".project-form__title-icon", Folder);
    addIcon(".project-form__description-icon", FileText);
    addIcon(".project-form__deadline-icon", CalendarDays);
    addIcon(".project-form__members-icon", UsersRound);
    addIcon(".project-form__submit-icon", Check);

    return overlay;
}
