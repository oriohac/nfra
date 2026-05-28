import '../App.css'
import { isAuthenticated, logoutUser, isAdmin, getUser, isUser } from "../components/auth/authHelper";
import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            {menuOpen && <div className="menu-overlay" onClick={closeMenu}/>}
            <header className="navbar" ref={navRef}>

                <NavLink to="/"><div className="logo">

                    NFRA

                </div></NavLink>

                {/* HAMBURGER */}
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>

                {/* NAV LINKS */}
                <nav className={`navlinks ${menuOpen ? "open" : ""}`}>

                    <NavLink to="/" onClick={closeMenu} className="nav-link">
                        Home
                    </NavLink>

                    <NavLink to="/about" onClick={closeMenu} className="nav-link">
                        About
                    </NavLink>

                    <NavLink to="/contact-us" onClick={closeMenu} className="nav-link">
                        Contact us
                    </NavLink>
                    {isAdmin() && (
                        <NavLink to="/admin-dashboard" onClick={closeMenu} className="nav-link">
                            Admin
                        </NavLink>
                    )}

                    {isUser() && (
                        <NavLink to="/userprofile" onClick={closeMenu} className="nav-link">
                            Profile
                        </NavLink>
                    )

                    }

                    {isAuthenticated() ? (
                        <span
                            className="nav-link"
                            onClick={() => {
                                handleLogout();
                                closeMenu();
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Logout
                        </span>
                    ) : (
                        <NavLink
                            to="/signup"
                            onClick={closeMenu}
                            className="nav-link"
                        >
                            Join us
                        </NavLink>
                    )}

                </nav>

            </header>
        </div>
    );

}
