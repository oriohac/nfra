import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import ErrorPage from './components/error/errorpage'
import Home from './components/home/home';
import UserProfile from './components/user/userprofile';



function App() {
   const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <div>



      <Router>


      <header className="navbar">

        <div className="logo">NFRA</div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        {/* NAV LINKS */}
        <nav className={`navlinks ${menuOpen ? "open" : ""}`}>

          <NavLink to="/" onClick={closeMenu} className="nav-link">
            Home
          </NavLink>

          <NavLink to="/signup" onClick={closeMenu} className="nav-link">
            Signup
          </NavLink>

          <NavLink to="/login" onClick={closeMenu} className="nav-link">
            Login
          </NavLink>

        </nav>

      </header>
        

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/userprofile" element={<UserProfile />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>



    </div>

  )
}



export default App
