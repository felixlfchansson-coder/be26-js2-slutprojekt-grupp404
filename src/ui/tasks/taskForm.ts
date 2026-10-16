
import {
    createElement,
    ListTodo,
    FileText,
    Tags,
    Flag,
    CalendarDays,
    X,
    Check
} from "lucide";

export function renderTaskForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-form-title"
        >
            <div class="modal__header">
                <h2 id="task-form-title">Ny task</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng formuläret"
                ></button>
            </div>

            <form id="task-form">
                <div class="form-group">
                    <label for="task-title">
                        <span class="task-form__title-icon"></span>
                        Titel
                    </label>

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
                        <span class="task-form__description-icon"></span>
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
                    <label for="task-category">
                        <span class="task-form__category-icon"></span>
                        Kategori
                    </label>

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
                    <label for="task-priority">
                        <span class="task-form__priority-icon"></span>
                        Prioritet
                    </label>

                    <select
                        id="task-priority"
                        name="taskPriority"
                        required
                    >
                        <option value="">Välj prioritet</option>
                        <option value="High">1 – Hög</option>
                        <option value="Medium">2 – Medel</option>
                        <option value="Low">3 – Låg</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="task-deadline">
                        <span class="task-form__deadline-icon"></span>
                        Deadline
                    </label>

                    <input
                        type="date"
                        id="task-deadline"
                        name="taskDeadline"
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
                        id="taskSubmitButton"
                    >
                        <span class="task-form__submit-icon"></span>
                        Skapa task
                    </button>
                </div>
            </form>
        </div>
    `;

    function addIcon(
        selector: string,
        icon: typeof ListTodo,
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
    addIcon(".task-form__title-icon", ListTodo);
    addIcon(".task-form__description-icon", FileText);
    addIcon(".task-form__category-icon", Tags);
    addIcon(".task-form__priority-icon", Flag);
    addIcon(".task-form__deadline-icon", CalendarDays);
    addIcon(".task-form__submit-icon", Check);

    return overlay;
}
