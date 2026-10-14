
import {
    createElement,
    UserRound,
    BriefcaseBusiness,
    X,
    Check
} from "lucide";

export function renderMemberForm(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="member-form-title">

            <div class="modal__header">
                <h2 id="member-form-title">Ny medlem</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng">
                </button>
            </div>

            <form id="member-form">

                <div class="form-group">
                    <label for="member-firstname">
                        <span class="member-form__firstname-icon"></span>
                        Förnamn
                    </label>

                    <input
                        id="member-firstname"
                        name="firstName"
                        type="text"
                        placeholder="Ange förnamn"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="member-lastname">
                        <span class="member-form__lastname-icon"></span>
                        Efternamn
                    </label>

                    <input
                        id="member-lastname"
                        name="secondName"
                        type="text"
                        placeholder="Ange efternamn"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="member-role">
                        <span class="member-form__role-icon"></span>
                        Roll
                    </label>

                    <select
                        id="member-role"
                        name="role"
                        required
                    >
                        <option value="" disabled selected>
                            Välj roll
                        </option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="ux">UX</option>
                    </select>
                </div>

                <div class="modal__actions">
                    <button type="button" class="modal__cancel">
                        Avbryt
                    </button>

                    <button type="submit" class="modal__submit">
                        <span class="member-form__submit-icon"></span>
                        Lägg till medlem
                    </button>
                </div>

            </form>
        </div>
    `;

    const closeButton = overlay.querySelector(".modal__close");
    const firstNameIcon = overlay.querySelector(".member-form__firstname-icon");
    const lastNameIcon = overlay.querySelector(".member-form__lastname-icon");
    const roleIcon = overlay.querySelector(".member-form__role-icon");
    const submitIcon = overlay.querySelector(".member-form__submit-icon");

    closeButton?.appendChild(createElement(X, {
        width: 18,
        height: 18
    }));

    firstNameIcon?.appendChild(createElement(UserRound, {
        width: 16,
        height: 16
    }));

    lastNameIcon?.appendChild(createElement(UserRound, {
        width: 16,
        height: 16
    }));

    roleIcon?.appendChild(createElement(BriefcaseBusiness, {
        width: 16,
        height: 16
    }));

    submitIcon?.appendChild(createElement(Check, {
        width: 16,
        height: 16
    }));

    return overlay;
}
