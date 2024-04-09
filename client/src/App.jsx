import { useState, useEffect } from "react";
import Home from "./components/Navbar/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"
import Cart from "./components/Navbar/Cart/Cart.jsx";
import Account from "./components/Navbar/Account/SignIn/SignIn.jsx";

export default function App() {
    const [selectedSection, setSelectedSection] = useState('home');

    return (
        <div>
            <Navbar setSelectedSection={setSelectedSection} />
            <div>
                {selectedSection === 'home' && <Home />}
                {selectedSection === 'account' && <Account />}
                {selectedSection === 'cart' && <Cart />}
            </div>
        </div>
    );
}