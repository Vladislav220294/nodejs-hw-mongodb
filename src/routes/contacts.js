import express from 'express';
import { getContactsController, getContactByIdController, deleteContactController, createContactController, updateContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';


const router = express.Router();
const jsonParser = express.json();

// router.get('/', (req, res) => {
//         res.json({ message: "Hello world" })
//     });

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
  
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.post('/', jsonParser, validateBody(contactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', isValidId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(updateContactController))


export default router;