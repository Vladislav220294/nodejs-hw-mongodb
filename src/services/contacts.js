import { Contact } from "../models/contact.js";

export async function getContacts({ page, perPage, sortBy, sortOrder, filter, userId }) {
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();
    contactQuery.where('userId').equals(userId)
    if (filter.contactType ) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite ) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

    const [total, contacts] = await Promise.all([Contact.countDocuments(contactQuery), contactQuery.sort({[sortBy]:sortOrder}).skip(skip).limit(perPage)]);
    const totalPages = Math.ceil(total / perPage);
    return {
        data: contacts,
        page,
        perPage,
        total,
        totalPages,
        hasNextPage: totalPages > page,
        hasPreviousPage: page>1
    };
    
   
    
};
export async function getContactById(contactId, userId) {
    return await Contact.findOne({ _id: contactId, userId });
    
};

export async function deleteContact(contactId, userId) {
    return await Contact.findOneAndDelete({ _id: contactId, userId });
    
};

export async function createContact(payload) {
    return await Contact.create(payload);
};

export async function updateContact(contactId, payload, options = {}) {
    const { userId } = options;
    return await Contact.findOneAndUpdate({_id: contactId,  userId }, payload, {
      new: true
    });
    
};