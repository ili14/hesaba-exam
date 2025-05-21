import React from "react";
interface Props {
  onClick: () => void;
}
export const SwapButton: React.FC<Props> = ({ onClick }) => (
  <button className="exchange-form__swap" onClick={onClick}>
    🔄
  </button>
);
