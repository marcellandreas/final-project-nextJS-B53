export function FormatDate(dateString) {
  const dateObject = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[dateObject.getDay()];
  const month = months[dateObject.getMonth()];
  const date = dateObject.getDate();
  const year = dateObject.getFullYear();

  return `${dayOfWeek} ${month} ${date} ${year}`;
}
