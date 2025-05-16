import { useEffect, useRef, useState } from "react";
import { useGetPlaylistTracksQuery } from "../api/apiSlice";
import { SpotifyPlaylist, SpotifyTrack, SpotifyTrackItem } from "../types";
import { PlaylistTracks } from "../components/homepage/playlistTracks";
import { v4 as uuidv4 } from 'uuid';


interface Props {
    playlists: SpotifyPlaylist;
}


export const Home = ({ playlists }: Props) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>("")
    // const [playlistTracks, setPlaylistTracks] = useState<SpotifyTrack>()

    let { data: playlist_tracks } = useGetPlaylistTracksQuery(selectedPlaylist)
    const playlistItems = playlists.items
    // console.log(playlists)

    const queryPlaylistTracks = (playlistRef: string) => {
        setSelectedPlaylist(playlistRef)
        // setPlaylistTracks(playlist_tracks)
    }

    useEffect(() => {
        console.log("TRACKS: ", playlist_tracks)
    }, [playlist_tracks])



    return (
        <div className="homepage">
            <section className="sidebar">
                {
                    playlistItems.map(playlist => (
                        <div key={uuidv4()} className="sidebar-item">
                            <a onClick={() => queryPlaylistTracks(playlist.tracks.href)}>{playlist.name}</a>
                        </div>
                    ))
                }
            </section>
            <section className="main">
                {playlist_tracks && <PlaylistTracks tracks={playlist_tracks} />}            </section>
        </div>
    )
}