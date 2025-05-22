import { Home, Moon, Search, Sun } from 'lucide-react';
import '../styles/components.scss'
import { SpotifyTrackItem, User } from '../types'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useGetSearchTrackResultQuery } from '../api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setTrackResults, trackResults } from '../state/trackSlice';
import { setTheme, selectTheme } from '../state/themeSlice';

interface HeaderProps {
    user: User;
    showTrackBar: (track: SpotifyTrackItem | null) => void
    hideTrackBar: () => void
}

export const Header = ({ user, showTrackBar, hideTrackBar }: HeaderProps) => {
    const [resultsVisible, setResultsVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const searchResults = useSelector(trackResults)
    const theme = useSelector(selectTheme);

    const { data: tracks } = useGetSearchTrackResultQuery(inputRef.current?.value || ".")

    const fetchSearchResults = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (inputRef.current) {
            const value = inputRef.current?.value

            if (value?.length !== 0) {
                setResultsVisible(true)
                dispatch(setTrackResults(tracks || []))
            } else {
                dispatch(setTrackResults([]));
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        }
    }

    const toggleTheme = () => {
        dispatch(setTheme())
    }

    const selectTrackResult = (result: SpotifyTrackItem | null) => {
        showTrackBar(result)
        setResultsVisible(false)
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest('.search-results-container')
        ) {
            setResultsVisible(false);
        }
    };

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <Link to="user" onClick={hideTrackBar} className='avatar'>
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
            <button onClick={() => {
                hideTrackBar()
                navigate('/')
            }}>
                <Home className="icons" size={24} />
            </button>
            <button onClick={toggleTheme}>
                {theme === "dark" ?
                    <Sun className="icons" size={24} /> :
                    <Moon className="icons" size={24} />
                }
            </button>
        </header>
    )
}