import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState={
    user: Cookies.get('user') ?? '',
    admin_token: Cookies.get('admin_token') ?? ''
}

export const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        userDetails:((state,{payload})=>{
            state.user=payload.user,
            Cookies.set('user',payload.user)

            state.admin_token=payload.token,
            Cookies.set('admin_token',payload.token)
        }),

        logout:((state)=>{
           state.user='',
           Cookies.remove('user')

           state.admin_token='',
           Cookies.remove('admin_token')           
        })
    }
})


export const {userDetails,logout} = loginSlice.actions;
export default loginSlice.reducer;