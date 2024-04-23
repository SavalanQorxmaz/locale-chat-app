import { createSlice } from "@reduxjs/toolkit";

interface isLoggedInType {
    isLoggedIn:boolean
}

const initialState = {
    isLoggedIn:false
}

const LoginSlice = createSlice({
    name:'checkLogin',
    initialState,
    reducers:{
        checkReducer: (state, action)=>{
            state.isLoggedIn = action.payload
        }
    }
})

export const {checkReducer} = LoginSlice.actions;

export const selectLogin = (state:{checkLogin:isLoggedInType})=>state.checkLogin.isLoggedIn;

export default LoginSlice.reducer
