import {
  Editable as _Editable,
  EditableInput,
  EditableInputProps,
  EditablePreview,
  EditableProps,
  EditableTextarea,
  useBoolean,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

interface Editable<T>
  extends Omit<
    EditableProps,
    "value" | "onEdit" | "onCancel" | "onSubmit" | "onChange" | "isDisabled"
  > {
  value: T;
  onChange: (value: string) => void;
  disabled?: boolean;
  render?: (value: T) => ReactNode | string;
  type?: EditableInputProps["type"] | "textarea";
}

export const Editable = <T,>({
  value,
  onChange,
  render = (v) => `${v}`,
  disabled,
  type,
  ...rest
}: Editable<T>) => {
  const [isEditing, setIsEditing] = useBoolean();
  const [internalValue, setInternalValue] = useState(`${value}`);

  useEffect(() => {
    setInternalValue(`${value}`);
  }, [value]);

  const formattedValue = isEditing ? internalValue : render(value);

  const onSubmit = (nextValue: string) => {
    onChange(nextValue);
    setIsEditing.off();
  };

  return (
    <_Editable
      value={formattedValue as string}
      onEdit={setIsEditing.on}
      onCancel={setIsEditing.off}
      onSubmit={onSubmit}
      onChange={setInternalValue}
      isDisabled={disabled}
      {...rest}
    >
      <EditablePreview />
      {type === "textarea" && <EditableTextarea />}
      {type !== "textarea" && <EditableInput type={type} />}
    </_Editable>
  );
};
