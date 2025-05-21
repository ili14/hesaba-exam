import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WalletState = { balances: Record<string, number> };
const initialState: WalletState = { balances: { USD: 100, EUR: 100, GBP: 100 } };

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    exchange(state, action: PayloadAction<{ from: string; to: string; amount: number; rate: number }>) {
      const { from, to, amount, rate } = action.payload;
      if (state.balances[from] >= amount) {
        state.balances[from] -= amount;
        state.balances[to] += amount * rate;
      }
    },
  },
});
export const { exchange } = walletSlice.actions;
export default walletSlice.reducer;
