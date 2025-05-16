import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-success" to="/">Thyme Machine</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
          <li className="nav-item"><Link className="nav-link" to="/">All</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/add">Add</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
          {isLoggedIn ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/favorites">Favorites</Link></li>
              <li className="nav-item"><button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
