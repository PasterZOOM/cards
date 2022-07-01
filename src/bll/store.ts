import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {loadingReducer, LoadingReducerAT} from './loadingReducer'
import {themeReducer, ThemeReducerAT} from './themeReducer'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    loading: loadingReducer,
    theme: themeReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ThemeReducerAT | LoadingReducerAT

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store // for dev
