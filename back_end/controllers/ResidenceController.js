import { Residenza } from "../models/DataBase.js";
import { FailToSaveResidence, ResidenceNotFoundError, ToMnayResidenceError } from "../utils/error/index.js";

export class ResidenceController {

    static async addResidence(idUser, body) {

        let res = await Residenza.findAndCountAll({
            where: {
                UserIdUser: idUser
            }
        })

        if (res.count > 1) {
            throw new ToMnayResidenceError();
        }

        let residenza = new Residenza(
            {
                regione: body.regione,
                comune: body.comune,
                cap: body.cap,
                via: body.via,
                numeroCivico: body.numero_civico,
                UserIdUser: idUser
            }
        )


        let result = await residenza.save();

        if (!result) {
            throw new FailToSaveResidence();
        }

        return result
    }

    static async deleteResidence(residenceId) {

        let result = await Residenza.findByPk(residenceId);

        if (result != null) {
            result = result.destroy();
            return result;
        }

        throw new ResidenceNotFoundError();


    }

    static async getResidence(idUser) {
        let result = await Residenza.findAll({
            where: {
                UserIdUser: idUser
            }
        })

        if (!result) {
            throw new ResidenceNotFoundError();
        }

        return result;
    }

    static async updateResidence(residenceId, body) {
        Residenza.update(body, {
            where: {
                idResidenza: residenceId
            }

        })

    }

}