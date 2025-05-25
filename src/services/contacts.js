import { Contact } from "../models/contact.js";

export async function getContacts({ page, perPage, sortBy, sortOrder, filter }) {
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();
    if (filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== 'undefined' ) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

    const [total, contacts] = await Promise.all([Contact.countDocuments(contactQuery), contactQuery.sort({[sortBy]:sortOrder}).skip(skip).limit(perPage)]);
    const totalPages = Math.ceil(total / perPage);
    return {
        data: contacts,
        page,
        perPage,
        totalItems: total,
        totalPages,
        hasNextPage: totalPages > page,
        hasPreviousPage: page>1
    };
    
   
    
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