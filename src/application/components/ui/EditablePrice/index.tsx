import { formatPrice } from "shared/utils/numbers/formatPrice";

import { Editable } from "../Editable";

interface EditablePrice {
  price: number;
  onChange?: (price: number) => void;
  disabled?: boolean;
}

export const EditablePrice = ({ price, onChange, disabled }: EditablePrice) => {
  const _onChange = (nextValue: string) => {
    onChange?.(Number.parseFloat(nextValue ?? "0"));
  };

  return (
    <Editable<number>
      type="number"
      value={price}
      onChange={_onChange}
      disabled={disabled}
      render={formatPrice}
    />
  );
};
