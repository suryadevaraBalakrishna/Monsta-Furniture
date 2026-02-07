// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// const isBrowser = typeof window !== 'undefined';

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     register: (state, action) => {
//       if (isBrowser) {
//         localStorage.setItem('USER', JSON.stringify(action.payload));
//       }
//     },
//     login: (state, action) => {
//       if (isBrowser) {
//         const savedUser = JSON.parse(localStorage.getItem('USER'));
//         if (
//           savedUser &&
//           savedUser.email === action.payload.email &&
//           savedUser.password === action.payload.password
//         ) {
//           state.user = savedUser;
//           state.isAuthenticated = true;
//         } else {
//           alert("Invalid Credentials");
//         }
//       }
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     loadUserFromStorage: (state) => {
//       if (isBrowser) {
//         const savedUser = JSON.parse(localStorage.getItem('USER'));
//         if (savedUser) {
//           state.user = savedUser;
//           state.isAuthenticated = true;
//         }
//       }
//     },
//   },
// });

// export const { register, login, logout, loadUserFromStorage } = authSlice.actions;
// export default authSlice.reducer;
