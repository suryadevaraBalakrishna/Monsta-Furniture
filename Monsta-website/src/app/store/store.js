import { configureStore } from "@reduxjs/toolkit";
import  cartSlice from  "../slice/cartSlice";
import authSlice from "../slice/authSlice";
import  wishlistSlice  from "../slice/wishlistSlice";
import  loginSlice from "../slice/loginSlice";


export let myStore=configureStore({
    reducer:{
        cartReducer:cartSlice,
        auth:authSlice,
        wishlist:wishlistSlice,
        login:loginSlice,

    }
})