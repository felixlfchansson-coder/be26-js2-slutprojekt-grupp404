
import {
    createElement,
    UserRoundPlus,
    UsersRound,
    FolderKanban,
    ListTodo,
    Search
} from "lucide";

export function membersPage(): HTMLElement {
    const page = document.createElement("div");
    page.classList.add("members-page");

    page.innerHTML = `
        <header class="dashboard__header">
            <div>
                <h2>Alla medlemmar</h2>
                <p>
                    Hantera teamets medlemmar och deras uppgifter.
                </p>
            </div>

            <button id="new-member-button" type="button">
                <span class="members-page__add-icon"></span>
                Ny medlem
            </button>
        </header>

        <section class="members-stats">
            <article class="members-stats__card">
                <span class="members-stats__icon--members"></span>
                <p>Totalt medlemmar</p>
                <strong id="members-total">0</strong>
            </article>

            <article class="members-stats__card">
                <span class="members-stats__icon--projects"></span>
                <p>Kopplade projekt</p>
                <strong id="members-projects-total">0</strong>
            </article>

            <article class="members-stats__card">
                <span class="members-stats__icon--tasks"></span>
                <p>Tilldelade tasks</p>
                <strong id="members-tasks-total">0</strong>
            </article>
        </section>

        <section class="members-overview">
            <div class="members-overview__header">
                <h3>Medlemsöversikt</h3>

                <label class="members-overview__search">
                    <span class="members-overview__search-icon"></span>
                    <input
                        id="members-search"
                        type="search"
                        placeholder="Sök medlem..."
                        aria-label="Sök medlem"
                    >
                </label>
            </div>

            <div
                id="members-container"
                class="members-container"
            ></div>
        </section>
    `;

    function addIcon(selector: string, icon: typeof UserRoundPlus) {
        page.querySelector(selector)?.appendChild(
            createElement(icon, {
                width: 18,
                height: 18
            })
        );
    }

    addIcon(".members-page__add-icon", UserRoundPlus);
    addIcon(".members-stats__icon--members", UsersRound);
    addIcon(".members-stats__icon--projects", FolderKanban);
    addIcon(".members-stats__icon--tasks", ListTodo);
    addIcon(".members-overview__search-icon", Search);

    return page;
}
