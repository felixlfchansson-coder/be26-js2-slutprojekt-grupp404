
import {
    createElement,
    X,
    Check
} from "lucide";

import { getData } from "../../modules/firebaseRequest";


export function renderAssignMember(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-form-title"
        >
            <div class="modal__header">
                <h2 id="member-form-title">Assign Member</h2>

                <button
                    type="button"
                    class="modal__close"
                    aria-label="Stäng"
                ></button>
            </div>

            <form id="assign-member-form">
                <div
                    class="form-group"
                    id="assignable-members-wrapper"
                ></div>

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
                        <span class="member-form__submit-icon"></span>
                        Tilldela medlem
                    </button>
                </div>
            </form>
        </div>
    `;

    const closeButton = overlay.querySelector(".modal__close");
    const submitIcon = overlay.querySelector(".member-form__submit-icon");

    closeButton?.appendChild(
        createElement(X, {
            width: 18,
            height: 18
        })
    );

    submitIcon?.appendChild(
        createElement(Check, {
            width: 16,
            height: 16
        })
    );

    return overlay;
}


function createMemberOption(
    memberID: string,
    firstName: string,
    secondName: string,
    category: string
): HTMLDivElement {
    const option = document.createElement("div");
    option.classList.add("assign-member__option");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = memberID;
    checkbox.name = "assignaleMember";

    const label = document.createElement("label");
    label.htmlFor = memberID;
    label.textContent = `${firstName} ${secondName}, ${category}`;

    option.append(checkbox, label);

    return option;
}


export async function assignableMembersToTasks(
    projectID: string,
    taskID: string
): Promise<void> {
    const members = await getData("members");
    const projects = await getData("projects");

    const wrapper = document.getElementById("assignable-members-wrapper");

    if (!wrapper) return;

    const taskCategory = projects[projectID].tasks[taskID].taskCategory;

    for (const memberID in members) {
        const member = members[memberID];

        if (member.category !== taskCategory) continue;

        const option = createMemberOption(
            memberID,
            member.firstName,
            member.secondName,
            member.category
        );

        wrapper.appendChild(option);
    }
}


export async function assignableMembersToProject(
    projectID: string
): Promise<void> {
    const members = await getData("members");
    const projects = await getData("projects");

    const wrapper = document.getElementById("assignable-members-wrapper");

    if (!wrapper) return;

    const projectTitle = projects[projectID].projectTitle;

    for (const memberID in members) {
        const member = members[memberID];

        if (member.projectMember.includes(projectTitle)) continue;

        const option = createMemberOption(
            memberID,
            member.firstName,
            member.secondName,
            member.category
        );

        wrapper.appendChild(option);
    }
}
