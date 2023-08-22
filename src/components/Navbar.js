import React from 'react';
import {Link} from 'react-router-dom';
const Navbar=()=> {
    return (
        <>
    <nav className="navbar">
<ul className="nav-list">
  <li className="nav-item"><Link to="/login">Login</Link></li>
  <li className="nav-item"><Link to="/signup">Signup</Link></li>
  <li className="nav-item"><Link to="/admin">Admin</Link></li>
</ul>
</nav>

        </>
    )

}

export default Navbar;