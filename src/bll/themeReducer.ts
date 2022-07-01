const initState = {
    value: 'white'
}

type InitialStateType = typeof initState
export type ThemeReducerAT = ReturnType<typeof changeThemeC>

export const themeReducer = (state: InitialStateType = initState, action: ThemeReducerAT): InitialStateType => {
    switch (action.type) {
        case 'CHANGE-THEME': {
            return {...state, value: action.value}
        }
        default:
            return state
    }
}

export const changeThemeC = (value: string) => ({type: 'CHANGE-THEME', value} as const)