import { z } from "zod";
import { idRequired, idNotRequired } from "./utils.schema.js";
import { unionChecks } from "./utils.schema.js";

// ---------- REGEX E VALIDAZIONI BASE ----------
const nomeProdottoRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'’"().,/\-\s]{2,80}$/; // nomi tipo "Apple iPhone 15 Pro Max"
const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;

// ---------- FIELD SCHEMAS (REQUIRED) ----------
let nome = z.object({
    nome: z
        .string({
            required_error: "Il campo nome è obbligatorio",
        })
        .regex(nomeProdottoRegex, "Nome prodotto non valido"),
});

let costo = z.object({
    costo: z
        .number({
            required_error: "Il campo costo è obbligatorio",
            invalid_type_error: "Il costo deve essere un numero",
        })
        .positive("Il costo deve essere maggiore di 0"),
});


let isShippable = z.object({
    isShippable: z
        .boolean({
            required_error: "Il campo isShippable è obbligatorio",
            invalid_type_error: "Il campo isShippable deve essere booleano",
        }),
});

// ---------- ID (REQUIRED/NOT REQUIRED) ----------
let idProdottoR = z.object({
    idProdotto: idRequired.id,
});

let idProdottoNotR = z.object({
    idProdotto: idNotRequired.id,
});

// ---------- FIELD SCHEMAS (NOT REQUIRED) ----------
let nomeNotRequired = z.object({
    nome: z.string().regex(nomeProdottoRegex, "Nome prodotto non valido").optional(),
});

let costoNotRequired = z.object({
    costo: z
        .number({
            invalid_type_error: "Il costo deve essere un numero",
        })
        .positive("Il costo deve essere maggiore di 0")
        .optional(),
});

let isShippableNotRequired = z.object({
    isShippable: z.boolean().optional(),
});

// ---------- EXPORTS (WRAPPERS) ----------
export const idProdottoRequiredQuery = z.object({
    query: idProdottoR,
});

export const idProdottoNotRequiredQuery = z.object({
    query: idProdottoNotR,
});

export const idProdottoRequredParams = z.object({
    params: z.object(idRequired),
});

export const NomeRequiredBody = z.object({
    body: nome,
});

export const CostoRequiredBody = z.object({
    body: costo,
});

export const IsShippableRequiredBody = z.object({
    body: isShippable,
});

export const NomeNotRequiredBody = z.object({
    body: nomeNotRequired,
});

export const CostoNotRequiredBody = z.object({
    body: costoNotRequired,
});


export const IsShippableNotRequiredBody = z.object({
    body: isShippableNotRequired,
});


export const schemaProductPost = unionChecks([CostoRequiredBody, NomeRequiredBody, IsShippableRequiredBody]);
export const schemaProductPut = unionChecks([CostoNotRequiredBody, NomeNotRequiredBody, IsShippableNotRequiredBody]);