require("log-timestamp");

function calculateDates(
  startHour = 0,
  startMinutes = 0,
  endHour = 0,
  endMinutes = 0
) {
  const startDate = new Date();
  startDate.setDate(new Date().getDate() + 7);
  startDate.setHours(startHour);
  startDate.setMinutes(startMinutes);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  const startDateString = startDate.toISOString();

  const endDate = new Date();
  endDate.setDate(new Date().getDate() + 7);
  endDate.setHours(endHour);
  endDate.setMinutes(endMinutes);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);
  const endDateString = endDate.toISOString();

  return { startDateString, endDateString };
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//console.log(calculateDates(20, 30, 22, 0));
module.exports = { calculateDates, delay };
