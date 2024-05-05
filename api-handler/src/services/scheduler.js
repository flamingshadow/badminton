require("log-timestamp");
const schedule = require("node-schedule");
const express = require("express");
const bookingHandler = require("./bookingHandler");
const { calculateDates, delay } = require("../util/Utility");

const app = express();
const port = 3000;

app.get("/token", async (req, res) => {
  bookingHandler.getToken();
  res.json({ done: "done" });
});

const authRule = new schedule.RecurrenceRule();
authRule.dayOfWeek = [2, 4];
authRule.hour = 6;
authRule.minute = 50;
authRule.second = 0;

schedule.scheduleJob(authRule, async function () {
  bookingHandler.getToken();
});

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [2, 4];
rule.hour = 6;
rule.minute = 59;
rule.second = 59;

schedule.scheduleJob(rule, async function () {
  if (new Date().getDay() == 2) {
    await Promise.all([delay(500)]);
    for (let step = 0; step < 30; step++) {
      await Promise.all([delay(20)]);
      const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  } else if (new Date().getDay() == 4) {
    await Promise.all([delay(500)]);
    for (let step = 0; step < 30; step++) {
      await Promise.all([delay(20)]);
      const { startDateString, endDateString } = calculateDates(21, 30, 22, 30);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* const rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [2, 4];
rule2.hour = 7;
rule2.minute = 0;
rule2.second = 0;

schedule.scheduleJob(rule2, async function () {
  if (new Date().getDay() == 2) {
    for (let step = 0; step < 25; step++) {
      const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  } else if (new Date().getDay() == 4) {
    for (let step = 0; step < 25; step++) {
      const { startDateString, endDateString } = calculateDates(21, 30, 22, 30);
      bookingHandler.bookSlot(startDateString, endDateString);
    }
  }
}); */

//startDate: "2024-04-30T11:30:00.000Z",
//sndDate: "2024-04-30T12:00:00.000Z",
