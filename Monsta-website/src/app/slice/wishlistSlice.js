import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [], // Do not access localStorage here
};

const isBrowser = typeof window !== "undefined";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtowishlist: (state, action) => {
      const wish = action.payload;
      state.wishlist.push(wish);
      if (isBrowser) {
        localStorage.setItem("WISHLIST", JSON.stringify(state.wishlist));
      }
    },
    removefromwishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
      if (isBrowser) {
        localStorage.setItem("WISHLIST", JSON.stringify(state.wishlist));
      }
    },
    loadwishlistfromstorage: (state) => {
      if (isBrowser) {
        const data = localStorage.getItem("WISHLIST");
        state.wishlist = data ? JSON.parse(data) : [];
      }
    },
  },
});

export const {
  addtowishlist,
  removefromwishlist,
  loadwishlistfromstorage,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
