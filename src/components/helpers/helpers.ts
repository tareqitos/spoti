export const convertDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const convertDateToLong = (date: string) => {
    return new Date(date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })
}