import React from "react";
interface Props {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}
export const NumberInput: React.FC<Props> = ({ value, onChange, className }) => {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^(\d*(\.\d{0,2})?)?$/.test(e.target.value)) onChange(e.target.value);
  };
  return <input type="number" className={`input-base ${className}`} value={value} onChange={handle} placeholder="0.00" />;
};
