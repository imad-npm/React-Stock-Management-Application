import React from 'react'
import Products from './features/products/components/Products'
import '../src/styles/css/main.css'
import Navbar from './ui/Navbar'
import {  Routes, Route } from "react-router-dom";
import Transactions from './features/transactions/components/Transactions'
import Stats from './features/Stats'


function App() {
  return (
    
    <div>
      <Navbar/>
      <Routes>
        {["/", "/products"].map(path => (
          <Route 
            key={path}
            path={path}
            element={<Products />}
          />
        ))}
        <Route path='/transactions' element={<Transactions/>} />
        <Route path='/stats' element={<Stats/>} />
      </Routes>
    </div>
  )
}

export default App
