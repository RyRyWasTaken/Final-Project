import "./Navbar.css"

export default function Navbar({ setSelectedSection }) {
    return (
        <nav>
            <ul>
                <li><button onClick={() => setSelectedSection('home')}>Home</button></li>
                <li><button onClick={() => setSelectedSection('about')}>About</button></li>
                <li><button onClick={() => setSelectedSection('login')}>Login</button></li>
                <li><button onClick={() => setSelectedSection('signup')}>Signup</button></li>
            </ul>
        </nav>
    );
}