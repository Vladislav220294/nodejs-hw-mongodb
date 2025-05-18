import express from 'express';
import { getContactsController, getContactByIdController, deleteContactController, createContactController, updateContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = express.Router();
const jsonParser = express.json();

// router.get('/', (req, res) => {
//         res.json({ message: "Hello world" })
//     });

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));
  
router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController))


export default router;