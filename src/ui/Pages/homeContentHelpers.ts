
export function createTextElement(
    tag: string,
    className: string,
    text: string
): HTMLElement {
    const element = document.createElement(tag);

    element.className = className;
    element.textContent = text;

    return element;
}

export function createHomeCard(
    title: string,
    description: string
): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "home__item";

    card.append(
        createTextElement("strong", "home__item-title", title),
        createTextElement("span", "home__item-meta", description)
    );

    return card;
}

export function renderEmptyMessage(
    container: HTMLElement,
    message: string
): void {
    container.appendChild(
        createTextElement("p", "home__empty", message)
    );
}

export function parseHomeDeadline(
    value: number | string | undefined,
    type: "project" | "task"
): Date | null {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    const raw = String(value).trim();

    let year: number;
    let month: number;
    let day: number;

    if (type === "project") {
        if (!/^\d{8}$/.test(raw)) return null;

        year = Number(raw.slice(0, 4));
        month = Number(raw.slice(4, 6));
        day = Number(raw.slice(6, 8));
    } else {
        const formatted = raw.padStart(6, "0");

        if (!/^\d{6}$/.test(formatted)) return null;

        day = Number(formatted.slice(0, 2));
        month = Number(formatted.slice(2, 4));
        year = 2000 + Number(formatted.slice(4, 6));
    }

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}
