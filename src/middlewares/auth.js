import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export async function authenticate(req, res, next) {
    const { authorization } = req.headers;

    if (typeof authorization !== "string") {
       next(new createHttpError.Unauthorized("Provide access token")) 
    };

    const [bearer, accessToken] = authorization.split(' ', 2);
    if (bearer !== "Bearer" || typeof accessToken !== "string") {
        next(new createHttpError.Unauthorized("Provide access token"))
    }

    const session = await Session.findOne({ accessToken });
    if (session === null) {
        next(new createHttpError.Unauthorized("Session not found"))
    };
    if (session.accessTokenValidUntil < new Date()) {
        next(new createHttpError.Unauthorized("Access token is expired"))
    };

    const user = await User.findOne({ _id: session.userId });

    if (user === null) {
        next(new createHttpError.Unauthorized("User not found"))
    };

    req.user = {id: user._id, name: user.name}
    next()
}