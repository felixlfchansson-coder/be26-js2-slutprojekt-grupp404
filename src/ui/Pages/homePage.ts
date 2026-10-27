export function homePage(): HTMLElement {
    const page = document.createElement("section");
    page.className = "home-page";

    page.innerHTML = `
        <header class="home__hero">
            <div class="home__hero-content">
                <div class="home__welcome">
                    <span class="home__eyebrow">
                        <i data-lucide="sparkles"></i>
                        DIN PERSONLIGA ARBETSYTA
                    </span>

                    <h1>
                        Välkommen tillbaka!
                        <span>Här börjar din arbetsdag.</span>
                    </h1>

                    <p>
                        Få en tydlig överblick över dina projekt,
                        tilldelade uppgifter och kommande deadlines.
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

        <!-- VÄLJ MEDLEM -->
        <section class="home__member-selector">
            <div class="home__member-selector-text">
                <span class="home__eyebrow">
                    <i data-lucide="user-round"></i>
                    PERSONLIG ÖVERBLICK
                </span>

                <h2>Min arbetsöverblick</h2>

                <p>
                    Välj en teammedlem för att se personens
                    projekt, uppgifter och deadlines.
                </p>
            </div>

            <div class="home__member-selector-field">
                <label for="home-member-select">
                    Visa överblick för
                </label>

                <select id="home-member-select">
                    <option value="">Välj medlem</option>
                </select>
            </div>
        </section>

        <!-- PERSONLIG STATISTIK -->
        <div class="home__stats">
            <article class="home__stat-card">
                <div class="home__stat-icon purple">
                    <i data-lucide="folder-kanban"></i>
                </div>

                <div>
                    <h2 id="home-projects-total">0</h2>
                    <span>Mina projekt</span>
                </div>
            </article>

            <article class="home__stat-card">
                <div class="home__stat-icon blue">
                    <i data-lucide="list-checks"></i>
                </div>

                <div>
                    <h2 id="home-tasks-total">0</h2>
                    <span>Pågående uppgifter</span>
                </div>
            </article>

            <article class="home__stat-card">
                <div class="home__stat-icon green">
                    <i data-lucide="user-round-check"></i>
                </div>

                <div>
                    <h2 id="home-members-total">0</h2>
                    <span>Vald medlem</span>
                </div>
            </article>

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

        <!-- PERSONLIG DASHBOARD -->
        <div class="home__dashboard">

            <!-- MINA PROJEKT -->
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

                <div
                    id="home-member-projects"
                    class="home__projects"
                >
                    <p class="home__empty">
                        Välj en medlem för att se projekt.
                    </p>
                </div>
            </section>

            <!-- MINA UPPGIFTER -->
            <section class="home__panel home__tasks-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="list-todo"></i>
                        </span>

                        <h2>Mina uppgifter</h2>
                    </div>
                </div>

                <div
                    id="home-member-tasks"
                    class="home__tasks"
                >
                    <p class="home__empty">
                        Välj en medlem för att se uppgifter.
                    </p>
                </div>
            </section>

            <!-- KOMMANDE DEADLINES -->
            <section class="home__panel home__activity-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="calendar-clock"></i>
                        </span>

                        <h2>Kommande deadlines</h2>
                    </div>
                </div>

                <div
                    id="home-member-deadlines"
                    class="home__activity"
                >
                    <p class="home__empty">
                        Välj en medlem för att se deadlines.
                    </p>
                </div>
            </section>

            <!-- Deadlinekoll -->
            <section class="home__panel home__members-panel">
                <div class="home__section-header">
                    <div class="home__section-title">
                        <span class="home__section-icon">
                            <i data-lucide="alert-circle"></i>
                        </span>

                        <h2>Deadlinekoll</h2>
                    </div>
                </div>

                <div
                    id="home-member-overdue"
                    class="home__members"
                >
                    <p class="home__empty">
                        Inga försenade uppgifter att visa.
                    </p>
                </div>
            </section>

        </div>
    `;

    return page;
}
