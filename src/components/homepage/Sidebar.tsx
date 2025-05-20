import { SpotifyPlaylist, SpotifyTrack, SpotifyTrackItem } from "../../types";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    playlistItems: SpotifyPlaylist;
    selectedPlaylistName: string;
    queryPlaylistTracks: (href: string, name: string) => void
}

export const Sidebar = ({ playlistItems, selectedPlaylistName, queryPlaylistTracks }: Props) => {
    return (
        <div>
            {playlistItems.items.map((playlist: typeof playlistItems.items[number]) => (
                <div key={uuidv4()}>
                    <a
                        onClick={() => queryPlaylistTracks(playlist.tracks.href, playlist.name)}
                        className={selectedPlaylistName === playlist.name ? "selected" : ""}
                    >
                        {playlist.name}
                    </a>
                </div>
            ))}
        </div>
    )
}