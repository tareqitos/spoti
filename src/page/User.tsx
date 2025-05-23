import { AtSign, CircleUserRound } from "lucide-react";
import { SpotifyPlaylist, User } from "../types";
import { UserPlaylists } from "../components/profile/ProfilePlaylists";
import { useSelector } from "react-redux";
import { selectTheme } from "../state/themeSlice";

interface UserProps {
    user: User;
    playlists: SpotifyPlaylist;
}

export const UserProfile = ({ user, playlists }: UserProps) => {
    const theme = useSelector(selectTheme);

    const name = user.display_name;
    const image = user.images[0].url;
    const country = user.country;
    const email = user.email;
    const followers = user.followers.total;
    const url = user.external_urls.spotify;

    const getCountryImage = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`;

    const Background = () => {
        return theme === "dark" ? (
            <div className="bg">
                <img src={image} alt="user-picture" width="100%" />
            </div>
        ) : (
            <div className="bg"></div>
        );
    };

    return (
        <div id="content">
            <section className="profile-container">
                <Background />
                <div className="avatar large">
                    <img
                        src={image}
                        alt="user-picture"
                        title="tareqitos"
                        width={300}

                        className="user-picture large"
                    />
                </div>
                <div className="details">
                    <p>Profile</p>
                    <div className="name-container">
                        <h1 className="name">{name}</h1>
                        <img src={getCountryImage} alt="BE" title="BE" width={30} />
                    </div>
                    <p>{followers + " followers"}</p>
                    <div className="link-container">
                        <a href={`mailto:${email}`} title={email} className="link">
                            <AtSign size={28} />
                        </a>
                        <a href={url} title={url} className="link">
                            <CircleUserRound size={28} />
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <UserPlaylists playlists={playlists} />
            </section>
        </div>
    )
}