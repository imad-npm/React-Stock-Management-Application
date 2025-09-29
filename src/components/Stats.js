import React, { useContext, useState } from 'react'
import { TransactionsContext } from '../context/TransactionsContextProvider'
import 'chart.js/auto';
import TypesChart from '../charts/TypesChart';
import TopProductsChart from '../charts/TopProductsChart'

function Stats() {
  
  return (
    <div className='container mt-5 d-sm-flex  justify-content-between'>
    <TypesChart />
    <TopProductsChart/>
    
    </div>
  )
}

export default Stats