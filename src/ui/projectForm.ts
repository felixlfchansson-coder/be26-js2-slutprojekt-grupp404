export function renderProjectForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal" role="dialog"
             aria-modal="true"
             aria-labelledby="project-form-title">

            <div class="modal__header">
                <h2 id="project-form-title">Nytt projekt</h2>

                <button type="button"
                        class="modal__close"
                        aria-label="Stäng">
                    &times;
                </button>
            </div>

            <form id="project-form">

                <div class="form-group">
                    <label for="project-title">Projektnamn</label>
                    <input
                        id="project-title"
                        name="projectTitle"
                        type="text"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="project-description">
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
                    <label for="project-deadline">Deadline</label>
                    <input
                        id="project-deadline"
                        name="projectDeadline"
                        type="date"
                        required
                    >
                </div>

                <fieldset class="form-group">
                    <legend>Projektmedlemmar</legend>

                    <div id="project-members-list">
                        <!-- Medlemmar hämtas senare från Firebase -->
                    </div>
                </fieldset>

                <div class="modal__actions">
                    <button type="button" class="modal__cancel">
                        Avbryt
                    </button>

                    <button type="submit" class="modal__submit" id="projectSubmitButton">
                        Skapa projekt
                    </button>
                </div>

            </form>
        </div>
    `;

    return overlay;
}