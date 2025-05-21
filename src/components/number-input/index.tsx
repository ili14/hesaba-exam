import React from "react";
interface Props {
  value: string;
  onChange: (v: string) => void;
}
export const NumberInput: React.FC<Props> = ({ value, onChange }) => {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^(\d*(\.\d{0,2})?)?$/.test(e.target.value)) onChange(e.target.value);
  };
  return <input className="exchange-form__input" value={value} onChange={handle} placeholder="0.00" />;
};
