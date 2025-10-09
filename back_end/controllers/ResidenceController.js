import { Residenza } from "../models/DataBase.js";
import { FailToSaveResidence, ResidenceNotFoundError, ToMnayResidenceError } from "../utils/error/index.js";

export class ResidenceController {

    static async addResidence(req) {

        let res = await Residenza.findAndCountAll({
            where: {
                UserIdUser: req.idUser
            }
        })

        if (res.count > 3) {
            throw new ToMnayResidenceError();
        }

        let residenza = new Residenza(
            {
                regione: req.body.regione,
                comune: req.body.comune,
                cap: req.body.cap,
                via: req.body.via,
                numeroCivico: req.body.numero_civico,
                UserIdUser: req.idUser
            }
        )


        let result = await residenza.save();

        if (!result) {
            throw new FailToSaveResidence();
        }

        return result
    }

    static async deleteResidence(req) {

        let result = await Residenza.findByPk(req.params.residenceId);

        if (result != null) {
            result = result.destroy();
            return result;
        }

        throw new ResidenceNotFoundError();


    }

    static async getResidence(req) {
        let result = await Residenza.findAll({
            where: {
                UserIdUser: req.idUser
            }
        })

        if (!result) {
            throw new ResidenceNotFoundError();
        }

        return result;
    }

}