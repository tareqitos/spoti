import { Home, Moon, Search, Sun } from 'lucide-react';
import '../styles/components.scss'
import { SpotifyTrackItem, User } from '../types'
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useGetSearchTrackResultQuery } from '../api/apiSlice';

interface HeaderProps {
    user: User;
    theme: string;
    toggle: () => void
    searchResults: SpotifyTrackItem[] | null
    setSearchResults: Dispatch<SetStateAction<SpotifyTrackItem[] | null>>
    setTrack: (track: SpotifyTrackItem | null) => void

}

export const Header = ({ user, theme, toggle, searchResults, setSearchResults, setTrack }: HeaderProps) => {
    const [resultsVisible, setResultsVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { data: tracks } = useGetSearchTrackResultQuery(inputRef.current?.value || "")


    const fetchSearchResults = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (inputRef.current) {
            const value = inputRef.current?.value

            if (value?.length !== 0) {
                setResultsVisible(true)
                setSearchResults(tracks || [])
            } else {
                setSearchResults([]);
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setResultsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectTrackResult = (result: SpotifyTrackItem | null) => {
        setTrack(result)
        setResultsVisible(false)
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <header>
            <Link to="/user" className='avatar'>
                <img
                    src={user.images[1].url}
                    alt='user-picture'
                    width={50}
                    className='user-picture small' />
            </Link>

            <div className="search-wrapper">
                <div className='input-wrapper'>
                    <Search className="search-icon" color="grey" size={24} />
                    <input
                        ref={inputRef}
                        onChange={(e) => fetchSearchResults(e)}
                        className="search"
                        placeholder='What do you want to listen to today?' />
                </div>
                {resultsVisible && searchResults && searchResults.length > 0 &&
                    <div className='search-results-container'>
                        {
                            searchResults.map(result => (
                                <div
                                    className={'result'}
                                    onClick={() => selectTrackResult(result)}
                                    key={result.id}
                                >
                                    <img
                                        src={
                                            result.album?.images[2]?.url ||
                                            result.album?.images[1]?.url ||
                                            result.album?.images[0]?.url ||
                                            "./vinyl.png"}
                                        alt={result.name}
                                        width={40}
                                        className="track-image"
                                    />
                                    <div>
                                        <p>{result.artists[0].name}</p>
                                        <p>{result.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <Link to="/">
                <button>
                    <Home className="icons" size={24} />
                </button>
            </Link>
            <button onClick={toggle}>
                {theme === "dark" ?
                    <Sun className="icons" size={24} /> :
                    <Moon className="icons" size={24} />
                }
            </button>
        </header>
    )
}