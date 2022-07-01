type InitStateType = typeof initState

const initState = {
    isLoading: false
}

export type LoadingReducerAT = ReturnType<typeof loadingAC>

export const loadingReducer = (state: InitStateType = initState, action: LoadingReducerAT): InitStateType => {
    switch (action.type) {
        case 'LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state
    }
}

export const loadingAC = (isLoading: boolean) => ({type: 'LOADING', isLoading} as const) // fix any