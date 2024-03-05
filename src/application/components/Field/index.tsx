import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type FieldProps = {
  label: ReactNode;
} & Pick<InputProps, "value" | "onChange" | "type">;

export const Field = ({ label, ...inputProps }: FieldProps) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input {...inputProps} />
  </FormControl>
);
