
import { format } from "date-fns";

export const formatDateToYYYYMMDD = (date: Date | string): string => {
  const dateObj = new Date(date);
  return format(dateObj, 'yyyy-MM-dd');
};