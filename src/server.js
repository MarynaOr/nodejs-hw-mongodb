import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
// import contactsRouter from './routers/contacts.js';
import contactIdRouter from './routers/contacts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 3000;
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
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
  app.use(router);
  app.use(contactIdRouter);
  app.use(errorHandler);
  app.use(notFoundHandler);

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
