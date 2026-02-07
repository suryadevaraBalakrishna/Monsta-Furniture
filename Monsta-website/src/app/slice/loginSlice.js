"use client"
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useState } from 'react';


const initialState = {
  user: Cookies.get('user') ?? '',
  token: Cookies.get('token') ?? ''
};

export const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        userDetails:(state,{payload})=>{
            state.user=payload.user,
            Cookies.set('user',payload.user)

            state.token=payload.token,
            Cookies.set('user',payload.token)
        },
        logOut:(state)=>{
          state.user='',
          Cookies.remove('user');

          state.token='',
          Cookies.remove('token');
        }

    }
})


export const {userDetails,logOut} = loginSlice.actions;
export default loginSlice.reducer;