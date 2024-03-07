export type GenericInputEvent = {
  currentTarget: {
    value: string;
  };
};

export type GenericInputOnChange = (e: GenericInputEvent) => void;
