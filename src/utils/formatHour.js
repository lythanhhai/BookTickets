export function formatHour(date) {
  var d = new Date(date),
    minutes = "" + d.getMinutes(),
    seconds = "" + d.getSeconds(),
    hours = d.getHours();

  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;
  if (hours.length < 2) hours = "0" + hours;

  return [hours, minutes, seconds].join(":");
}
