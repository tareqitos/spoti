import { useState } from "react";
import { SpotifyPlaylist } from "../../types"

interface PlaylistsProps {
    playlists: SpotifyPlaylist;
}

export const UserPlaylists = ({ playlists }: PlaylistsProps) => {

    const playlistsItem = playlists.items
    const totalPlaylists = playlists.items
    const publicPlaylist = playlists.items.filter(item => item.owner.display_name === "tareqitos")

    const [playlistToShow, setPlaylistToShow] = useState(publicPlaylist);
    console.log(playlistsItem)

    return (
        <div>

            <div className="user-playlist-container">
                <button className="user-playlist-title" onClick={() => setPlaylistToShow(totalPlaylists)}>{totalPlaylists.length + " total playlists"}</button>
                <button className="user-playlist-title" onClick={() => setPlaylistToShow(publicPlaylist)}>{publicPlaylist.length + " public playlists"}</button>
            </div>

            <div className="playlists-wrapper">
                {
                    playlistToShow.map((playlist) => (
                        <div key={playlist.id} className="playlist-container" >
                            <div className="playlist-image-container">
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
                            <p className="playlist-title">{playlist.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}