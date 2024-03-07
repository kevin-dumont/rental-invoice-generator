import { format } from "date-fns";

export const dateFieldFormat = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
