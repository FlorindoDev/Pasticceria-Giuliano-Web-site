import { z } from "zod";
import { idRequired, idNotRequired } from "./utils.schema.js";
import { idProdottoRequiredBody } from "./product.schema.js";
import { SchemaParams } from "./cart.schema.js";
import { unionChecks } from "./utils.schema.js";

// ---------- ID (REQUIRED/NOT REQUIRED) ----------
let idCartItemR = z.object({
    idCartItem: idRequired.id,
});

let idCartItemNotR = z.object({
    idCartItem: idNotRequired.id,
});

// ---------- FIELD SCHEMAS (REQUIRED) ----------
let quantity = z.object({
    quantity: z
        .number({
            required_error: "Il campo quantity è obbligatorio",
        })
});

// ---------- FIELD SCHEMAS (NOT REQUIRED) ----------
let quantityNotRequired = z.object({
    quantity: z
        .number({
            required_error: "Il campo quantity è obbligatorio",
        }).optional()
});


// ---------- EXPORTS (WRAPPERS) ----------
export const idCartItemRequiredQuery = z.object({
    query: idCartItemR,
});

export const idCartItemNotRequiredQuery = z.object({
    query: idCartItemNotR,
});

export const idCartItemRequiredParams = z.object({
    params: z.object(idRequired),
});

export const quantityRequiredBody = z.object({
    body: quantity,
});


export const SchemaParamsDelete = unionChecks([SchemaParams, idCartItemRequiredParams]);

export const SchemaCartItemPost = unionChecks([SchemaParams, quantityRequiredBody, idProdottoRequiredBody]);


