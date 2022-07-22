import {combineReducers} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {loadingReducer, LoadingReducerAT} from './loadingReducer'
import {themeReducer, ThemeReducerAT} from './themeReducer'

const rootReducer = combineReducers({
    loading: loadingReducer,
    theme: themeReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ThemeReducerAT | LoadingReducerAT

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>