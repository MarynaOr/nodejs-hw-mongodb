import { Router } from 'express';
import contactRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/student', contactRouter);
router.use('/auth', authRouter);

export default router;
