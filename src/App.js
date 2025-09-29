import React from 'react'
import '../src/styles/css/main.css'
import Navbar from './ui/Navbar'
import { Routes, Route } from "react-router-dom";

// Import page components from their new locations
import ProductsPage from './features/products/pages/ProductsPage';
import TransactionsPage from './features/transactions/pages/TransactionsPage';
import StatsPage from './features/stats/pages/StatsPage';
import AddProductPage from './features/products/pages/AddProductPage';
import AddTransactionPage from './features/transactions/pages/AddTransactionPage';
import ProductDetailsPage from './features/products/pages/ProductDetailsPage';
import EditProductPage from './features/products/pages/EditProductPage'; // Import new page
import EditTransactionPage from './features/transactions/pages/EditTransactionPage'; // Import new page


function App() {
  return (
    
    <div>
      <Navbar/>
      <Routes>
        {["/", "/products"].map(path => (
          <Route 
            key={path}
            path={path}
            element={<ProductsPage />} // Use ProductsPage
          />
        ))}
        <Route path='/products/add' element={<AddProductPage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/products/edit/:id' element={<EditProductPage />} /> {/* New route for Edit Product */}
        <Route path='/transactions' element={<TransactionsPage/>} />
        <Route path='/transactions/add' element={<AddTransactionPage />} />
        <Route path='/transactions/edit/:id' element={<EditTransactionPage />} /> {/* New route for Edit Transaction */}
        <Route path='/stats' element={<StatsPage/>} />
      </Routes>
    </div>
  )
}

export default App
