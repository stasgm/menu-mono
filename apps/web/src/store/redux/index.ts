/* eslint-disable @typescript-eslint/no-unsafe-return */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from './services/api';

export function makeStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...(Array.isArray(api.middleware) ? api.middleware : [api.middleware]),
    ],
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
