import React from 'react';
import 'chart.js/auto';
import TypesChart from '../../transactions/components/TypesChart'; // Adjusted path
import TopProductsChart from '../../products/components/TopProductsChart'; // Adjusted path

function StatsPage() { // Renamed component
  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:flex sm:justify-between'>
    <TypesChart />
    <TopProductsChart/>
    
    </div>
  )
}

export default StatsPage; // Export renamed component