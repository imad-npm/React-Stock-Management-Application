import React from 'react';
import useTransactionStore from '../transactionStore.js';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function TypesChart() {
    const { transactions } = useTransactionStore();

    const { entries, exits } = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'ENTRY') {
            acc.entries++;
        } else {
            acc.exits++;
        }
        return acc;
    }, { entries: 0, exits: 0 });

    const data = {
        labels: ['Entries', "Exits"],
        datasets: [{
            data: [entries, exits]
        }]
    };

  return (
    
      <div style={{width:200}} className='mb-5'>
      <Doughnut data={data}/>
    </div>
    
  )
}

export default TypesChart