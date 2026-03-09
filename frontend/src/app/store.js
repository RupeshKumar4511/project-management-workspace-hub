import { configureStore } from '@reduxjs/toolkit'
import {workspace} from '../features/workspaceSlice'
import themeReducer from '../features/themeSlice'
import authSlice from '../features/authSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth:authSlice.reducer,
        [workspace.reducerPath]: workspace.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(workspace.middleware)
})