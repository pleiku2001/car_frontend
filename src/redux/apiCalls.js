import { loginStart, loginSuccess, loginFailure,logout } from "./userRedux.js";

import { publicRequest } from "../request";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    // console.log(res.data)
   
  } catch (error) {
    dispatch(loginFailure());
  }
};


export const logoutt = async(dispatch)=>{
  dispatch(logout())
}
