require("log-timestamp");
const schedule = require("node-schedule");
const bookingHandler = require("../services/bookingHandler");
const { calculateDates, delay } = require("../util/Utility");

const authRule = new schedule.RecurrenceRule();
authRule.dayOfWeek = 4;
authRule.hour = 14;
authRule.minute = 39;
authRule.second = 0;

schedule.scheduleJob(authRule, async function () {
  bookingHandler.getToken();
});

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 4;
rule.hour = 14;
rule.minute = 39;
rule.second = 10;

schedule.scheduleJob(rule, async function () {
  if (new Date().getDay() == 2) {
    for (let step = 0; step < 25; step++) {
      await Promise.all([delay(50)]);
      const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  } else if (new Date().getDay() == 4) {
    for (let step = 0; step < 25; step++) {
      await Promise.all([delay(50)]);
      const { startDateString, endDateString } = calculateDates(21, 30, 22, 30);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  }
});
