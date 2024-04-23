import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./features/slices/loginInfoSlice";
import isLoggedInSlice from "./features/slices/isLoggedIn";

export const store = configureStore({
    reducer:{
        login:userInfoSlice,
        checkLogin:isLoggedInSlice

    }
})