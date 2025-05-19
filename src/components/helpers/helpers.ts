import { data } from "react-router-dom";
import { SpotifyTrackItem } from "../../types";

export const convertDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const convertDateToLong = (date: string) => {
    return new Date(date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })
}

export const sortAsc = (items: SpotifyTrackItem[], type: string): SpotifyTrackItem[] => {
    return items.sort((a, b) => {
        switch (type) {
            case "title":
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            case "artist":
                return a.artists[0].name.toLowerCase().localeCompare(b.artists[0].name.toLowerCase());
            case "album":
                return a.album.name.toLowerCase().localeCompare(b.album.name.toLowerCase());
            case "duration":
                return a.duration_ms - b.duration_ms;
            case "release_date":
                return new Date(a.album.release_date).getTime() - new Date(b.album.release_date).getTime();
            default:
                return 0;
        }
    });
};

export const sortDesc = (items: SpotifyTrackItem[], type: string): SpotifyTrackItem[] => {
    return items.sort((a, b) => {
        switch (type) {
            case "title":
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            case "artist":
                return b.artists[0].name.toLowerCase().localeCompare(a.artists[0].name.toLowerCase());
            case "album":
                return b.album.name.toLowerCase().localeCompare(a.album.name.toLowerCase());
            case "duration":
                return b.duration_ms - a.duration_ms;
            case "release_date":
                return new Date(b.album.release_date).getTime() - new Date(a.album.release_date).getTime();
            default:
                return 0;
        }
    });
};