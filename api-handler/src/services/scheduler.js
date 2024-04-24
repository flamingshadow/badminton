const schedule = require("node-schedule");
const bookingHandler = require("./bookingHandler");
const { calculateDates } = require("../util/Utility");

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [2, 4];
rule.hour = 6;
rule.minute = 59;
rule.second = [new schedule.Range(57, 59)];

const job1 = schedule.scheduleJob(rule, function () {
  if (new Date().getDay() == 2) {
    const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
    bookingHandler.postBooking(startDateString, endDateString);
  } else if (new Date().getDay() == 4) {
    const { startDateString, endDateString } = calculateDates(21, 30, 22, 30);
    bookingHandler.postBooking(startDateString, endDateString);
  }
});

const rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [2, 4];
rule2.hour = 7;
rule2.minute = 0;
rule2.second = [new schedule.Range(0, 5)];

const job2 = schedule.scheduleJob(rule2, function () {
  if (new Date().getDay() == 2) {
    const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
    bookingHandler.postBooking(startDateString, endDateString);
  } else if (new Date().getDay() == 4) {
    const { startDateString, endDateString } = calculateDates(21, 30, 22, 30);
    bookingHandler.postBooking(startDateString, endDateString);
  }
});

//startDate: "2024-04-30T11:30:00.000Z",
//sndDate: "2024-04-30T12:00:00.000Z",
