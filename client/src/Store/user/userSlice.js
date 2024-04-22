import { createSlice} from "@reduxjs/toolkit";
import * as actions from './asysnActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
    },
    reducers: {
        login: (state,action) =>{
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
            console.log(action);
        },
        logout: (state,action) =>{
            state.isLoggedIn = false
            state.current = null
            state.token = null
            state.isLoading = false
            console.log(action);
        }
    },
    // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
    });
  },
})

  export const { login,logout } = userSlice.actions
export default userSlice.reducer