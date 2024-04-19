import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import userSlice from "./userSlice";
import { persistStore, persistReducer } from 'redux-persist'


// luu du lieu khi login len local
const commonConfig = {
    key: 'shop/user',
    storage
}
const userConfig = {
    ...commonConfig,
    whitelist: ['isloggedIn','token']
}


 const store = configureStore({
    reducer: {
        user: persistReducer(userConfig,userSlice),
    }
})
export default  persistStore(store)
