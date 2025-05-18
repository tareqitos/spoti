import { useEffect, useRef, useState } from "react";
import { useGetPlaylistTracksQuery } from "../api/apiSlice";
import { SpotifyPlaylist, SpotifyTrack, SpotifyTrackItem } from "../types";
import { PlaylistTracks } from "../components/homepage/PlaylistTracks";
import { v4 as uuidv4 } from 'uuid';


interface Props {
    playlists: SpotifyPlaylist;
}


export const Home = ({ playlists }: Props) => {
    const [selectedPlaylistTracksLink, setSelectedPlaylistTracksLink] = useState<string>("")
    const [selectedPlaylistName, setSelectedPlaylistName] = useState<string>("");

    let { data: playlist_tracks } = useGetPlaylistTracksQuery(selectedPlaylistTracksLink)
    const playlistItems = playlists.items

    const queryPlaylistTracks = (href: string, name: string) => {
        setSelectedPlaylistTracksLink(href)
        setSelectedPlaylistName(name)
    }

    useEffect(() => {
        console.log("TRACKS: ", playlist_tracks)
    }, [playlist_tracks])

    useEffect(() => {
        if (playlistItems.length > 0) {
            setSelectedPlaylistTracksLink(playlistItems[0].tracks.href);
            setSelectedPlaylistName(playlistItems[0].name);
        }
    }, [playlistItems]);


    return (
        <div className="homepage">
            <section className="sidebar">
                {
                    playlistItems.map(playlist => (
                        <div key={uuidv4()} >
                            <a
                                onClick={() => queryPlaylistTracks(playlist.tracks.href, playlist.name)}
                                className={selectedPlaylistName === playlist.name ? "selected" : ""}
                            >
                                {playlist.name}
                            </a>
                        </div>
                    ))
                }
            </section>
            <section className="main">
                {playlist_tracks && <PlaylistTracks tracks={playlist_tracks} />}
            </section>
        </div>
    )
}