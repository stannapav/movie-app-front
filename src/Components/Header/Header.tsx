import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserDTO } from '../../Types/UserDTO';
import './Header.css';

interface HeaderProps {
    user: UserDTO | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (user) {
            onLogout();
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <h1 className="website-title" onClick={() => navigate('/')}>
                MovieApp
            </h1>
            <button className="auth-button" onClick={handleAuthClick}>
                {user ? user.name : 'Login'}
            </button>
        </header>
    );
};

export default Header; 