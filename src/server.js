import { Contact } from './models/contact.js';
import express from 'express';
import cors from "cors";
import pino from "pino-http";
import { getContacts, getContactById } from './services/contacts.js';

export async function setupServer() {
  const PORT = 3000;
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    app.use(pino({
    transport: {target: 'pino-pretty',},
  }),
    );
    app.get('/', (req, res) => {
        res.json({ message: "Hello world" })
    });
    app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});
    
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server started on port ${PORT}`);
  });
    
    

  app.get('/contacts', async (req, res) => {
    try {
        const contacts = await getContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      throw error;
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (contact === null) {
        return res.status(404).send({ message: 'Not found' });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      throw error;
    }
  });
    
    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found'
        })
    });
    
}
