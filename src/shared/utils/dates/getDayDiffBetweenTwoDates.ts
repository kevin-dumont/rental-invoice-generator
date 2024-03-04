import { differenceInDays } from 'date-fns';

export function getDayDiffBetweenTwoDates(dateA: Date, dateB: Date) {
  return differenceInDays(dateA, dateB);
}
