import { createSlice } from "@reduxjs/toolkit";


export interface userInfoType{
        user:string,
        room:string
    
}

 const initialState = {
    loginInfo:{
        user:'salam',
        room:'sagol'
    }
}

const loginInfoSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        loginInfo:(state,actions)=>{
            state.loginInfo = {...actions.payload}
        }
    }
})

export const {loginInfo} = loginInfoSlice.actions;

export const selectLoginInfo = (state:{login:{loginInfo:userInfoType}})=>state.login.loginInfo;
export default loginInfoSlice.reducer