import {rootReducer} from 'app'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType} from 'types/ActionTypes'

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>