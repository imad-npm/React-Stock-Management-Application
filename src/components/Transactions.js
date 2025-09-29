import React, { useContext, useEffect, useState }  from 'react'
import SearchTransaction from './SearchTransaction'

import {TransactionsContext} from '../context/TransactionsContextProvider'
import AddTransaction from './AddTransaction';
import Modal from './Modal';
import Pagination from './Pagination';
import Transaction from './Transaction';
import FilterTransaction from './FilterTransaction';

export default function Transactions() {


    const {transactions,exportTransactions,filteredTransactions,setFilteredTransactions}=useContext(TransactionsContext)
   
    const [showModal, setShowModal] = useState(false);
    const [modalComponent, setModalComponent] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const[currentPage,setCurrentPage]= useState(1) ;


    const openModal = (title,component) => {
      setShowModal(true);
      setModalTitle(title)
      setModalComponent(component);
    };

  
    const closeModal = () => {
      setShowModal(false);
      setModalComponent(null);
    };
  
  
    const itemsPerPage=10 ;
    const totalItems=filteredTransactions.length;
    const totalPages=Math.ceil(totalItems/itemsPerPage) ;
   
   var lastItemIndex=currentPage*itemsPerPage ;
   var firstItemIndex=lastItemIndex-itemsPerPage ; 
   
   


  return (
    <div className='container mt-3'>
  
  <div  className=' d-flex flex-wrap  justify-content-between  align-items-center mt-4 mb-5  '> 
        <SearchTransaction />
        <button type="button" class="btn mt-1  btn-success  "
         onClick={()=>openModal('Add Transaction',<AddTransaction/>)}  > 
        Add Transaction  <i class="fa fa-plus-square  m-1   "></i>
            </button>

            <FilterTransaction/>

</div>

    <table class="table custom-table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
     <th scope="col">Type</th> 
     <th scope="col">Date</th>
      
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    {
      
filteredTransactions.slice(firstItemIndex,lastItemIndex).map(
  (transaction)=><Transaction transaction={transaction} openModal={openModal} 
/>
)
    }
   
  </tbody>
  </table>

  <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />



  <button className='btn btn-primary' onClick={()=>exportTransactions()}>Export</button>

    {/* Render modal conditionally */}
{(showModal &&
  <Modal onClose={closeModal} title={modalTitle} component={modalComponent}/>
    )}

    </div>


)
}
  

 