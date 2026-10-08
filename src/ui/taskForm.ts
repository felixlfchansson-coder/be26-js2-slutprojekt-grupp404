export function renderTaskForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="task-form-title">

            <div class="modal__header">
                <h2 id="task-form-title">Ny task</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng formuläret"
                >
                    &times;
                </button>
            </div>

            <form id="task-form">

                <div class="form-group">
                    <label for="task-title">Titel</label>
                    <input
                        type="text"
                        id="task-title"
                        name="taskTitle"
                        placeholder="Ex. Bygg inloggningssida"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="task-description">
                        Beskrivning (Markdown)
                    </label>
                    <textarea
                        id="task-description"
                        name="taskDescription"
                        rows="5"
                        placeholder="Beskriv uppgiften..."
                        required
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="task-category">Kategori</label>
                    <select
                        id="task-category"
                        name="taskCategory"
                        required
                    >
                        <option value="">Välj kategori</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="ux">UX</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="task-priority">Prioritet</label>
                    <select
                        id="task-priority"
                        name="taskPriority"
                        required
                    >
                        <option value="">Välj prioritet</option>
                        <option value="1">1 – Hög</option>
                        <option value="2">2 – Medel</option>
                        <option value="3">3 – Låg</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="task-deadline">Deadline</label>
                    <input
                        type="date"
                        id="task-deadline"
                        name="taskDeadline"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="task-status">Status</label>
                    <select
                        id="task-status"
                        name="status"
                        required
                    >
                        <option value="toDo">Att göra</option>
                        <option value="inProgress">Pågående</option>
                        <option value="completed">Klart</option>
                    </select>
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
                    >
                        Skapa task
                    </button>
                </div>

            </form>
        </div>
    `;

    return overlay;
}