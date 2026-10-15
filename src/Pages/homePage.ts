
export function homePage(): HTMLElement {
    const page = document.createElement("section");
    page.className = "home-page";

    page.innerHTML = `
        <!-- HERO -->
        <header class="home__hero">
            <div class="home__hero-content">

                <div class="home__welcome">
                    <span class="home__eyebrow">
                        <i data-lucide="sparkles"></i>
                        DIN ARBETSYTA
                    </span>

                    <h1>
                        Välkommen tillbaka!
                        <span>Redo att skapa något bra?</span>
                    </h1>

                    <p>
                        Håll koll på dina projekt, uppgifter och
                        teamets framsteg – allt på ett ställe.
                    </p>

                    <div class="home__hero-actions">

                        <button
                            class="home__btn home__btn-secondary"
                            id="home-view-projects"
                            type="button"
                        >
                            Se alla projekt
                            <i data-lucide="arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- DECORATIVE KANBAN -->
                <div class="home__hero-visual" aria-hidden="true">
                    <div class="home__mini-board">

                        <div class="home__mini-column">
                            <div class="home__mini-title">
                                <span class="home__dot yellow"></span>
                                Att göra
                            </div>

                            <div class="home__mini-task"></div>
                            <div class="home__mini-task short"></div>
                        </div>

                        <div class="home__mini-column">
                            <div class="home__mini-title">
                                <span class="home__dot pink"></span>
                                Pågående
                            </div>

                            <div class="home__mini-task"></div>
                            <div class="home__mini-task short"></div>
                        </div>

                        <div class="home__mini-column">
                            <div class="home__mini-title">
                                <span class="home__dot green"></span>
                                Klart
                            </div>

                            <div class="home__mini-task"></div>
                            <div class="home__mini-task short"></div>
                        </div>

                    </div>
                </div>
            </div>
        </header>

        <!-- FLOATING STATISTICS -->
        <div class="home__stats">

            <!-- PROJECTS -->
            <article class="home__stat-card">
                <div class="home__stat-icon purple">
                    <i data-lucide="folder-kanban"></i>
                </div>

                <div>
                    <h2 id="home-projects-total">0</h2>
                    <span>Totalt antal projekt</span>
                </div>
            </article>

            <!-- TASKS -->
            <article class="home__stat-card">
                <div class="home__stat-icon blue">
                    <i data-lucide="list-checks"></i>
                </div>

                <div>
                    <h2 id="home-tasks-total">0</h2>
                    <span>Pågående uppgifter</span>
                </div>
            </article>

            <!-- MEMBERS -->
            <article class="home__stat-card">
                <div class="home__stat-icon green">
                    <i data-lucide="users-round"></i>
                </div>

                <div>
                    <h2 id="home-members-total">0</h2>
                    <span>Totalt antal medlemmar</span>
                </div>
            </article>

            <!-- DEADLINE -->
            <article class="home__stat-card">
                <div class="home__stat-icon orange">
                    <i data-lucide="calendar-days"></i>
                </div>

                <div>
                    <h2 id="home-deadline">–</h2>
                    <span>Närmaste deadline</span>
                </div>
            </article>

        </div>

        <!-- DASHBOARD CONTENT -->
        <div class="home__dashboard">

            <!-- PROJECTS -->
            <section class="home__panel home__projects-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="folder-kanban"></i>
                        </span>

                        <h2>Mina projekt</h2>
                    </div>

                    <button
                        class="home__text-btn"
                        id="home-all-projects"
                        type="button"
                    >
                        Se alla
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>

                <div id="home-projects" class="home__projects">
                    <p class="home__empty">
                        Inga projekt att visa ännu.
                    </p>
                </div>
            </section>

            <!-- TASKS -->
            <section class="home__panel home__tasks-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="list-todo"></i>
                        </span>

                        <h2>Mina uppgifter</h2>
                    </div>
                </div>

                <div id="home-tasks" class="home__tasks">
                    <p class="home__empty">
                        Inga uppgifter att visa ännu.
                    </p>
                </div>
            </section>

            <!-- ACTIVITY -->
            <section class="home__panel home__activity-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="calendar-clock"></i>
                        </span>

                        <h2>Kommande deadlines</h2>
                    </div>
                </div>

               <div id="home-deadlines" class="home__activity">
                    <p class="home__empty">
                        Inga kommande deadlines.
                    </p>
                </div>
            </section>

            <!-- MEMBERS -->
            <section class="home__panel home__members-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="users-round"></i>
                        </span>

                        <h2>Teammedlemmar</h2>
                    </div>
                </div>

                <div id="home-members" class="home__members">
                    <p class="home__empty">
                        Inga medlemmar att visa ännu.
                    </p>
                </div>
            </section>

        </div>
    `;

    return page;
}
