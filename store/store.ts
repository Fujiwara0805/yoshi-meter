import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './features/statsSlice';
import gamesReducer from './features/gamesSlice';
import newsReducer from './features/newsSlice';
import notificationsReducer from './features/notificationsSlice';
import settingsReducer from './features/settingsSlice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    games: gamesReducer,
    news: newsReducer,
    notifications: notificationsReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;