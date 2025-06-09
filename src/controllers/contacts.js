import * as fs from 'node:fs/promises';
import path from 'node:path';
import {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

async function getContactsController(req, res) {
  // console.log(req.user)

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

async function getContactByIdController(req, res) {
  // в рек.парамс.контактИд передаємо конкактИд з посилання гетзапиту, а не просто Ид
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId, req.user.id);

  if (contact === null) {
    // return res.status(404).send({ status: 404, message: 'Contact not found' });
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

async function deleteContactController(req, res) {
  const contactId = req.params.contactId;
  const result = await deleteContact(contactId, req.user.id);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
}
async function createContactController(req, res) {
    let photo = null
    if (getEnvVar("UPLOAD_TO_CLOUDINARY") === "true") {
        const result = await uploadToCloudinary(req.file.path);
        await fs.unlink(req.file.path);
        photo = result.secure_url;
    } else {
        await fs.rename(req.file.path, path.resolve("src", "uploads", "photos", req.file.filename));
        photo = `http://localhost:3000/photos/${req.file.filename}`
}

  
  
  

  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo,
  });
  res
    .status(201)
    .json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
}
async function updateContactController(req, res) {
    let photo = null;
    if (getEnvVar("UPLOAD_TO_CLOUDINARY") === "true") {
        const result = await uploadToCloudinary(req.file.path);
        await fs.unlink(req.file.path);
        photo = result.secure_url;
    } else {
        await fs.rename(req.file.path, path.resolve("src", "uploads", "photos", req.file.filename));
        photo = `http://localhost:3000/photos/${req.file.filename}`
}



  const contactId = req.params.contactId

  const result = await updateContact(contactId, {...req.body, photo}, {
    userId: req.user.id,
  });

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  createContactController,
  updateContactController,
};
