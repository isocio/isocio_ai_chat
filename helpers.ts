
// Helper to find last index, as it's not in all JS environments
export function findLastIndex<T>(arr: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (predicate(arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}
