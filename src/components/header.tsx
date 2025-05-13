import { Moon, Search, Sun } from 'lucide-react';
import '../styles/components.scss'
import { User } from '../types'
import { Link } from 'react-router-dom';

interface HeaderProps {
    user: User;
    theme: string;
    toggle: () => void
}

export const Header = ({ user, theme, toggle }: HeaderProps) => {

    return (
        <header>
            <Link to="/user" className='avatar'>
                <img
                    src={user.images[1].url}
                    alt='user-picture'
                    width={50}
                    className='user-picture small' />
            </Link>
            <div className='input-wrapper'>
                <Search className="search-icon" color="grey" size={24} />
                <input className="search" placeholder='What do you want to listen to today?' />
            </div>
            <button onClick={toggle}>
                {theme === "dark" ?
                    <Sun color="#2acfcf" size={28} /> :
                    <Moon color="#2acfcf" size={28} />
                }
            </button>
        </header>
    )
}