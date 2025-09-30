import React from 'react';
import 'chart.js/auto';
import TypesChart from '../../transactions/components/TypesChart';
import TopProductsChart from '../../products/components/TopProductsChart';
import useProductStore from '../../products/productStore';
import useTransactionStore from '../../transactions/transactionStore';

function DashboardPage() {
  const { products } = useProductStore();
  const { transactions } = useTransactionStore();

  const totalProducts = products.length;
  const totalTransactions = transactions.length;
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalCategories = [...new Set(products.map(p => p.category))].length;

  const stats = [
    { name: 'Total Products', stat: totalProducts },
    { name: 'Total Transactions', stat: totalTransactions },
    { name: 'Total Stock', stat: totalStock },
    { name: 'Total Categories', stat: totalCategories },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">All-Time Stats</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <p className="text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <TypesChart />
        <TopProductsChart />
      </div>
    </div>
  );
}

export default DashboardPage;
