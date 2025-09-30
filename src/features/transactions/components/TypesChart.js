import React from 'react';
import useTransactionStore from '../transactionStore.js';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

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
        labels: ['Entries', 'Exits'],
        datasets: [{
            label: 'Number of Transactions',
            data: [entries, exits],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Transaction Types',
                font: {
                    size: 18,
                }
            },
        },
    };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <Bar data={data} options={options} />
    </div>
  )
}

export default TypesChart;
