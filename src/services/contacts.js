import { Contact } from "../models/contact.js";

export async function getContacts() {
    return await Contact.find();
    
   
    
};
export async function getContactById(contactId) {
    return await Contact.findById(contactId);
    
};

export async function deleteContact(contactId) {
    return await Contact.findByIdAndDelete(contactId);
    
};

export async function createContact(payload) {
    return await Contact.create(payload);
};

export async function updateContact(contactId, payload) {
    return await Contact.findByIdAndUpdate(contactId, payload, {new: true});
    
};