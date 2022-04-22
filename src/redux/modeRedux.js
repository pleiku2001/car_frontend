import { createSlice } from "@reduxjs/toolkit";

const modeRedux = createSlice({
    name:"mode",
    initialState:{
        darkMode: false
    },
    reducers:{
        changeMode: (state)=>{
            state.darkMode = true;
        }
    }
})

export const {changeMode} = modeRedux.actions

export default modeRedux.reducer;