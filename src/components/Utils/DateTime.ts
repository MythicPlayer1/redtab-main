const parseDateTime = (dateStr: string, timeStr: string): Date => {
  const [day, month, year] = dateStr.split("-");
  const [hours, minutes] = timeStr.split(":");
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
};

interface Card {
  date: string;
  time: string;
}

export const CardArrangeMent = (a: Card, b: Card): number => {
  return parseDateTime(b.date, b.time).getTime() - parseDateTime(a.date, a.time).getTime();
};
