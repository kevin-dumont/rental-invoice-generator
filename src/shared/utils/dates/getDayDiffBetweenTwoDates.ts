import { differenceInDays, startOfDay } from "date-fns";

export function getDayDiffBetweenTwoDates(dateA: Date, dateB: Date) {
  return differenceInDays(startOfDay(dateA), startOfDay(dateB));
}
