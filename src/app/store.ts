import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PhotoReduser from './redux/PhotoReduser';
import todosReduser from './redux/todosReduser';

export const store = configureStore({
  reducer: {
    todos: todosReduser,
    photos: PhotoReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
