import { useState, useEffect } from "react";
import About from "./components/Navbar/Sections/About/About.jsx";
import Home from "./components/Navbar/Sections/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"

export default function App() {
    const [selectedSection, setSelectedSection] = useState('home');

    return (
        <div>
            <Navbar setSelectedSection={setSelectedSection} />
            <div>
                {selectedSection === 'home' && <Home />}
                {selectedSection === 'about' && <About />}
            </div>
        </div>
    );
}