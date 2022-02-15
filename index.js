const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const firebase = require("firebase");
const config = {
  apiKey: "AIzaSyBzKTcLiCbP_1cz7Kg62c4pVMPJYwgFyKQ",
  authDomain: "contactform-ecfa5.firebaseapp.com",
  projectId: "contactform-ecfa5",
  storageBucket: "contactform-ecfa5.appspot.com",
  messagingSenderId: "776425583437",
  appId: "1:776425583437:web:b08b239ac68da396b1fd04",
};
firebase.initializeApp(config);
const db = firebase.firestore();

const app = express();

dotenv.config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
  res.json({ msg: "get request" });
});

app.post("/", async function (req, res) {
  const now = new Date();
  const timeStamp = firebase.firestore.Timestamp.fromDate(now);
  const clientData = req.body;
  const { name, number, email, message } = clientData;
  const contactData = {
    createdAt: timeStamp,
    name: name,
    number: number,
    email: email,
    message: message,
  };
  await db.collection("contactDatas")
    .add(contactData)
    .then((snapshot) => {
      res.send({ msg: "post success" });
    })
    .catch((err) => {
      console.error("Error adding document");
    });
});

app.listen(process.env.PORT || 5000);

module.exports = app;
