import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
// import { getContactId } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import contactIdRouter from './routers/contacts.js';
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
  app.use(contactsRouter);
  app.use(contactIdRouter);
  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();
  //   res.status(200).json({
  //     status: 200,
  //     message: 'Successfully found contacts!',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   const contact = await getContactId(contactId);

  //   if (!contact) {
  //     return res.status(404).json({
  //       status: 404,
  //       message: 'Contact not found',
  //     });
  //   }

  //   res.status(200).json({
  //     status: 200,
  //     message: `Successfully found contact with id ${contactId}!`,
  //     data: contact,
  //   });
  // });
  app.use((req, res) => {
    res.json({
      status: 404,
      message: 'Not found',
    });
  });

  app.use((err, req, res, _next) => {
    console.log(err.stack);

    res.json({
      status: 500,
      message: 'Internal Server Error',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
  });
};
