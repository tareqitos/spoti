import { useEffect, useState } from "react"
import { SpotifyTrackItem } from "../../types"
import { convertDateToLong } from "../helpers/helpers"
import { X } from "lucide-react"
import { TrackBarSkeleton } from "../ui/Skeleton"

interface Props {
    track: SpotifyTrackItem | null,
    hideTrackBar: () => void
}

export const TrackBar = ({ track, hideTrackBar }: Props) => {

    const [loading, setLoading] = useState(true)
    const loadTimeout = () => setTimeout(() => setLoading(false), 700);

    useEffect(() => {
        loadTimeout();
    }, [track])

    return (


        <div className="track-container">
            <button onClick={hideTrackBar} className="close">
                <X className="icons" />
            </button>
            {loading ?
                <TrackBarSkeleton />
                :
                <>

                    <div className="track image">
                        <img
                            src={
                                track?.album?.images[0]?.url ||
                                track?.album?.images[1]?.url ||
                                track?.album?.images[2]?.url ||
                                "./vinyl.png"}
                            alt={track?.name}
                            className="bg"
                        />

                        <img
                            src={
                                track?.album?.images[0]?.url ||
                                track?.album?.images[1]?.url ||
                                track?.album?.images[2]?.url ||
                                "./vinyl.png"}
                            alt={track?.name}
                            className="image"
                        />
                    </div>

                    <div className="track infos">
                        <h2 className="name">{track?.name}</h2>
                        <div className="artists">
                            {track?.artists.map(artist => (
                                <p key={artist.id} className="artist">{artist.name}</p>
                            ))}
                        </div>
                        <div className="card-container first">
                            <h2>Album</h2>
                            <p className="name">{track?.album.name}</p>
                        </div>
                        <div className="card-container">
                            <h2>Release date</h2>
                            <p className="name">{convertDateToLong(track?.album.release_date || "")}</p>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}