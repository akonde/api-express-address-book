const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contacts = require("../data/contacts");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

// get all contacts
app.get("/contacts", function (req, res) {
  res.status(200).json({
    contacts,
  });
});

// add  a new contact
app.post("/contacts", function (req, res) {
  const { firstName, lastName, street, city, type, email, linkedin, twitter } =
    req.body;
  if (
    !(firstName || !lastName || !street || !city || !type ||  !email || !linkedin || !twitter)
  ) {
    res.json({
      message: "all are required!",
    });
  }

  const newContact = {
    id: contacts.length + 1,
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter,
  };

  contacts.push(newContact);

  res.status(201).json({
    message: "New Contact Added!",
    contact: newContact,
  });
});

module.exports = app;
