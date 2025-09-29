import React, { useContext, useState } from 'react'
import { TransactionsContext } from '../context/TransactionsContextProvider'
import 'chart.js/auto';


import {Bar} from 'react-chartjs-2'


function TopProductsChart() {

    const {transactions}=useContext(TransactionsContext)
  
    var products=[]
    transactions.forEach(t => {
  
      products.push(t.product)
  
    });
console.log(products);

var map=new Map()

products.forEach(p=>{

 if(!map.has(p))
  map.set(p,0)
  var count=map.get(p)*1+1
map.set(p,count)


})

var sortedProducts=[...map.entries()].sort((a,b)=>b[1]-a[1])

console.log(sortedProducts.map(pair=>pair[0]));



const data={

  labels: sortedProducts.map(pair=>pair[0]),
  datasets:[{
    label: 'Mouvements by Products' ,
    data:sortedProducts.map(pair=>pair[1])
  }]
}


  return (
    <div style={{width:500}}>
      <Bar data={data}/>
    </div>
  )
}

export default TopProductsChart