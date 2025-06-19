import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactId } from './services/contacts.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({
      message: `${new Date().toLocaleString()}`,
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      data: contacts,
      message: 'Successfully found contacts!',
    });
  });
  app.get('/contacts/:contactId', async (req, res, _next) => {
    const { contactId } = req.params;
    const contact = await getContactId(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      data: contact,
      message: 'Successfully found contact with id {contactId}!',
    });
    return;
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, _next) => {
    console.log(err.stack);

    res.status(500).json({ message: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
  });
};
