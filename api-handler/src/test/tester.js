const express = require("express");
const bookingHandler = require("../services/bookingHandler");

const app = express();
const port = 3001;

app.get("/slots", async (req, res) => {
  const data = await bookingHandler.getBooking();
  console.log("data:", data);
  res.json(data);
});

app.get("/book", async (req, res) => {
  const data = await bookingHandler.bookSlot();
  console.log("booking outcome:", data);
  res.json(data);
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
