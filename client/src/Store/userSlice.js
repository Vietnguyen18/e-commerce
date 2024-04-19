import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
    },
    reducers: {
        register: (state,action) =>{
            state.isLoggedIn = action.isLoggedIn
            state.current = action.useData
            state.token = action.token
        }
    }
})
export default userSlice.reducer