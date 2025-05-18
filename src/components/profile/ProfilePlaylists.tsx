import { useState } from "react";
import { SpotifyPlaylist } from "../../types"
import { ListMusic, SquareLibrary } from "lucide-react";

interface PlaylistsProps {
    playlists: SpotifyPlaylist;
}

export const UserPlaylists = ({ playlists }: PlaylistsProps) => {

    const playlistsItem = playlists.items
    const totalPlaylists = playlists.items
    const publicPlaylist = playlists.items.filter(item => item.owner.display_name === "tareqitos")

    const [playlistToShow, setPlaylistToShow] = useState(publicPlaylist);
    const [isTotalPlaylist, setIsTotalPlaylist] = useState(false)
    console.log(playlistsItem)

    const handlePlaylistsToShow = () => {
        if (isTotalPlaylist) {
            setPlaylistToShow(publicPlaylist)
            setIsTotalPlaylist(false);
        } else {
            setPlaylistToShow(totalPlaylists)
            setIsTotalPlaylist(true)
        }
    }

    return (
        <div>
            <div className="playlist-toggle-container">
                <button className={`playlist-toggle-button ${isTotalPlaylist && "active-toggle"}`} onClick={handlePlaylistsToShow}>
                    <SquareLibrary size={24} />
                    {totalPlaylists.length + " total playlists"}
                </button>
                <button className={`playlist-toggle-button ${!isTotalPlaylist && "active-toggle"}`} onClick={handlePlaylistsToShow}>
                    <ListMusic size={24} />
                    {publicPlaylist.length + " public playlists"}
                </button>
            </div>

            <div className="playlist-list-container">
                {
                    playlistToShow.map((playlist) => (
                        <div key={playlist.id} className="playlist-item" >
                            <div className="playlist-image-wrapper">
                                <a href={playlist.external_urls.spotify} target="_blank">
                                    <img
                                        src={playlist.images && playlist.images[0].url}
                                        alt="playlist image"
                                        title={playlist.name}
                                        width={200}
                                        className="playlist-image"
                                    />
                                </a>
                            </div>
                            <p className="playlist-name">{playlist.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}