import { z } from "zod";
import { idRequired, idNotRequired } from "./utils.schema.js";
import { idUserRequiredParams } from "./user.schema.js";
import { unionChecks } from "./utils.schema.js";

// ---------- ID (REQUIRED/NOT REQUIRED) ----------
let idCartR = z.object({
    idCart: idRequired.id,
});

let idCartNotR = z.object({
    idCart: idNotRequired.id,
});



// ---------- EXPORTS (WRAPPERS) ----------
export const idCartRequiredQuery = z.object({
    query: idCartR,
});

export const idCartNotRequiredQuery = z.object({
    query: idCartNotR,
});

export const idCartRequiredParams = z.object({
    params: z.object({
        idCart: idRequired.id,
    }),
});


export const SchemaParams = unionChecks([idCartRequiredParams, idUserRequiredParams]);
