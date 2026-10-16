export function setupDescriptionToggle(
    container: HTMLElement,
    selector: string
): void {
    const description = container.querySelector<HTMLElement>(selector);
    if (!description) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "description__toggle";
    button.textContent = "Visa mer";
    button.setAttribute("aria-expanded", "false");

    description.insertAdjacentElement("afterend", button);

    button.addEventListener("click", () => {
        const expanded = description.classList.toggle("is-expanded");

        button.textContent = expanded ? "Dölj" : "Visa mer";
        button.setAttribute("aria-expanded", String(expanded));
    });

    // Visa bara knappen om texten faktiskt är för lång.
    requestAnimationFrame(() => {
        if (description.scrollHeight <= description.clientHeight + 1) {
            button.remove();
        }
    });
}