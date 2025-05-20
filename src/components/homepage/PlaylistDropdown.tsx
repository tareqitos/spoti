import { SpotifyPlaylist } from "../../types";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    playlistItems: SpotifyPlaylist;
    selectedPlaylistName: string;
    queryPlaylistTracks: (href: string, name: string) => void
}

export const PlaylistDropdown = ({ playlistItems, selectedPlaylistName, queryPlaylistTracks }: Props) => {
    return (
        <select
            value={selectedPlaylistName || "Select a playlist"}
            onChange={(e) => {
                const selectedPlaylist = playlistItems.items.find(playlist => playlist.name === e.target.value);
                if (selectedPlaylist) {
                    queryPlaylistTracks(selectedPlaylist.tracks.href, selectedPlaylist.name)
                }
            }}>
            <option disabled value="Select a playlist">Select a playlist</option>
            {playlistItems.items.map((playlist: typeof playlistItems.items[number]) => (
                <option
                    key={uuidv4()}
                    value={playlist.name}
                >
                    {playlist.name}
                </option>
            ))}
        </select>
    )
}