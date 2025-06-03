import { getContacts, getContactById, deleteContact, createContact, updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import {parseFilterParams} from '../utils/parseFilterParams.js'

async function getContactsController(req, res) {
// console.log(req.user)

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    
        const contacts = await getContacts({ page, perPage, sortBy, sortOrder, filter, userId: req.user.id });
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    
};

async function getContactByIdController (req, res)  {
    
        // в рек.парамс.контактИд передаємо конкактИд з посилання гетзапиту, а не просто Ид
        const contactId = req.params.contactId;
        
        const contact = await getContactById(contactId, req.user.id);

        if (contact === null) {
            // return res.status(404).send({ status: 404, message: 'Contact not found' });
            throw new createHttpError.NotFound("Contact not found");
            

    };

    if (contact.userId.toString() !== req.user.id.toString()) {
        throw new createHttpError.NotFound("Contact not found")
    }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    
};

async function deleteContactController(req, res) {
    const contactId = req.params.contactId;
    const result = await deleteContact(contactId, req.user.id);
    if (result === null) {
         throw new createHttpError.NotFound("Contact not found");
    }

    res.status(204).end()
};
async function createContactController(req, res) {
    const contact = await createContact({...req.body, userId: req.user.id});
    res.status(201).json({status: 201, message: "Successfully created a contact!", data: contact})
};
async function updateContactController(req, res) {
    const contactId = req.params.contactId;
    const result = await updateContact(contactId, req.user.id, req.body);
    if (result === null) {
        throw new createHttpError.NotFound("Contact not found");
    };
    res.json({ status: 200, message: "Successfully patched a contact!", data: result });
}

export {
    getContactsController, 
    getContactByIdController,
    deleteContactController,
    createContactController,
    updateContactController
}