import { format } from "date-fns";

export const getFormattedDate = (date) => format(date, "yyyy-MM-dd");