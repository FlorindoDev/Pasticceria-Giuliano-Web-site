import { User } from "../models/DataBase.js"
import { UserNotFoundError, FailToUpdateUser } from "../utils/error/index.js";

export class UsersController {

    static async deleteUser(iduser) {
        let result = await User.findByPk(iduser);

        result = result.destroy();

        return result;

    }

    static async getAllUsers(pageSize, page, emptyCheck = true) {
        let result = await User.findAll({
            attributes: ['idUser', 'nickName', 'email', 'profilePic', 'createdAt', 'updatedAt'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });

        if (emptyCheck && result.length === 0) {
            return Promise.reject(new UserNotFoundError());
        }

        return result;

    }

    static async getUserFromId(id, emptyCheck = true) {
        let result = await User.findByPk(id, {
            attributes: ['idUser', 'nickName', 'email', 'profilePic', 'createdAt', 'updatedAt'],
        });

        if (emptyCheck && result === null) {
            return Promise.reject(new UserNotFoundError());
        }

        return result;

    }

    static async updateProfilePic(id, link) {
        let result = await User.update(
            {
                profilePic: link
            },
            {
                where: {
                    idUser: id
                }
            }
        );

        if (result[0] == 0) {
            return Promise.reject(new FailToUpdateUser());
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

        if (req.body.nickName) changes.nickName = req.body.nickName

        if (req.body.password) changes.password = req.body.password

        if (req.body.email) changes.password = req.body.password

        return changes;

    }

}