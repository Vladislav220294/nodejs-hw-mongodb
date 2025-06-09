import express from 'express';
import path from "node:path"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pino from 'pino-http';
import routes from './routes/contacts.js';
import authRoutes from './routes/auth.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authenticate } from './middlewares/auth.js';

export async function setupServer() {
  const PORT = 3000;
  const app = express();
  app.use('/photos', express.static(path.resolve("src", "uploads", "photos")))
app.use(cookieParser())
  // app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );
  app.use('/auth', authRoutes);
  app.use('/contacts', authenticate, routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server started on port ${PORT}`);
  });

  
}
