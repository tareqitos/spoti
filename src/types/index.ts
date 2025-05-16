export type User = {
    country: string,
    display_name: string,
    email: string,
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: number,
    },
    href: string,
    id: string,
    images: {
        url: string,
        height: number,
        width: number,
    }[],
    products: string,
    type: string,
    uri: string
};

export type SpotifyPlaylist = {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: {
        collaborative: boolean,
        description: string,
        external_urls: {
            spotify: string,
        },
        href: string,
        id: string,
        images: {
            url: string;
            height: number;
            width: number;
        }[],
        name: string,
        owner: {
            external_urls: {
                spotify: string;
            },
            href: string,
            id: string,
            type: string,
            uri: string,
            display_name: string,
        },
        public: boolean,
        snapshot_id: string,
        tracks: {
            href: string,
            total: number,
        },
        type: string,
        uri: string,
    }[]
};

export type SpotifyTrack = {

    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: {
        added_at: string,
        added_by: {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            type: "user",
            uri: string
        },
        is_local: boolean,
        track: {
            album: {
                album_type: "compilation" | "album" | "single",
                total_tracks: number,
                available_markets: string[],
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                images: {
                    url: string,
                    height: number,
                    width: number
                }[],
                name: string,
                release_date: string,
                release_date_precision: "year" | "month" | "day",
                restrictions?: {
                    reason: "market"
                },
                type: "album",
                uri: string,
                artists: {
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    name: string,
                    type: "artist",
                    uri: string
                }[]
            },
            artists: {
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                name: string,
                type: "artist",
                uri: string
            }[],
            available_markets: string[],
            disc_number: number,
            duration_ms: number,
            explicit: boolean,
            external_ids: {
                isrc: string,
                ean: string,
                upc: string
            },
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            is_playable: boolean,
            linked_from: {},
            restrictions?: {
                reason: string
            },
            name: string,
            popularity: number,
            preview_url: string,
            track_number: number,
            type: "track",
            uri: string,
            is_local: boolean
        }
    }[]
}

export type SpotifyTrackItem = {
    added_at: string,
    track: SpotifyTrack
};
