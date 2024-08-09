require("log-timestamp");
const { randomCourt, randomPartner } = require("../util/Utility");
const axios = require("axios");
let accessToken = "";
let partner = "";
let court = "";

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
      console.error("error:", error.response);
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

function setPartnerCourt() {
  partner = randomPartner();
  court = randomCourt();
}

async function bookRandomSlot(startDate, endDate) {
  const url = "https://api.helloclub.com/booking";
  let data = "";
  console.log("Creating booking for:", startDate, endDate, accessToken);
  //let partner = randomPartner();
  //let court = randomCourt();
  await axios
    .post(
      url,
      {
        members: ["65c7512e55b6b53110ca8418", partner],
        area: court,
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

async function bookDoublesSlot(startDate, endDate) {
  const url = "https://api.helloclub.com/booking";
  let data = "";
  console.log("Creating booking for:", startDate, endDate, accessToken);
  await axios
    .post(
      url,
      {
        members: [
          "65c7512e55b6b53110ca8418",
          "61a94ef112f52d842d7faba3",
          "624515e1151d58b0c4624145",
          "61a7d03b8418829fd20e6852",
        ],
        area: "5aadd66e87c6b800048a2911",
        activity: "5aadd66e87c6b800048a2908",
        startDate: startDate,
        endDate: endDate,
        mode: "615fcc9db35243a097257517",
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

module.exports = {
  getBooking,
  bookSlot,
  bookDoublesSlot,
  getToken,
  bookRandomSlot,
  setPartnerCourt,
};

//Raush: 5e4e11c39c477d000442a3de
//Raj: 65c7512e55b6b53110ca8418
//Sameer: 624515e1151d58b0c4624145
//Sahil: 61a7d03b8418829fd20e6852
//Sanjay: 61a94ef112f52d842d7faba3
//Gunjal: 6316fafd57ec9e4ffda9618d
//Lovesh: 5e0f09c233c2370004dcc526
//Area - Court 1: 5aadd66e87c6b800048a290d,
//Area - Court 2: 5aadd66e87c6b800048a290e,
//Area - Court 3: 5aadd66e87c6b800048a290f,
//Area - Court 4: 5aadd66e87c6b800048a2910,
//Area - Court 5: 5aadd66e87c6b800048a2911,
//Area - Court 6: 5aadd66e87c6b800048a2912,
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
