import { format } from "date-fns";

export enum DateFormats {
  DAT_LETTER_MONTH_TIME = "Lo LLLL k:mm y",
}

export const dateFormat = (
  time: number | Date | string,
  dateFormat: keyof typeof DateFormats
) => {
  return format(new Date(time), DateFormats[dateFormat]);
};
