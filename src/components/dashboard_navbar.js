import React from 'react';
import {Link} from 'react-router-dom';
import "./dashboard_navbar.css"
const DashboardNavbar=()=> {
    return (
        <>
    <nav className="navbar">
<ul className="nav-list">
  <li className="nav-item"><Link to="/account-summary">Account Summary</Link></li>
  <li className="nav-item"><Link to="/transaction">Transaction</Link></li>
  <li className="nav-item"><Link to="/account-statement">Account Statement</Link></li>
</ul>
</nav>

        </>
    )

}

export default DashboardNavbar;