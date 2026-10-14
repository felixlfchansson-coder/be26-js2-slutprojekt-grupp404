
import {
    createElement,
    ListTodo,
    Flag,
    CalendarDays,
    CircleCheck,
    X,
    Check
} from "lucide";

export function renderEditTaskTForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="edit-task-form-title">

            <div class="modal__header">
                <h2 id="edit-task-form-title">Ny task</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng formuläret">
                </button>
            </div>

            <form id="edit-task-form">

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
                        class="modal__cancel">
                        Avbryt
                    </button>

                    <button
                        type="submit"
                        class="modal__submit"
                        id="taskSubmitButton">
                        <span class="task-form__submit-icon"></span>
                        Skapa task
                    </button>
                </div>

            </form>
        </div>
    `;

    const addIcon = (
        selector: string,
        icon: typeof ListTodo,
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
    addIcon(".task-form__priority-icon", Flag);
    addIcon(".task-form__deadline-icon", CalendarDays);
    addIcon(".task-form__status-icon", CircleCheck);
    addIcon(".task-form__submit-icon", Check);

    return overlay;
}
