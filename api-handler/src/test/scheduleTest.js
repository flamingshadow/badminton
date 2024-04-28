require("log-timestamp");
const schedule = require("node-schedule");
const bookingHandler = require("../services/bookingHandler");
const { calculateDates, delay } = require("../util/Utility");

const authRule = new schedule.RecurrenceRule();
authRule.dayOfWeek = 0;
authRule.hour = 22;
authRule.minute = 11;
authRule.second = 30;

schedule.scheduleJob(authRule, async function () {
  bookingHandler.getToken();
});

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 0;
rule.hour = 21;
rule.minute = 50;
rule.second = 10;

schedule.scheduleJob(rule, async function () {
  await Promise.all([delay(500)]);
  for (let step = 0; step < 30; step++) {
    await Promise.all([delay(20)]);
    const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
    bookingHandler.bookSlot(startDateString, endDateString);
  }
});
