function calculateDates(startHour = 0, startMinutes = 0) {
  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinutes);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  const startDateString = startDate.toISOString();

  const endDate = new Date();
  endDate.setHours(startHour + 1);
  endDate.setMinutes(startMinutes);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);
  const endDateString = endDate.toISOString();

  return { startDateString, endDateString };
}

module.exports = { calculateDates };
