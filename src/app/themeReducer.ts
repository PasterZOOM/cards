import {ThemeReducerAT} from 'types'

const initState = {
    value: 'white'
}

type InitialStateType = typeof initState

export const themeReducer = (state: InitialStateType = initState, action: ThemeReducerAT): InitialStateType => {
    switch (action.type) {
        case 'CHANGE-THEME': {
            return {...state, value: action.value}
        }
        default:
            return state
    }
}

export const changeThemeAC = (value: string) => ({type: 'CHANGE-THEME', value} as const)