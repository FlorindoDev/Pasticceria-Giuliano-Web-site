import { z } from "zod";
import { unionChecks } from "../schemas/utils.schema.js";
import { idUserRequiredQuery } from "./user.schema.js";

const checkStato = (val) => {
    val = val.toUpperCase();
    const isStatoCorrect = val == "IN PREPARAZIONE" || val == "ANNULLATO" || val == "CONSEGNATO" || val == "SPEDITO";
    return isStatoCorrect ? val : "TUTTI";

}

let stato = z.object({
    stato: z.coerce.string()
        .transform(checkStato, { message: "lo stato deve essere IN PREPARAZIONE o ANNULLATO o CONSEGNATO o SPEDITO" }),
});

export const StatoNotRequiredQuery = z.object({
    query: stato,
});

export const getOrderSchema = unionChecks([idUserRequiredQuery, StatoNotRequiredQuery]);
