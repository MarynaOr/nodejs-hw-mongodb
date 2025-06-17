import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
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
