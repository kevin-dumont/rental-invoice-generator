import { format } from "date-fns";

export const dateDisplayFormat = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};
