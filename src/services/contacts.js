import { contactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactId = async (contactId) => {
  const contact = contactsCollection.findById(contactId);
  return contact;
};
