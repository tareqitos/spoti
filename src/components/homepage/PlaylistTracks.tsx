import { SpotifyTrack, SpotifyTrackItem } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import { convertDateToLong, convertDuration, sortAsc, sortDesc } from "../helpers/helpers";
import { ArrowDown, ArrowUp, Funnel } from "lucide-react";
import { useState } from "react";


interface TracksProps {
    tracks: SpotifyTrack,
    showTrack: (track: SpotifyTrackItem) => void
}

interface SortState {
    activeColumn: string | null,
    isAscending: boolean,
}

export const PlaylistTracks = ({ tracks, showTrack }: TracksProps) => {
    const [items, setItems] = useState(tracks.items)
    const [sortState, setSortState] = useState<SortState>({ activeColumn: null, isAscending: false });

    const handleSorting = (type: string) => {
        let sortedItems: SpotifyTrackItem[];
        const isCurrentColumn = sortState.activeColumn === type;
        const isAscending = isCurrentColumn ? !sortState.isAscending : true;

        if (isAscending) {
            sortedItems = sortAsc(items.map(item => item.track), type)
        } else {
            sortedItems = sortDesc(items.map(item => item.track), type)
        }

        setSortState({
            activeColumn: type,
            isAscending: isAscending
        })

        setItems(items.map((item, index) => ({
            ...item,
            track: sortedItems[index]
        })));

    }

    const SortButton = ({ type }: { type: string }) => {
        const isActive = sortState.activeColumn === type
        const isAscending = isActive && sortState.isAscending
        const buttonSize = 16;

        return (
            <button onClick={() => handleSorting(type)}>
                {isActive ? (
                    isAscending ? <ArrowDown className="icons" size={buttonSize} /> : <ArrowUp className="icons" size={buttonSize} />
                ) : (<ArrowUp className="icons" size={buttonSize} />)
                }
            </button>
        );
    };


    return (
        <div className="tracks-wrapper">

            <div className="tracks-container header">
                <div className="sort-container">
                    <span>Title</span>
                    <SortButton type="title" />
                </div>
                <div className="sort-container album">
                    <span>Album</span>
                    <SortButton type="album" />
                </div>
                <div className="sort-container release">
                    <span>Release date</span>
                    <SortButton type="release_date" />
                </div>
                <div className="sort-container duration">
                    <span>Duration</span>
                    <SortButton type="duration" />
                </div>
            </div>
            {
                items.length !== undefined ?
                    items.map(item => (
                        <div key={uuidv4()} className="tracks-container">

                            <div className="track-infos">
                                <img
                                    src={
                                        item.track.album?.images[2]?.url ||
                                        item.track.album?.images[1]?.url ||
                                        item.track.album?.images[0]?.url ||
                                        ""}
                                    alt={item.track.name}
                                    className="track-image-bg"
                                />

                                <div className="track-image-container">
                                    <img
                                        src={
                                            item.track.album?.images[2]?.url ||
                                            item.track.album?.images[1]?.url ||
                                            item.track.album?.images[0]?.url ||
                                            "./vinyl.png"}
                                        alt={item.track.name}
                                        className="track-image"
                                    />


                                </div>
                                <div className="track-details">
                                    <a onClick={() => showTrack(item.track)}>{item.track.name}</a>
                                    {item.track.album.artists.map(artist => (
                                        <p key={uuidv4()}>{artist.name}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="track-album">
                                <p>{item.track.album.name}</p>
                            </div>

                            <div className="track-release-date">
                                <p>{convertDateToLong(item.track.album.release_date)}</p>
                            </div>

                            <div className="track-duration">
                                <p>{convertDuration(item.track.duration_ms)}</p>
                            </div>
                        </div>
                    ))
                    :
                    <p>Nothing here</p>
            }
        </div>
    )
}