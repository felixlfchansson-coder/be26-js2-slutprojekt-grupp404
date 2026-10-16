
import { createElement, UserRound, Pencil } from "lucide";

// Så här sparas medlemmarna i Firebase
type FirebaseMember = {
    firstName: string;
    secondName: string;
    category?: string;
    ongoingTasks?: number;
    projectMember?: string[];
};

export function renderMembers(
    members: Record<string, FirebaseMember> | null
): void {
    const container = document.getElementById("members-container");

    const membersTotal = document.getElementById("members-total");
    const projectsTotal = document.getElementById("members-projects-total");
    const tasksTotal = document.getElementById("members-tasks-total");

    if (!container) return;

    container.replaceChildren();

    const memberEntries = Object.entries(members ?? {});

    // Uppdatera statistiken
    if (membersTotal) {
        membersTotal.textContent = String(memberEntries.length);
    }

    // Räkna unika projekt som medlemmarna är kopplade till
    if (projectsTotal) {
        const projectIDs = new Set(
            memberEntries.flatMap(([, member]) =>
                member.projectMember ?? []
            )
        );

        projectsTotal.textContent = String(projectIDs.size);
    }

    // Räkna medlemmarnas pågående tasks från Firebase
    if (tasksTotal) {
        const totalOngoingTasks = memberEntries.reduce(
            (total, [, member]) =>
                total + (member.ongoingTasks ?? 0),
            0
        );

        tasksTotal.textContent = String(totalOngoingTasks);
    }

    // Om det inte finns några medlemmar
    if (memberEntries.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("members-container__empty");
        emptyMessage.textContent = "Inga medlemmar ännu.";

        container.appendChild(emptyMessage);
        return;
    }

    // Skapa tabellen
    const table = document.createElement("table");
    table.classList.add("members-table");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Medlem</th>
                <th>Kategori</th>
                <th>Projekt</th>
                <th>Åtgärder</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    if (!tbody) return;

    // Rendera varje medlem
    memberEntries.forEach(([memberID, member]) => {
        const row = document.createElement("tr");
        row.dataset.memberId = memberID;

        // Medlemsnamn och avatar
        const nameCell = document.createElement("td");
        nameCell.classList.add("members-table__member");

        const avatar = document.createElement("span");
        avatar.classList.add("members-table__avatar");

        avatar.appendChild(
            createElement(UserRound, {
                width: 18,
                height: 18
            })
        );

        const name = document.createElement("span");
        name.textContent =
            `${member.firstName ?? ""} ${member.secondName ?? ""}`.trim();

        nameCell.append(avatar, name);

        // Medlemmens kategori
        const categoryCell = document.createElement("td");

        const category = document.createElement("span");
        category.classList.add("members-table__category");
        category.textContent =
            member.category ?? "Ingen kategori";

        categoryCell.appendChild(category);

        // Antal projekt
        const projectsCell = document.createElement("td");
        projectsCell.textContent = String(
            member.projectMember?.length ?? 0
        );

        // Antal pågående tasks från Firebase
        const tasksCell = document.createElement("td");
        tasksCell.textContent = String(
            member.ongoingTasks ?? 0
        );

        // Redigera medlem
        const actionsCell = document.createElement("td");
        actionsCell.classList.add("members-table__actions");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("member__edit");
        editButton.title = "Redigera medlem";
        editButton.setAttribute("aria-label", "Redigera medlem");

        editButton.appendChild(
            createElement(Pencil, {
                width: 18,
                height: 18
            })
        );

        actionsCell.appendChild(editButton);

       row.append(
            nameCell,
            categoryCell,
            projectsCell,
            tasksCell,
            actionsCell
        );

        tbody.appendChild(row);
    });

    container.appendChild(table);
}
