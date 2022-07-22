import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {loadingReducer, themeReducer} from 'app'

export const rootReducer = combineReducers({
    loading: loadingReducer,
    theme: themeReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})