import React from 'react';
interface Props { value: string; onChange: (v: string) => void; options: string[]; }
export const CurrencySelect: React.FC<Props> = ({ value, onChange, options }) => (
  <select title='exchange' className="exchange-form__select" value={value} onChange={e => onChange(e.target.value)}>
    {options.map(cur => <option key={cur} value={cur}>{cur}</option>)}
  </select>
);