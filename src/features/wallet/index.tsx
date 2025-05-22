import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

export const Wallet: React.FC = () => {
  const balances = useSelector((state: RootState) => state.wallet.balances);
  return (
    <div className="wallet">
      <h2 className="wallet__title"> Your Wallet</h2>
      {Object.entries(balances).map(([currency, amount]) => (
        <div key={currency} className="wallet__row">
          <span className="wallet__currency">{currency}</span>
          <span className="wallet__amount">{amount.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};