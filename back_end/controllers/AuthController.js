import { User } from "../models/DataBase.js";
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
            return Promise.reject(new CredentialError());
        }

        req.idUser = found.dataValues.idUser;

        return found !== null;
    }

    static issueToken(email, id) {
        return Jwt.sign({ user: email, idUser: id }, process.env.TOKEN_SECRET, { expiresIn: `1d` });
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }


}