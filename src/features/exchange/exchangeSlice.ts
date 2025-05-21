import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ExchangeState = { from: string; to: string; amount: string };
const initialState: ExchangeState = { from: "USD", to: "EUR", amount: "" };

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setFrom(state, action: PayloadAction<string>) {
      if (state.to !== action.payload) state.from = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      if (state.from !== action.payload) {
        state.to = action.payload;
      }
    },
    swap(state) {
      [state.from, state.to] = [state.to, state.from];
      state.amount = "";
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});
export const { setFrom, setTo, swap, setAmount } = exchangeSlice.actions;
export default exchangeSlice.reducer;
