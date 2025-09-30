import { create } from 'zustand';
import useProductStore from '../products/productStore';
import generateTransactions from '../../lib/generateTransactions';
import * as XLSX from 'xlsx';

const useTransactionStore = create((set, get) => ({
  transactions: generateTransactions(100),

  insertTransaction: (transaction) => {
    const { updateStock } = useProductStore.getState();
    const quantityChange = transaction.type === 'ENTRY' ? transaction.quantity : -transaction.quantity;
    updateStock(transaction.product, quantityChange);

    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      return { transactions: newTransactions };
    });
  },

  deleteTransaction: (transaction) => {
    const { updateStock } = useProductStore.getState();
    const quantityChange = transaction.type === 'EXIT' ? transaction.quantity : -transaction.quantity;
    updateStock(transaction.product, quantityChange);

    set((state) => {
      const newTransactions = state.transactions.filter((t) => t.id !== transaction.id);
      return { transactions: newTransactions };
    });
  },

  updateTransaction: (updatedTransaction) => {
    const { updateStock } = useProductStore.getState();
    const originalTransaction = get().transactions.find(t => t.id === updatedTransaction.id);

    if (originalTransaction) {
      const oldQuantityChange = originalTransaction.type === 'ENTRY' ? -originalTransaction.quantity : originalTransaction.quantity;
      updateStock(originalTransaction.product, oldQuantityChange);

      const newQuantityChange = updatedTransaction.type === 'ENTRY' ? updatedTransaction.quantity : -updatedTransaction.quantity;
      updateStock(updatedTransaction.product, newQuantityChange);

      set((state) => {
        const newTransactions = state.transactions.map(t => 
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
        return { transactions: newTransactions };
      });
    }
  },

  exportTransactions: () => {
    const worksheet = XLSX.utils.json_to_sheet(get().transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `transactions.xlsx`);
  },
}));

export default useTransactionStore;
