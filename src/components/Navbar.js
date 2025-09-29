import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div>
<nav class="navbar navbar-expand-lg  bg-dark navbar-dark ">
  <div class="container-fluid ">
    <a class="navbar-brand " href="#">Inventory</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ">
   
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