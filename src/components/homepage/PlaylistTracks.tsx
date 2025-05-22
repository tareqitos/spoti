import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SpotifyTrack, SpotifyTrackItem } from "../../types";
import { sortAsc, sortDesc } from "../helpers/helpers";
import { useGetPlaylistTracksQuery } from "../../api/apiSlice";
import { Tracks } from "./Tracks";

interface TracksProps {
    tracks: SpotifyTrack,
    showTrackBar: (track: SpotifyTrackItem) => void
}

interface SortState {
    activeColumn: string | null,
    isAscending: boolean,
}

export const PlaylistTracks = ({ tracks, showTrackBar }: TracksProps) => {
    const [items, setItems] = useState(tracks.items);
    const [sortState, setSortState] = useState<SortState>({ activeColumn: null, isAscending: false });
    const [pages, setPages] = useState({ previous: tracks.previous || null, next: tracks.next || null })
    const [pageNumber, setPageNumber] = useState(1)
    const { data: previousTracks } = useGetPlaylistTracksQuery(
        pages.previous || tracks.previous || "",
        { skip: !(pages.previous || tracks.previous) }
    );

    const { data: nextTracks } = useGetPlaylistTracksQuery(
        pages.next || tracks.next || "",
        { skip: !(pages.next || tracks.next) }
    );


    const handleSorting = (type: string) => {
        let sortedItems: SpotifyTrackItem[];
        const isCurrentColumn = sortState.activeColumn === type;
        const isAscending = isCurrentColumn ? !sortState.isAscending : true;

        if (isAscending) {
            sortedItems = sortAsc(items.map(item => item.track), type);
        } else {
            sortedItems = sortDesc(items.map(item => item.track), type);
        }

        setSortState({
            activeColumn: type,
            isAscending: isAscending
        });

        setItems(items.map((item, index) => ({
            ...item,
            track: sortedItems[index]
        })));
    };

    const loadNext = () => {
        if (nextTracks && pages.next) {
            setItems(nextTracks.items);
            setPages({
                previous: nextTracks.previous,
                next: nextTracks.next
            })
            setPageNumber(pageNumber + 1)
        }
    }

    const loadPrevious = () => {
        if (previousTracks && pages.previous) {
            setItems(previousTracks.items);
            setPages({
                previous: previousTracks.previous,
                next: previousTracks.next
            })
            setPageNumber(pageNumber - 1)
        }
    }

    const SortButton = ({ type }: { type: string }) => {
        const isActive = sortState.activeColumn === type;
        const isAscending = isActive && sortState.isAscending;
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
            <h1 className="number-titles">{tracks.total} titles</h1>

            <div className="tracks-container tracks-header">
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
                        <Tracks key={item.track.id} item={item.track} showTrackBar={showTrackBar} />
                    ))
                    :
                    <p>Nothing here</p>
            }
            <div className="pages-button-container">
                {pages.previous &&
                    <>
                        <button className="previous" onClick={loadPrevious}>Previous page</button>
                        <h1>{pageNumber}</h1>
                    </>
                }

                {pages.next &&
                    <button className="next" onClick={loadNext}>Next page</button>
                }
            </div>
        </div>
    )
}