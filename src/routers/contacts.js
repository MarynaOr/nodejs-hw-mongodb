import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactController,
  getIdContactController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createValidationContact,
  updateValidationContact,
} from '../validation/contacts.js';
import { isValidId } from '../middleware/isValidId.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getContactController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getIdContactController),
);
router.post(
  '/contacts',
  validateBody(createValidationContact),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateValidationContact),
  ctrlWrapper(patchContactController),
);
export default router;
