import { v4 as uuidv4 } from 'uuid';
import { convertDateToLong, convertDuration } from '../helpers/helpers';
import { SpotifyTrackItem } from '../../types';

interface Props {
    item: SpotifyTrackItem,
    showTrackBar: (track: SpotifyTrackItem) => void
}

export const Tracks = ({ item, showTrackBar }: Props) => {
    return (
        <div key={uuidv4()} className="tracks-container">

            <div className="track-infos">
                <img
                    src={
                        item.album?.images[2]?.url ||
                        item.album?.images[1]?.url ||
                        item.album?.images[0]?.url ||
                        ""}
                    alt={item.name}
                    className="track-image-bg"
                />

                <div className="track-image-container">
                    <img
                        src={
                            item.album?.images[2]?.url ||
                            item.album?.images[1]?.url ||
                            item.album?.images[0]?.url ||
                            "./vinyl.png"}
                        alt={item.name}
                        className="track-image"
                    />


                </div>
                <div className="track-details">
                    <a onClick={() => showTrackBar(item)}>{item.name}</a>
                    {item.album.artists.map(artist => (
                        <p key={uuidv4()}>{artist.name}</p>
                    ))}
                </div>
            </div>

            <div className="track-album">
                <p>{item.album.name}</p>
            </div>

            <div className="track-release-date">
                <p>{convertDateToLong(item.album.release_date)}</p>
            </div>

            <div className="track-duration">
                <p>{convertDuration(item.duration_ms)}</p>
            </div>
        </div>
    )
}