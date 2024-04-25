require("log-timestamp");
const express = require("express");
const bookingHandler = require("../services/bookingHandler");
const { calculateDates, delay } = require("../util/Utility");

const app = express();
const port = 3001;

app.get("/slots", async (req, res) => {
  const data = await bookingHandler.getBooking();
  console.log("data:", data);
  res.json(data);
});

app.get("/book", async (req, res) => {
  for (let step = 0; step < 22; step++) {
    await Promise.all([delay(50)]);
    const { startDateString, endDateString } = calculateDates(20, 30, 22, 0);
    bookingHandler.bookSlot(startDateString, endDateString);
  }
  res.json("done");
});

app.get("/token", async (req, res) => {
  const token = await bookingHandler.getToken();
  console.log("token:", token);
  res.json(token);
});

app.get("/date", (req, res) => {
  const newDate = new Date();
  newDate.setHours(7);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  console.log("new date:", newDate.toString());
  console.log("new date:", newDate.toUTCString());
  console.log("new date:", newDate.toISOString());
  res.json(newDate);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
