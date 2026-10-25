
import { getData } from "../../firebaseRequests/dataRequest.ts";
import type { FirebaseProject, FirebaseMember } from "../../model/HomeType.ts";

import { populateMemberSelect } from "../../controllers/homeMembers.ts";
import { getMemberData } from "./homeDashboard.ts";
import { renderDashboardStats, renderDashboardLists } from "./homeCards.ts";

export async function renderHome(): Promise<void> {
    const [projects, members] = await Promise.all([
        getData("projects") as Promise<Record<string, FirebaseProject> | null>,
        getData("members") as Promise<Record<string, FirebaseMember> | null>
    ]);

    const memberSelect = document.getElementById(
        "home-member-select"
    ) as HTMLSelectElement | null;

    if (!memberSelect) return;

    populateMemberSelect(memberSelect, members ?? {});

    function updateDashboard(): void {
        const memberID = memberSelect!.value;
        const member = members?.[memberID];

        const { memberProjects, memberTasks } = getMemberData(
            projects ?? {},
            memberID,
            member
        );

        renderDashboardStats(memberProjects, memberTasks, member);
        renderDashboardLists(memberProjects, memberTasks);
    }

    memberSelect.onchange = updateDashboard;

    updateDashboard();
}
