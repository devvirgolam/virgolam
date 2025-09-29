const Contact = require("../models/mongo/Contact");
const { v4: uuidv4 } = require("uuid");

exports.submitContact = async (req, res) => {
  const { name, email, phoneNumber, message, city, state, country, pincode } =
    req.body;
  const contact = await Contact.create({
    _id: uuidv4(),
    name,
    email,
    phoneNumber,
    message,
    city,
    state,
    country,
    pincode,
    notified: false,
  });
  res.status(201).json(contact);
};

exports.listContacts = async (req, res) => {
  const contacts = await Contact.find().lean();
  res.json(contacts);
};
