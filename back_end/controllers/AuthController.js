import { User, Admin } from "../models/DataBase.js";
import Jwt from "jsonwebtoken";
import { SignUpError, CredentialError } from "../utils/error/index.js";

export class AuthController {

    static async saveUser(req) {

        let user = new User(
            {
                nome: req.body.nome,
                cognome: req.body.cognome,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password
            }
        );
        let result = await user.save();

        if (!result) {
            return Promise.reject(new SignUpError());
        }

        return result;

    }

    static async checkCredentials(req) {

        let isAdmin = false;
        let foundAdmin = null;

        let user = new User({
            email: req.body.email,
            password: req.body.password
        });

        let found = await User.findOne({
            where: {
                email: user.email,
                password: user.password
            },
        }
        );

        if (found === null) {
            let foundAdmin = await Admin.findOne({
                where: {
                    email: user.email,
                    password: user.password
                },
            }
            );
            isAdmin = true;
            found = foundAdmin;
        }


        if (found === null && foundAdmin === null) {
            return Promise.reject(new CredentialError());
        }

        req.isAdmin = isAdmin;
        req.idUser = found.dataValues.idUser;

        return found !== null;
    }

    static issueToken(email, id, isAdmin) {
        return Jwt.sign({ user: email, idUser: id, admin: isAdmin }, process.env.TOKEN_SECRET, { expiresIn: `1d` });
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }


}