import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../features/wallet/walletSlice';
import exchangeReducer from '../features/exchange/exchangeSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    exchange: exchangeReducer,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
