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
    !(
      firstName ||
      !lastName ||
      !street ||
      !city ||
      !type ||
      !email ||
      !linkedin ||
      twitter
    )
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

// Get conatct by ID
app.get("/contacts/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);

  const contact = contacts.find(function (contact) {
    return contact.id === id;
  });

  res.status(200).json({
    contact,
  });
});

// Delete contact by ID
app.delete("/contacts/:id", function (req, res) {
  const id = parseInt(req.params.id);

  // delete user from array
  contacts = contacts.filter(function (user) {
    return contacts.id !== id
  })


  res.status(200).json({
    message: `Deleted user ${id} successfully`,
    contacts
  })

})

// update contact by ID
app.put("/contacts/:id", function (req,  res) {
  const id = (req.params.id,  10)
  const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body;

})

if (!firstName || !lastName || !street || !city || !type || !email || !linkedin || !twitter) {
  return res.status(400).json({
    message: "All fields are required!",
  });
}


const updatedContact = {
  id,
  firstName,
  lastName,
  street,
  city,
  type,
  email,
  linkedin,
  twitter,
};

contacts[contactIndex] = updatedContact;
const contactIndex = contacts.find(function (contact) {
  return contact.id === id;
});
res.status(200).json({
  message: "Contact Updated!",
  contact: updatedContact,
});

module.exports = app;
