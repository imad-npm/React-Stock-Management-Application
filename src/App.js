import React from 'react'
import Products from './components/Products'
import '../src/styles/css/main.css'
import Navbar from './components/Navbar'
import {  Routes, Route } from "react-router-dom";
import Transactions from './components/Transactions'
import Stats from './components/Stats'


function App() {
  return (
    
    <div>
      <Navbar/>
<Routes>
{["/", "/products"].map(path => (
    <Route 
    
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