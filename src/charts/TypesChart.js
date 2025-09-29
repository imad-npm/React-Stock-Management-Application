import React, { useContext, useState } from 'react'
import { TransactionsContext } from '../context/TransactionsContextProvider'
import 'chart.js/auto';

import {Doughnut} from 'react-chartjs-2'


function TypesChart() {
  
  var exits=0;
  var entries=0;

  const {transactions}=useContext(TransactionsContext)
  
  transactions.forEach(t => {
        if(t.type=='ENTRY')
entries++
else
exits++

  });

  const data={
    labels:['Entries',"Exits"],
    datasets:[{

      data:[entries,exits]
    }]
  }

  return (
    
      <div style={{width:200}} className='mb-5'>
      <Doughnut data={data}/>
    </div>
    
  )
}

export default TypesChart