import React from 'react';
import useTransactionStore from '../../transactions/transactionStore.js';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function TopProductsChart() {
    const { transactions } = useTransactionStore();
  
    const productCounts = transactions.reduce((acc, transaction) => {
      acc[transaction.product] = (acc[transaction.product] || 0) + 1;
      return acc;
    }, {});

    const sortedProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const data = {
      labels: sortedProducts.map(([product]) => product),
      datasets: [{
        label: 'Number of Transactions',
        data: sortedProducts.map(([, count]) => count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };

    const options = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Top 5 Products by Transaction Volume',
          font: {
            size: 18,
          }
        },
      },
    };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded-lg">
      <Bar data={data} options={options} />
    </div>
  )
}

export default TopProductsChart;
