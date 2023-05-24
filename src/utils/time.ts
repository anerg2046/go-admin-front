import daysj from "dayjs";

/** 返回格式化的时间，如果出错返回一个默认值 */
export const TimeDefault = (
  date: string,
  format?: string,
  defaultString?: string
) => {
  if (!defaultString) {
    defaultString = "/";
  }
  if (date == undefined || date == "") {
    return defaultString;
  }
  if (!format) {
    format = "YYYY-MM-DD";
  }

  const t = daysj(new Date(date));
  if (t.year() == 1 || t.year() == 0) {
    return defaultString;
  }
  return t.format(format);
};
