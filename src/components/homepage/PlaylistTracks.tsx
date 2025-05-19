import { SpotifyTrack, SpotifyTrackItem } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import { convertDateToLong, convertDuration } from "../helpers/helpers";


interface TracksProps {
    tracks: SpotifyTrack,
    showTrack: (track: SpotifyTrackItem) => void
}

export const PlaylistTracks = ({ tracks, showTrack }: TracksProps) => {
    const items = tracks.items

    return (
        <div className="tracks-wrapper">
            <div className="tracks-container header">
                <span>Title</span>
                <span>Album</span>
                <span>Release date</span>
                <span>Duration</span>
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