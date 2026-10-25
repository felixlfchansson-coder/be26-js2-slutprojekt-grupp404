
import type { FirebaseMember } from "../model/HomeType";

export function belongsToMember(
    storedMembers: string[] | string | undefined,
    memberID: string,
    member: FirebaseMember
): boolean {
    const fullName = `${member.firstName} ${member.secondName}`.trim();
    const category = member.category ?? member.role ?? "";

    const possibleNames = [
        memberID,
        fullName,
        `${fullName}, ${category}`
    ].map(name => name.toLowerCase().trim());

    const storedNames = Array.isArray(storedMembers)
        ? storedMembers
        : storedMembers
          ? [storedMembers]
          : [];

    return storedNames.some(name =>
        possibleNames.includes(String(name).toLowerCase().trim())
    );
}

export function populateMemberSelect(
    memberSelect: HTMLSelectElement,
    members: Record<string, FirebaseMember>
): void {
    const previousSelection = memberSelect.value;

    memberSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Välj medlem";
    memberSelect.appendChild(placeholder);

    Object.entries(members).forEach(([memberID, member]) => {
        const option = document.createElement("option");

        option.value = memberID;
        option.textContent = `${member.firstName} ${member.secondName}`;

        memberSelect.appendChild(option);
    });

    if (members[previousSelection]) {
        memberSelect.value = previousSelection;
    }
}
