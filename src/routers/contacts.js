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
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactController));
router.get('/:contactId', isValidId, ctrlWrapper(getIdContactController));
router.post(
  '/',
  validateBody(createValidationContact),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/:contactId', isValidId, ctrlWrapper(upsertContactController));
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateValidationContact),
  ctrlWrapper(patchContactController),
);
export default router;
