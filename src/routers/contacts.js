import { Router } from 'express';
import {
  getContactController,
  getIdContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getContactController));
router.get('/contacts/:contactId', ctrlWrapper(getIdContactController));
export default router;
