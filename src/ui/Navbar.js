import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div>
<nav className="navbar navbar-expand-lg  bg-dark navbar-dark ">
  <div className="container-fluid ">
    <a className="navbar-brand " href="#">Inventory</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ">
   
        <NavLink  className="nav-link "   to='/products'>Products</NavLink>
        <NavLink   className="nav-link"    to='/transactions'>Transactions</NavLink>
        <NavLink   className="nav-link"       to='/stats'>Stats</NavLink>


      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar