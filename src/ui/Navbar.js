import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link className="text-white text-xl font-bold tracking-wide" to="/">Inventory</Link>

        <div className="block md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-md p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`w-full block flex-grow md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm md:flex-grow md:flex md:justify-end md:space-x-6 mt-4 md:mt-0">
            <NavLink
              className={({ isActive }) =>
                `block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white transition duration-300 ${isActive ? 'text-primary font-bold' : ''}`
              }
              to='/products'
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white transition duration-300 ${isActive ? 'text-primary font-bold' : ''}`
              }
              to='/transactions'
            >
              Transactions
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white transition duration-300 ${isActive ? 'text-primary font-bold' : ''}`
              }
              to='/stats'
            >
              Stats
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar