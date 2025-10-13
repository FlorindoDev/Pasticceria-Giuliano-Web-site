import { z } from "zod";
import { idRequired, idNotRequired } from "./utils.schema.js";
import { unionChecks } from "./utils.schema.js";

// ---------- REGEX E VALIDAZIONI BASE ----------
const nomeProdottoRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'’"().,/\-\s]{2,80}$/;

// ---------- FIELD SCHEMAS (REQUIRED) ----------
let nome = z.object({
    nome: z
        .string({
            required_error: "Il campo nome è obbligatorio",
        })
        .regex(nomeProdottoRegex, "Nome prodotto non valido"),
});

let ArrayNames = z.array(nome);

// ---------- ID (REQUIRED/NOT REQUIRED) ----------
let idIngredienteR = z.object({
    idIngrediente: idRequired.id,
});

let idIngredienteNotR = z.object({
    idIngrediente: idNotRequired.id,
});

// ---------- FIELD SCHEMAS (NOT REQUIRED) ----------
let nomeNotRequired = z.object({
    nome: z.string().regex(nomeProdottoRegex, "Nome prodotto non valido").optional(),
});

let ArrayNamesNotR = z.array(nomeNotRequired);



// ---------- EXPORTS (WRAPPERS) ----------
export const idIngredienteRequiredQuery = z.object({
    query: idIngredienteR,
});

export const idIngredienteNotRequiredQuery = z.object({
    query: idIngredienteNotR,
});

export const idIngredienteRequredParams = z.object({
    params: z.object(idRequired),
});

export const NomeRequiredBody = z.object({
    body: ArrayNames,
});

export const NomeRequiredQeury = z.object({
    query: ArrayNames,
});

export const NomeNotRequiredBody = z.object({
    body: ArrayNamesNotR,
});


export const schemaIngredientPost = unionChecks([NomeRequiredBody]);
