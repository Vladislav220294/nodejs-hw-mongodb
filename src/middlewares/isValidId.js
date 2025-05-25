import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export function isValidId(req, res, next) {
    if (isValidObjectId(req.params.contactId) !== true) {
        return next(createHttpError.BadRequest('id should be an objectID'))
    }
    
    next()
}