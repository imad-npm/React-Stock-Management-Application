import React from 'react';
import 'chart.js/auto';
import TypesChart from './transactions/components/TypesChart';
import TopProductsChart from './products/components/TopProductsChart';

function Stats() {
  
  return (
    <div className='container mt-5 d-sm-flex  justify-content-between'>
    <TypesChart />
    <TopProductsChart/>
    
    </div>
  )
}

export default Stats