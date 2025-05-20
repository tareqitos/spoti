import { useEffect, useRef, useState } from "react";
import { useGetPlaylistTracksQuery } from "../api/apiSlice";
import { SpotifyPlaylist, SpotifyTrack, SpotifyTrackItem } from "../types";
import { PlaylistTracks } from "../components/homepage/PlaylistTracks";
import { Sidebar } from "../components/homepage/Sidebar";
import { ListSkeleton, PlaylistSkeleton } from "../components/ui/Skeleton";

import 'react-loading-skeleton/dist/skeleton.css'
import { TrackBar } from "../components/homepage/TrackBar";
import { ListMusic } from "lucide-react";
import { PlaylistDropdown } from "../components/homepage/PlaylistDropdown";



interface Props {
    playlists: SpotifyPlaylist,
    selectedTrack: SpotifyTrackItem | null
    setSelectedTrack: (track: SpotifyTrackItem | null) => void
    trackbarVisible: boolean,
    setTrackbarVisible: (visible: boolean) => void
}



export const Home = ({ playlists, selectedTrack, setSelectedTrack, trackbarVisible, setTrackbarVisible }: Props) => {
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

    const hideTrackPanel = () => {
        if (trackbarVisible) {
            setSelectedTrack(null)
            setTrackbarVisible(false);
        }
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
            <section className={`sidebar ${trackbarVisible ? "hidden" : ""}`}>


                {!trackbarVisible ?
                    <Sidebar
                        playlistItems={playlists}
                        selectedPlaylistName={selectedPlaylistName}
                        queryPlaylistTracks={queryPlaylistTracks}
                    /> :
                    <ListMusic onClick={hideTrackPanel} className="icons" size={40} />
                }

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

            <section className={`trackbar ${trackbarVisible ? "show" : ""}`}>
                {selectedTrack && <TrackBar track={selectedTrack} hideTrack={hideTrackPanel} />}
            </section>
        </div>
    )
}