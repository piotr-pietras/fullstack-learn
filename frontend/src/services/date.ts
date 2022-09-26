import { format } from "date-fns";

export enum DateFormats {
  DAY_LETTER_MONTH_TIME = "Lo LLLL k:mm y",
}

export const dateFormat = (
  time: number | Date | string,
  dateFormat: DateFormats
) => {
  return format(new Date(time), dateFormat);
};
