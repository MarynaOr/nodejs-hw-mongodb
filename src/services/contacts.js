import { SORT_ORDER } from '../constants/sortOrder.js';
import { contactsCollection } from '../db/models/contacts.js';
import { calculatePagintionData } from '../utils/parsePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const mongoSortOrder = sortOrder === SORT_ORDER.DESC ? -1 : 1;

  const contactsCount = await contactsCollection.countDocuments();

  const contacts = await contactsCollection
    .find()
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

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findByIdAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactsCollection.findByIdAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
