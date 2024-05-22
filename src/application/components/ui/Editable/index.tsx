import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Editable as _Editable,
  EditableInput,
  EditableInputProps,
  EditablePreview,
  EditableProps,
  EditableTextarea,
  Select,
  useBoolean,
  IconButton,
  useEditableControls,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  ComponentProps,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

interface Editable<T>
  extends Omit<
    EditableProps,
    "value" | "onEdit" | "onCancel" | "onSubmit" | "onChange" | "isDisabled"
  > {
  value: T;
  onChange: (value: string) => void;
  disabled?: boolean;
  render?: (value: T) => ReactNode | string;
  type?: EditableInputProps["type"] | "textarea" | "select";
  options?: { label: string; value: string }[]; // Options for the select dropdown
}

export const Editable = <T,>({
  value,
  onChange,
  render = (v) => `${v}`,
  disabled,
  type,
  options = [],
  ...rest
}: Editable<T>) => {
  const [isEditing, setIsEditing] = useBoolean();
  const [internalValue, setInternalValue] = useState(`${value}`);

  useEffect(() => {
    setInternalValue(`${value}`);
  }, [value]);

  const formattedValue = isEditing ? internalValue : render(value);

  const onSubmit = ((nextValue: string) => {
    onChange(nextValue);
    setIsEditing.off();
  }) as ComponentProps<typeof _Editable>["onSubmit"];

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
      {type === "select" && (
        <EditableInput as={EditableSelect} options={options} />
      )}
      {type !== "textarea" && type !== "select" && (
        <EditableInput type={type} />
      )}
    </_Editable>
  );
};

const EditableSelect = ({
  value,
  onChange,
  options = [],
}: {
  value: string;
  onChange: (value: SyntheticEvent) => void;
  options?: { label: string; value: string }[];
}) => {
  const { getSubmitButtonProps, getCancelButtonProps, isEditing } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup size="sm">
      <Select value={value} onChange={onChange} size="sm">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <IconButton
        aria-label="Save"
        icon={<EditIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Cancel"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
};
