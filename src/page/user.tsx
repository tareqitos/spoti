import { User } from "../types";

interface UserProps {
    user: User;
}

export const UserProfile = ({ user }: UserProps) => {
    const name = user.display_name;
    const image = user.images[0].url
    const country = user.country;
    const email = user.email;
    const followers = user.followers.total;
    const url = user.external_urls.spotify


    return (
        <>
            <div className="avatar large">
                <img
                    src={image}
                    alt="user-picture"
                    width={300}
                    className="user-picture large"
                />
            </div>
            <div>
                <h1>{name}</h1>
                <p>{country}</p>
                <p>{email}</p>
                <p>{'Followers: ' + followers}</p>
                <a href={url}>Spotify profile</a>
            </div>

        </>
    )
}