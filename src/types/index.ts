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
    album: {
        album_type: string,
        artists: {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
        }[],
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
        release_date_precision: string,
        total_tracks: number,
        type: string,
        uri: string
    },
    artists: {
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    }[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string
    },
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string | null,
    track_number: number,
    type: string,
    uri: string
};

export type SpotifyTrackItem = {
    added_at: string,
    track: SpotifyTrack
};
