import { User } from "../models/DataBase.js"
import { UserNotFoundError } from "../utils/error/index.js";

export class UsersController {

    static async deleteUser(iduser) {
        let result = await User.findByPk(iduser);

        result = result.destroy();

        return result;

    }


    static async getUserFromId(id, emptyCheck = true) {
        let result = await User.findByPk(id, {
            attributes: ['idUser', 'nome', 'cognome', 'email', 'telefono', 'createdAt', 'updatedAt'],
        });

        if (emptyCheck && result === null) {
            return Promise.reject(new UserNotFoundError());
        }

        return result;

    }


    static async updateUser(id, changes) {

        let result = await User.update(changes, {
            where: {
                idUser: id
            }
        })

        return result;

    }

    static changesObject(req) {

        let changes = {}

        if (req.body.nome) changes.nome = req.body.nome

        if (req.body.cognome) changes.cognome = req.body.cognome

        if (req.body.telefono) changes.telefono = req.body.telefono

        if (req.body.password) changes.password = req.body.password

        if (req.body.email) changes.password = req.body.password

        return changes;

    }

}