import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ setSelectedSection }) {
    const [activeButton, setActiveButton] = useState('home');

    const handleButtonClick = (section) => {
        setSelectedSection(section);
        setActiveButton(section);
    };

    return <>
        <nav>
            <ul>
                <li>
                    <button
                        className={activeButton === 'account' ? 'active' : ''}
                        onClick={() => handleButtonClick('account')}
                    >
                        My Account
                    </button>
                </li>
                <li>
                    <button
                        className={activeButton === 'home' ? 'active' : ''}
                        onClick={() => handleButtonClick('home')}
                    >
                        Home
                    </button>
                </li>
                <li>
                    <button
                        className={activeButton === 'cart' ? 'active' : ''}
                        onClick={() => handleButtonClick('cart')}
                    >
                        My Cart
                    </button>
                </li>
            </ul>
        </nav>
    </>;
}
