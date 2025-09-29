
import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts && storedProducts !== '[]') {
        set({ products: JSON.parse(storedProducts) });
      } else {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        localStorage.setItem('products', JSON.stringify(data.products));
        set({ products: data.products });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  insertProduct: (product) => set((state) => {

    console.log(product,state.products.length);
    
    const newProducts = [...state.products, product];
    localStorage.setItem('products', JSON.stringify(newProducts));
    return { products: newProducts };
  }),

  deleteProduct: (id) => set((state) => {
    const newProducts = state.products.filter((p) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(newProducts));
    return { products: newProducts };
  }),

  updateProduct: (updatedProduct) => set((state) => {
    const newProducts = state.products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(newProducts));
    return { products: newProducts };
  }),

  updateStock: (productTitle, quantity) => set((state) => {
    const newProducts = state.products.map(p => {
      if (p.title === productTitle) {
        return { ...p, stock: p.stock + Number(quantity) };
      }
      return p;
    });
    localStorage.setItem('products', JSON.stringify(newProducts));
    return { products: newProducts };
  }),
}));

useProductStore.getState().fetchProducts();

export default useProductStore;
