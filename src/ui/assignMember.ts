import {
    createElement,
    X,
    Check
} from "lucide";
import { getData } from "../modules/firebaseRequest";

export function renderAssignMember(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="member-form-title">

            <div class="modal__header">
                <h2 id="member-form-title">Assign Member</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng">
                </button>
            </div>

            <form id="assign-member-form">

                <div class="form-group" id="assignable-members-wrapper">

                </div>

                <div class="modal__actions">
                    <button type="button" class="modal__cancel">
                        Avbryt
                    </button>

                    <button type="submit" class="modal__submit">
                        <span class="member-form__submit-icon"></span>
                        Tilldela medlem
                    </button>
                </div>

            </form>
        </div>
    `;

    const closeButton = overlay.querySelector(".modal__close");
    const submitIcon = overlay.querySelector(".member-form__submit-icon");

    closeButton?.appendChild(createElement(X, {
        width: 18,
        height: 18
    }));

    submitIcon?.appendChild(createElement(Check, {
        width: 16,
        height: 16
    }));

    return overlay;
}

export async function assignableMemberOptions(projectID:string, taskID:string) {
    const members = await getData("members")
    const projects = await getData("projects")
    const assignableMembersWrapper = document.getElementById("assignable-members-wrapper")
    console.log(projects)
    console.log(members)
    if (!assignableMembersWrapper) return;

    for (const ID in members) {
        if (members[ID].category === projects[projectID].tasks[taskID].taskCategory) {
            const assignableOptionDiv = document.createElement("div")
            let memberOptionName = `${members[ID].firstName} ${members[ID].secondName}, ${members[ID]. category}`
            assignableOptionDiv.innerHTML = `
            <input type="checkbox" id="${ID}" name="assignaleMember"/>
            <label for="${ID}">${memberOptionName}</label>
            `
            assignableMembersWrapper.append(assignableOptionDiv)
        }
    }
}