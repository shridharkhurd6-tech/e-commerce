import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import navLogo from '../../assets/nav-logo.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('admin-user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    function onDoc(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleProfileClick = () => {
    if (!user) return navigate('/login');
    setOpen((s) => !s);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-user');
    setUser(null);
    setOpen(false);
    navigate('/login');
  };

  // Get first letter of username for avatar
  const getInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'A';
  };

  return (
    <div className="navbar" ref={navRef}>
      <div className="nav-logo-section" onClick={() => navigate('/')}>
        <img src={navLogo} alt="Website Logo" className="nav-logo" />
        <div className="shop-name">Shri Prati Ramraj Cloth Shop</div>
      </div>

      <div className="nav-right">
        {user && <div className="nav-username">{user.username || user.email}</div>}
        <div
          className="nav-profile"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
          title="Profile"
        >
          {getInitial()}
        </div>

        {open && (
          <div className="nav-dropdown">
            <div className="nav-dropdown-item" onClick={() => { navigate('/'); setOpen(false); }}>
              📊 Dashboard
            </div>
            <div className="nav-dropdown-item" onClick={() => { navigate('/addproduct'); setOpen(false); }}>
              ➕ Add Product
            </div>
            <div className="nav-dropdown-item" onClick={() => { navigate('/listproduct'); setOpen(false); }}>
              📋 Product List
            </div>
            <div className="nav-dropdown-item" onClick={() => { navigate('/orders'); setOpen(false); }}>
              📦 Orders
            </div>
            <div className="nav-dropdown-divider"></div>
            <div className="nav-dropdown-item logout-item" onClick={handleLogout}>
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

