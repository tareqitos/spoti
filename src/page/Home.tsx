import { useEffect, useState } from "react";
import { useGetPlaylistTracksQuery } from "../api/apiSlice";
import { SpotifyPlaylist, SpotifyTrackItem } from "../types";
import { PlaylistTracks } from "../components/homepage/PlaylistTracks";
import { Sidebar } from "../components/homepage/Sidebar";
import { PlaylistSkeleton } from "../components/ui/Skeleton";

import 'react-loading-skeleton/dist/skeleton.css'
import { PlaylistDropdown } from "../components/homepage/PlaylistDropdown";



interface Props {
    playlists: SpotifyPlaylist,
    setSelectedTrack: (track: SpotifyTrackItem | null) => void
    setTrackbarVisible: (visible: boolean) => void
}



export const Home = ({ playlists, setSelectedTrack, setTrackbarVisible }: Props) => {
    const [selectedPlaylistTracksLink, setSelectedPlaylistTracksLink] = useState<string>("")
    const [selectedPlaylistName, setSelectedPlaylistName] = useState<string>("");

    const [isLoading, setIsLoading] = useState(true)

    let { data: playlist_tracks } = useGetPlaylistTracksQuery(selectedPlaylistTracksLink)
    const playlistItems = playlists.items
    const loadTimeout = () => setTimeout(() => setIsLoading(false), 700)


    const queryPlaylistTracks = (href: string, name: string) => {
        setIsLoading(true)
        if (href) {
            setSelectedPlaylistTracksLink(href)
            setSelectedPlaylistName(name)
            loadTimeout()
        }
    }

    const showTrackPanel = (track: SpotifyTrackItem) => {
        setTrackbarVisible(true);
        setSelectedTrack(track);
    }


    useEffect(() => {
        if (playlistItems.length > 0) {
            setSelectedPlaylistTracksLink(playlistItems[0].tracks.href);
            setSelectedPlaylistName(playlistItems[0].name);
            loadTimeout()
        }
    }, [playlistItems]);

    return (
        <div className="homepage">
            <section className="sidebar">
                <Sidebar
                    playlistItems={playlists}
                    selectedPlaylistName={selectedPlaylistName}
                    queryPlaylistTracks={queryPlaylistTracks}
                />
            </section>

            <section className="main">
                <PlaylistDropdown
                    playlistItems={playlists}
                    selectedPlaylistName={selectedPlaylistName}
                    queryPlaylistTracks={queryPlaylistTracks}
                />
                {
                    isLoading ?
                        <PlaylistSkeleton /> :

                        playlist_tracks &&
                        <PlaylistTracks
                            tracks={playlist_tracks}
                            showTrack={showTrackPanel}
                        />

                }
            </section>
        </div>
    )
}