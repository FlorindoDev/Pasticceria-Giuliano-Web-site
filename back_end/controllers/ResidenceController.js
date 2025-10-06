import { Residenza } from "../models/DataBase.js";
import { FailToSaveResidence, ResidenceNotFoundError } from "../utils/error/index.js";

export class ResidanceController {

    static async addResidance(req) {

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

    static async deleteResidance(req) {

        let result = await Residenza.findByPk(req.params.residenceId);

        if (result != null) {
            result = result.destroy();
            return result;
        }

        throw new ResidenceNotFoundError();


    }

    static getResidance() {

    }

}