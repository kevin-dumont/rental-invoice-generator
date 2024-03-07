import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type FormInputProps = {
  label: ReactNode;
} & Pick<InputProps, "value" | "onChange" | "type">;

export const FormInput = ({ label, ...inputProps }: FormInputProps) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input {...inputProps} />
  </FormControl>
);
