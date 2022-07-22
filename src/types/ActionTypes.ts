import {changeThemeAC, loadingAC} from 'app'

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>
export type LoadingReducerAT = ReturnType<typeof loadingAC>

export type AppActionsType = ThemeReducerAT | LoadingReducerAT