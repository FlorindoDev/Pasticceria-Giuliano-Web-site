import { AuthController } from "../controllers/AuthController.js";
import { UnauthorizedError, ForbbidenError } from "../utils/error/index.js";


export function enforceAuthentication(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1];
    if (!token) {
        next(new UnauthorizedError());
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if (err) {
            return next(new UnauthorizedError());
        } else {
            req.email_in_token = decodedToken.user;
            req.idUser = decodedToken.idUser;
            req.isAdmin = decodedToken.admin;
            next();
        }
    });
}

export function isOwnProfile(req, res, next) {

    if (req.idUser != req.params.id) return next(new ForbbidenError());

    next();

}

export let isUserAdmin = (req, res, next) => {
    req.isAdmin ? next() : next(new UnauthorizedError());
    return;

}

export let isNotUserAdmin = (req, res, next) => {
    !req.isAdmin ? next() : next(new UnauthorizedError());
    return;

}


