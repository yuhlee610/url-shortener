import { TuiDay, TuiMonth } from "@taiga-ui/cdk/date-time";

export const convertTuiDayToDate = (date: TuiDay) => {
  const d = new Date();
  d.setHours(0)
  d.setMinutes(0)
  d.setDate(date.day);
  d.setMonth(date.month);
  d.setFullYear(date.year);
  return d;
};

export const convertTuiMonthToDate = (date: TuiMonth) => {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setDate(1);
  d.setMonth(date.month);
  d.setFullYear(date.year);
  return d;
};
