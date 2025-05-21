import React, { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { fetchExchangeRate } from "../../../api/exchangeRates";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setFrom, setTo, setAmount, swap } from "../exchangeSlice";
import { exchange } from "../../wallet/walletSlice";
import { CurrencySelect } from "../../../components/currency-select";
import { NumberInput } from "../../../components/number-input";
import { SwapButton } from "../../../components/swap-button";

const currencies = ["USD", "EUR", "GBP"];

export const ExchangeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { from, to, amount } = useAppSelector((s) => s.exchange);

  const { data, isLoading } = useQuery(["rate", from, to], () => fetchExchangeRate(from, to), {
    refetchInterval: 5000,
    staleTime: 5000,
    refetchIntervalInBackground: true,
  });

  const rate = useMemo(() => {
    if (data?.result) {
      const keys = Object.keys(data.result) as Array<keyof typeof data.result>;
      const firstKey = keys[0];
      return data.result[firstKey] ?? 0;
    }
    return 0;
  }, [data]);
  
  const parsed = useMemo(() => parseFloat(amount) || 0, [amount]);

  const onExchange = useCallback(() => {
    if (from >= amount) {if (parsed > 0) dispatch(exchange({ from, to, amount: parsed, rate }))}else{
      alert("You don't have enough money to exchange")
    };
  }, [dispatch, from, parsed, to, rate, amount]);

  return (
    <div className="exchange-form">
      <CurrencySelect value={from} onChange={(v) => dispatch(setFrom(v))} options={currencies} />
      <NumberInput value={amount} onChange={(v) => dispatch(setAmount(v))} />
      <span className="exchange-form__rate">{isLoading ? "..." : `1 ${from} = ${rate.toFixed(4)} ${to}`}</span>
      <CurrencySelect value={to} onChange={(v) => dispatch(setTo(v))} options={currencies} />
      <SwapButton onClick={() => dispatch(swap())} />
      <button className="exchange-form__button" onClick={onExchange} disabled={parsed <= 0 || isLoading}>
        تبدیل
      </button>
    </div>
  );
};
