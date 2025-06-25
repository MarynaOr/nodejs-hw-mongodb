import createHttpError from 'http-errors';
import { getAllContacts, getContactId } from '../services/contacts.js';

export const getContactController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getIdContactController = async (req, res, _next) => {
  const { contactId } = req.params;
  const contact = await getContactId(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
