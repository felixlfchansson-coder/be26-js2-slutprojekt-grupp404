import { createElement, Plus } from "lucide";
export function projectPage(): HTMLElement {
    const page = document.createElement("div");
    page.classList.add("projects-page");

    page.innerHTML = `
        <header class="dashboard__header">

            <div>
                <h2>Alla projekt</h2>
                <p>
                    Visa kategori, medlemmar och sortera i deadline.
                </p>
            </div>

            <div class="dashboard__controls">

                <label>
                    <span>Projekt</span>

                    <select id="category-filter">
                        <option value="all">Alla</option>
                        <option value="frontend">Frontend </option>
                        <option value="backend">Backend</option>
                        <option value="ux">UX</option>
                    </select>
                </label>

                <label>
                    <span>Medlemmar</span>

                    <select id="member-filter">
                        <option value="all">Alla</option>
                        
                    </select>
                </label>

                <label>
                    <span>Sortera</span>

                    <select id="project-sort">
                        <option value="sortAZ">
                            Titel A->Ö
                        </option>
                        <option value="sortZA">
                            Titel Ö->A
                        </option>
                        <option value="closestDeadline">
                            Deadline (närmast)
                        </option>
                        <option value="farthestDeadline">
                            Deadline (längst bort)
                        </option>
                    </select>
                </label>

                <button id="new-project-button" type="button">
                    <span class="new-project-button__icon"></span>
                    Nytt projekt
                </button>

            </div>

        </header>

        <section
            id="projects-container"
            class="projects-container"
        ></section>

        <section
            id="project-list"
            class="project-list"
            aria-label="Alla projekt"
        ></section>
    `;
    const addProjectIcon = page.querySelector(
    ".new-project-button__icon"
);

addProjectIcon?.appendChild(
    createElement(Plus, {
        width: 16,
        height: 16
    })
);
    
    return page;  
}

