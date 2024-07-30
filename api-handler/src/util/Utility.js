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

  return [startDateString, endDateString];
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function randomPartner() {
  let partnerList = [
    "624515e1151d58b0c4624145",
    "61a7d03b8418829fd20e6852",
    "61a94ef112f52d842d7faba3",
    "6316fafd57ec9e4ffda9618d",
    "5e0f09c233c2370004dcc526",
  ];
  return partnerList[Math.floor(Math.random() * partnerList.length)];
}

function randomCourt() {
  let courtList = [
    "5aadd66e87c6b800048a290d",
    "5aadd66e87c6b800048a290e",
    "5aadd66e87c6b800048a290f",
    "5aadd66e87c6b800048a2910",
    "5aadd66e87c6b800048a2911",
    "5aadd66e87c6b800048a2912",
  ];
  return courtList[Math.floor(Math.random() * courtList.length)];
}

//const [a, b] = calculateDates(21, 30, 22);
//console.log(a, b);
module.exports = { calculateDates, delay, randomCourt, randomPartner };
