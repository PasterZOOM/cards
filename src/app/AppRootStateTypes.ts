import { ThunkDispatch } from 'redux-thunk';

import { rootReducer } from 'app/store';
import { AppActionsType } from 'common/types/ActionTypes';

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;
