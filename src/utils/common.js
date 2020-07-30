export function convertDateToMonthDayFormat(date) {
  if (!Intl || !Intl.DateTimeFormat) {
    return date.toString();
  }
  const formatter = new Intl.DateTimeFormat(`en-US`, {
    month: `long`,
    day: `numeric`
  });

  return formatter.format(date);
}

export const noop = () => {
  // do nothing
};


