const axios = require("axios");

const axiosHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM3NTEyZTU1YjZiNTMxMTBjYTg0MTgiLCJpYXQiOjE3MTM5NTQ2MzAsImV4cCI6MTcxNDA0MTAzMH0.0DmwkWSli0oAN5LSM9jltoicoEM5ksXuY4rl1dTNr_s",
  },
};

async function getBooking() {
  const url =
    "https://api.helloclub.com/booking?fromDate=2024-04-14T12:00:00.000Z&limit=5&offset=0&toDate=2024-04-15T11:59:59.999Z";
  let data = "";
  await axios
    .get(url, axiosHeaders)
    .then((response) => {
      console.log(response.data);
      data = response.data;
    })
    .catch((error) => {
      console.error(error);
      data = error;
    });
  return data;
}

async function postBooking(startDate, endDate) {
  const url = "https://api.helloclub.com/booking";
  let data = "";
  console.log("posting booking", startDate, endDate);
  await axios
    .post(
      url,
      {
        members: ["65c7512e55b6b53110ca8418", "5e4e11c39c477d000442a3de"],
        area: "5aadd66e87c6b800048a290d",
        activity: "5aadd66e87c6b800048a2908",
        startDate: startDate,
        endDate: endDate,
        mode: "615fcc5a03fdff65ad87ada7",
        recurrence: null,
        visitors: [],
        sendConfirmationEmail: false,
        forOthers: false,
        reminderTime: 30,
      },
      axiosHeaders
    )
    .then((response) => {
      console.log(response.data);
      data = response.data;
    })
    .catch((error) => {
      console.error(error);
      data = error;
    });
  return data;
}

module.exports = { getBooking, postBooking };

//Raush: 5e4e11c39c477d000442a3de
//Raj: 65c7512e55b6b53110ca8418
//Area - Court 1: 5aadd66e87c6b800048a290d
//Mode - Stadium Pass Singles: 615fcc5a03fdff65ad87ada7
//Mode - Stadium Pass Doubles: 615fcc9db35243a097257517
//Activity - North City Badminton: 5aadd66e87c6b800048a2908
