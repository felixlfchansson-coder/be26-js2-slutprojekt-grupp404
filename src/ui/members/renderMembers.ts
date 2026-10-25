
import { createElement, UserRound, Pencil } from "lucide";

import type {
    FirebaseMember,
    FirebaseProject
} from "../../model/HomeType.ts";

// Hämta medlemmens befintliga projekt
function getMemberProjects(
    member: FirebaseMember,
    projects: Record<string, FirebaseProject>
): Map<string, string> {
    const matchedProjects = new Map<string, string>();

    for (const reference of member.projectMember ?? []) {
        const value = String(reference ?? "").trim();

        if (!value) continue;

        const match = Object.entries(projects).find(
            ([projectID, project]) =>
                projectID === value ||
                project.projectTitle === value
        );

        if (match && match[1].projectTitle.trim()) {
            matchedProjects.set(
                match[0],
                match[1].projectTitle
            );
        }
    }

    return matchedProjects;
}

export function renderMembers(
    members: Record<string, FirebaseMember> | null,
    projects: Record<string, FirebaseProject> | null
): void {
    const container = document.getElementById("members-container");

    const membersTotal = document.getElementById("members-total");
    const projectsTotal = document.getElementById("members-projects-total");
    const tasksTotal = document.getElementById("members-tasks-total");

    if (!container) return;

    container.replaceChildren();

    const memberEntries = Object.entries(members ?? {});
    const projectData = projects ?? {};

    // Totalt antal medlemmar
    if (membersTotal) {
        membersTotal.textContent = String(memberEntries.length);
    }

    // Antal unika befintliga projekt
    if (projectsTotal) {
        const uniqueProjectIDs = new Set<string>();

        memberEntries.forEach(([, member]) => {
            const memberProjects = getMemberProjects(
                member,
                projectData
            );

            memberProjects.forEach((_, projectID) => {
                uniqueProjectIDs.add(projectID);
            });
        });

        projectsTotal.textContent = String(uniqueProjectIDs.size);
    }

    // Totalt antal pågående tasks
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
                <th>Pågående tasks</th>
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

        // Medlemmens projekt
        const projectsCell = document.createElement("td");

        const memberProjects = getMemberProjects(
            member,
            projectData
        );

        const projectNames = [...memberProjects.values()];

        // Visa antal projekt
        const projectCount = document.createElement("strong");

        projectCount.textContent =
            `${projectNames.length} projekt`;

        projectsCell.appendChild(projectCount);

        // Visa projektnamn som etiketter
        if (projectNames.length > 0) {
            const projectList = document.createElement("div");
            projectList.classList.add("members-table__projects");

            projectNames.forEach(projectName => {
                const tag = document.createElement("span");
                tag.classList.add("members-table__project-tag");
                tag.textContent = projectName;

                projectList.appendChild(tag);
            });

            projectsCell.appendChild(projectList);
        }

        // Pågående tasks
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

        // Lägg till cellerna i rätt ordning
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
