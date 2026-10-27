import type { FirebaseMember } from "../../model/HomeType.ts";

import {
    createHomeCard,
    renderEmptyMessage
} from "./homeContentHelpers.ts";

export function renderHomeMembers(
    container: HTMLElement,
    members: FirebaseMember[]
): void {
    container.replaceChildren();

    if (members.length === 0) {
        renderEmptyMessage(container, "Inga medlemmar att visa ännu.");
        return;
    }

    members.forEach(member => {
        container.appendChild(
            createHomeCard(
                `${member.firstName} ${member.secondName}`,
                `${member.category ?? "Ingen kategori"} · ${member.ongoingTasks ?? 0} pågående uppgifter`
            )
        );
    });
}
