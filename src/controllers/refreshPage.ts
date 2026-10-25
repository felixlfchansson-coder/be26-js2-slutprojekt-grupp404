
type RefreshFunction = () => void | Promise<void>;

let activePageRefresh: RefreshFunction | null = null;

export function registerPageRefresh(
    refreshFunction: RefreshFunction
): void {
    activePageRefresh = refreshFunction;
}

export async function refreshPage(): Promise<void> {
    if (activePageRefresh) {
        await activePageRefresh();
    }
}
