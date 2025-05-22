import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface CashSpecificProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  currencyName: string;
}

const CashSpecific: React.FC<CashSpecificProps> = (props) => {
  const balances = useSelector((state: RootState) => state.wallet.balances);

  return <div {...props}>{"$"}{typeof balances[props.currencyName] !== "undefined" ? balances[props.currencyName].toFixed(2) : "didn't find this currency"}</div>;
};

export default CashSpecific;
