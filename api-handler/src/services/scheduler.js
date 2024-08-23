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
authRule.dayOfWeek = [2, 4, 6];
authRule.hour = 6;
authRule.minute = 50;
authRule.second = 0;

schedule.scheduleJob(authRule, async function () {
  bookingHandler.getToken();
});

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [2, 4, 6];
rule.hour = 6;
rule.minute = 59;
rule.second = 59;

schedule.scheduleJob(rule, async function () {
  /* if (new Date().getDay() == 2) {
    await Promise.all([delay(850)]);
    for (let step = 0; step < 5; step++) {
      await Promise.all([delay(30)]);
      const [startDateString, endDateString] = calculateDates(21, 0, 21, 30);
      bookingHandler.bookSlot(startDateString, endDateString);
      const [startDate2String, endDate2String] = calculateDates(21, 30, 22, 0);
      bookingHandler.bookSlot(startDate2String, endDate2String);
    }
  } else if (new Date().getDay() == 4) {
    await Promise.all([delay(850)]);
    for (let step = 0; step < 5; step++) {
      await Promise.all([delay(30)]);
      const [startDateString, endDateString] = calculateDates(21, 30, 22, 0);
      bookingHandler.bookSlot(startDateString, endDateString);
      const [startDate2String, endDate2String] = calculateDates(22, 0, 22, 30);
      bookingHandler.bookSlot(startDate2String, endDate2String);
    }
  } else if (new Date().getDay() == 6) { */
  if ([6, 7].includes(new Date().getDay())) {
    bookingHandler.setPartnerCourt();
    const [startDateString, endDateString] = calculateDates(7, 0, 8, 0);
    const [startDate2String, endDate2String] = calculateDates(8, 0, 9, 0);
    await Promise.all([delay(850)]);
    for (let step = 0; step < 5; step++) {
      await Promise.all([delay(30)]);
      bookingHandler.bookRandomSlot(startDateString, endDateString);
      bookingHandler.bookRandomSlot(startDate2String, endDate2String);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//startDate: "2024-04-30T11:30:00.000Z",
//sndDate: "2024-04-30T12:00:00.000Z",
