import { makeStyles } from '@mui/styles';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppRootStateType } from 'types/AppRootStateTypes';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export const useStyles = makeStyles(() => ({
  registerMain: {
    position: 'absolute',
    top: '120px',
    width: '413px',
    height: '528px',
    left: '50%',
    marginLeft: '-207px',
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
    padding: '35px 33px 42px',
  },
}));
