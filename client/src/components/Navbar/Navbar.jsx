import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/protected', {
                method: 'GET',
                headers: {  
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
                }
            });
            if (response.ok) { 
                const userData = await response.json();
                setIsLoggedIn(true); 
                setIsAdmin(userData.user.is_admin);
            } else {
                setIsLoggedIn(false); 
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoggedIn(false); 
        }
    };

    const handleMyAccountClick = () => {
        navigate('/signin');
    };

    return (
        <nav>
            <ul>
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <li>
                                <NavLink
                                    to="/admin"
                                    activeClassName="active"
                                    className="navlink"
                                >
                                    Admin
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink
                                to="/account"
                                activeClassName="active"
                                className="navlink"
                            >
                                My Account
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <li>
                        <NavLink
                            to="/signin"
                            className="navlink"
                            onClick={handleMyAccountClick}
                        >
                            My Account
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink
                        to="/"
                        exact="true"
                        activeClassName="active"
                        className="navlink"
                    >
                        Home
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
