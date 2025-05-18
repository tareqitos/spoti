import { SpotifyTrack } from "../../types";
import { v4 as uuidv4 } from 'uuid';


interface TracksProps {
    tracks: SpotifyTrack;
}

export const PlaylistTracks = ({ tracks }: TracksProps) => {
    const items = tracks.items

    const convertDuration = (durationMs: number) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const convertDateToLong = (date: string) => {
        return new Date(date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })
    }

    return (
        <div className="tracks-wrapper">
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
                                    <a>{item.track.name}</a>
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