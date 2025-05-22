import React from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}

export const CurrencySelect: React.FC<Props> = ({ value, onChange, options, className }) => (
  <select title="exchange" className={`select-base ${className}`} value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((cur) => (
      <option key={cur} value={cur}>
        {cur}
      </option>
    ))}
  </select>
);
