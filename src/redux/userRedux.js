import { createSlice } from "@reduxjs/toolkit";

const userRedux = createSlice({
  name: "user",
  initialState: {
   currentUser: null,
   isFetching: false,
   error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error= false;

    },
    loginFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    logout:(state)=>{
      state.currentUser=null
    }
  },
});

export const { loginStart,loginSuccess,loginFailure,logout } = userRedux.actions;

export default userRedux.reducer;
