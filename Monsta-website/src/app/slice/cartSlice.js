import { createSlice } from "@reduxjs/toolkit";

// ✅ Safe getter for initial cart
const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("CART");
    return stored ? JSON.parse(stored) : [];
  }
  return []; // Default on server
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: getInitialCart()
  },
  reducers: {
    addtoCart: (state, action) => {
      const obj = action.payload;
      state.cart.push(obj);
      if (typeof window !== "undefined") {
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },
    deleteCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      state.cart = state.cart.map(item =>
        item.id === id ? { ...item, qty } : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("CART");
      }
    }

  }
});

export const { addtoCart, deleteCart, updateQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;


