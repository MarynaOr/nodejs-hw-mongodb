import { SORT_ORDER } from '../constants/sortOrder.js';
import { contactsCollection } from '../db/models/contacts.js';
import { calculatePagintionData } from '../utils/parsePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const mongoSortOrder = sortOrder === SORT_ORDER.DESC ? -1 : 1;

  const filter = userId ? { userId } : {};

  const contactsCount = await contactsCollection.countDocuments(filter);

  const contacts = await contactsCollection
    .find(filter)
    .sort({ [sortBy]: mongoSortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePagintionData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactId = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const updatedContact = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: payload },
    {
      new: true,
      ...options,
    },
  );

  if (!updatedContact) return null;

  return {
    contact: updatedContact,
    isNew: false,
  };
};
