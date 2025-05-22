import { useEffect, useState } from "react";
import { useGetPlaylistTracksQuery } from "../api/apiSlice";
import { SpotifyPlaylist, SpotifyTrackItem } from "../types";
import { PlaylistTracks } from "../components/homepage/PlaylistTracks";
import { Sidebar } from "../components/homepage/Sidebar";
import { PlaylistSkeleton } from "../components/ui/Skeleton";
import { PlaylistDropdown } from "../components/homepage/PlaylistDropdown";

import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
    playlists: SpotifyPlaylist,
    showTrackBar: (track: SpotifyTrackItem | null) => void
}

export const Home = ({ playlists, showTrackBar }: Props) => {
    const [selectedPlaylistTracksLink, setSelectedPlaylistTracksLink] = useState<string>("");
    const [selectedPlaylistName, setSelectedPlaylistName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const { data: playlist_tracks } = useGetPlaylistTracksQuery(selectedPlaylistTracksLink || "");
    const playlistItems = playlists.items;

    const loadTimeout = () => setTimeout(() => setIsLoading(false), 700);

    const queryPlaylistTracks = (href: string, name: string) => {
        setIsLoading(true);
        if (href) {
            setSelectedPlaylistTracksLink(href);
            setSelectedPlaylistName(name);
            loadTimeout();
        }
    };

    useEffect(() => {
        if (playlistItems.length > 0) {
            setSelectedPlaylistTracksLink(playlistItems[0].tracks.href);
            setSelectedPlaylistName(playlistItems[0].name);
            loadTimeout();
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
                            showTrack={showTrackBar}
                        />
                }
            </section>
        </div>
    )
}