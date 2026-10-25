
export function dateToNumber(date: string): number {
    const [year, month, day] = date.split("-");

    return Number(`${day}${month}${year.slice(-2)}`);
}

export function getTodaysDate(): number {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return Number(`${day}${month}${year}`);
}

export function parseDeadline(deadline?: number | string): Date | null {
    if (!deadline) return null;

    const value = String(deadline).padStart(6, "0");

    let day: number;
    let month: number;
    let year: number;

    if (value.length === 6) {
        day = Number(value.slice(0, 2));
        month = Number(value.slice(2, 4));
        year = 2000 + Number(value.slice(4, 6));
    } else if (value.length === 8) {
        day = Number(value.slice(0, 2));
        month = Number(value.slice(2, 4));
        year = Number(value.slice(4, 8));
    } else {
        return null;
    }

    const date = new Date(year, month - 1, day);

    if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
    ) {
        return null;
    }

    return date;
}

export function formatDate(date: Date | null): string {
    if (!date) return "Inget datum";

    return date.toLocaleDateString("sv-SE");
}
