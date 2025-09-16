const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModel");
// @des Get all contact
// @route Get
// @Access Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();
  res.status(200).json(contacts);
});

// @des Create contact
// @route Post
// @Access Public
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, emailId, phone } = req.body;
  if (!name || !emailId || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contacts.create({
    name,
    email: emailId,
    phone,
  });
  res.status(200).json(contact);
});
// @des get contact
// @route Get api/contact/:id
// @Access Public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Page not found");
  }
  res.status(200).json(contact);
});

// @des Update contact
// @route PUT api/contact/:id
// @Access Public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Page not found");
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});
// @des Delete contact
// @route DELETE api/contact/:id
// @Access Public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Page not found");
  }
  await Contacts.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
