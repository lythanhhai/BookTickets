export function calculateSumHour(timeStart, arrayHours) {
  let hour = 0;
  arrayHours.forEach((item, index) => {
    hour += parseInt(item.split(":")[0]) * 60 + parseInt(item.split(":")[1]);
  });
  let result = "";
  if (
    Math.floor(
      (parseFloat(hour / 60) - Math.floor(parseFloat(hour / 60))) * 60
    ) !== 0
  ) {
    result = `${Math.floor(parseFloat(hour / 60))}h${Math.floor(
      (parseFloat(hour / 60) - Math.floor(parseFloat(hour / 60))) * 60
    )}m`;
  } else {
    result = `${Math.floor(parseFloat(hour / 60))}h`;
  }
  let times = [
    `${Math.floor(parseFloat(hour / 60))}:${
      (parseFloat(hour / 60) - Math.floor(parseFloat(hour / 60))) * 60
    }` +
      ":" +
      "00",
    timeStart,
  ];
  let sumSeconds = 0;

  times.forEach((time) => {
    let a = time.split(":");
    let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    sumSeconds += seconds;
  });

  return {
    duration: result,
    endTime: new Date(sumSeconds * 1000)
      .toISOString()
      .substr(11, 8)
      .split(":")
      .slice(0, 2)
      .join(":"),
  };
}
