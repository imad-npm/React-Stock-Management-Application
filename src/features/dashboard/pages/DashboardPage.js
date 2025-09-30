import React from 'react';
import 'chart.js/auto';
import TypesChart from '../../transactions/components/TypesChart';
import TopProductsChart from '../../products/components/TopProductsChart';

function DashboardPage() {
  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:flex sm:justify-between'>
    <TypesChart />
    <TopProductsChart/>
    
    </div>
  )
}

export default DashboardPage;
