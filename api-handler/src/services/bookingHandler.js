require("log-timestamp");
const axios = require("axios");
let accessToken = "";

async function getToken() {
  const url = "https://api.helloclub.com/auth/token";
  const data = {
    username: process.argv[2],
    password: process.argv[3],
    clientId: "helloclub-client",
    grantType: "password",
  };
  await axios
    .post(url, data)
    .then((response) => {
      console.log("token:", response.data);
      accessToken = "Bearer " + response.data.access_token;
    })
    .catch((error) => {
      console.error("error:", error.response.data);
    });
}

async function bookSlot(startDate, endDate) {
  const url = "https://api.helloclub.com/booking";
  let data = "";
  console.log("Creating booking for:", startDate, endDate, accessToken);
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
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    )
    .then((response) => {
      console.log("booking outcome:", response.data);
      data = response.data;
    })
    .catch((error) => {
      console.error("error:", error.response.data.message);
      data = error.data;
    });
  return data;
}

async function getBooking() {
  const url =
    "https://api.helloclub.com/booking?fromDate=2024-04-14T12:00:00.000Z&limit=5&offset=0&toDate=2024-04-15T11:59:59.999Z";
  let data = "";
  await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
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

module.exports = { getBooking, bookSlot, getToken };

//Raush: 5e4e11c39c477d000442a3de
//Raj: 65c7512e55b6b53110ca8418
//Area - Court 1: 5aadd66e87c6b800048a290d
//Mode - Stadium Pass Singles: 615fcc5a03fdff65ad87ada7
//Mode - Stadium Pass Doubles: 615fcc9db35243a097257517
//Activity - North City Badminton: 5aadd66e87c6b800048a2908

/*
{"members":["65c7512e55b6b53110ca8418","5e4e11c39c477d000442a3de"],
"area":"5aadd66e87c6b800048a290f",
"activity":"5aadd66e87c6b800048a2908",
"startDate":"2024-05-02T11:30:00.000Z",
"endDate":"2024-05-02T12:00:00.000Z",
"mode":"615fcc5a03fdff65ad87ada7",
"recurrence":null,
"visitors":[],
"sendConfirmationEmail":true,
"forOthers":false,
"reminderTime":30}
*/
