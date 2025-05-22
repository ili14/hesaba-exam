import React, { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { fetchExchangeRate } from "../../../api/exchangeRates";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setFrom, setTo, setAmount, swap } from "../exchangeSlice";
import { exchange } from "../../wallet/walletSlice";
import { CurrencySelect } from "../../../components/currency-select";
import { NumberInput } from "../../../components/number-input";
import { SwapButton } from "../../../components/swap-button";
import CashSpecific from "../../cash-specefic";

const currencies = ["USD", "EUR", "GBP"];

export const ExchangeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { from, to, amount } = useAppSelector((s) => s.exchange);

  const { data, isLoading } = useQuery(["rate", from, to], () => fetchExchangeRate(from, to), {
    refetchInterval: 5000,
    staleTime: 5000,
    // ! این رو برای این true کردم که اگر مثلا سیستم نوتیفیکشن داشتیم به کاربر اطلاع بده که قیمت تغییر کرده
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
    if (from >= amount) {
      if (parsed > 0) dispatch(exchange({ from, to, amount: parsed, rate }));
    } else {
      alert("You don't have enough money to exchange");
    }
  }, [dispatch, from, parsed, to, rate, amount]);

  const onToCurrencyChange = useCallback(
    (v: string) => {
      if (from !== v) dispatch(setTo(v));
    },
    [dispatch, from]
  );

  const onFromCurrencyChange = useCallback(
    (v: string) => {
      if (to !== v) dispatch(setFrom(v));
    },
    [dispatch, to]
  );

  const onSwapBtnClick = useCallback(() => {
    dispatch(swap());
  }, [dispatch]);

  const handleAmountChange = useCallback((v: string) => dispatch(setAmount(v)), [dispatch]);

  return (
    <div className="exchange-form">
      <div className="exchange-form__from-section">
        <div className="exchange-form_input-row">
          <CurrencySelect value={from} className="exchange-form__from-section-currency-select" onChange={onFromCurrencyChange} options={currencies} />
          <NumberInput value={amount} className="exchange-form__from-section-amount-input" onChange={handleAmountChange} />
        </div>
        <CashSpecific className="exchange-form__from-section-cash" currencyName={from} />
      </div>

      <span className="exchange-form__rate">{isLoading ? "..." : `1 ${from} = ${rate.toFixed(4)} ${to}`}</span>
      <SwapButton onClick={onSwapBtnClick} />

      <div className="exchange-form__to-section">
        <CurrencySelect value={to} className="exchange-form__to-currency-select" onChange={onToCurrencyChange} options={currencies} />
        <CashSpecific className="exchange-form__to-section-cash" currencyName={to} />
      </div>

      <button className="exchange-form__button" onClick={onExchange} disabled={parsed <= 0 || isLoading}>
        Exchange
      </button>
    </div>
  );
};
