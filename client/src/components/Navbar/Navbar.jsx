import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [isAdmin, setIsAdmin] = useState(false);

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
                const data = await response.json();
                setIsAdmin(data.role === 'admin'); 
            } else {
                setIsAdmin(false); 
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsAdmin(false); 
        }
    };

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/account"
                        activeClassName="active"
                        className="navlink"
                    >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        exact
                        activeClassName="active"
                        className="navlink"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/cart"
                        activeClassName="active"
                        className="navlink"
                    >
                        My Cart
                    </NavLink>
                </li>
                {isAdmin && (
                    <li>
                        <NavLink
                            to="/admin"
                            activeClassName="active"
                            className="navlink"
                        >
                            Admin
                        </NavLink> {/* i'm trying to make it so it shows the admin in the navbar whenever you sign in as an admin (refer to the database) */}
                    </li>
                )} 
            </ul>
        </nav>
    );
}
