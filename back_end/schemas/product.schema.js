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

let tag = z.object({
    tag: z
        .string({
            required_error: "Il campo tag è obbligatorio",
            invalid_type_error: "Il costo deve essere una stringa",
        })
});

const costo = z.object({
    costo: z.preprocess(
        (val) => {
            // se è una stringa numerica, convertila in numero
            if (typeof val === "string" && val.trim() !== "" && !isNaN(Number(val))) {
                return Number(val);
            }
            return val; // altrimenti lascia com'è
        },
        z.number({
            required_error: "Il campo costo è obbligatorio",
            invalid_type_error: "Il costo deve essere un numero",
        }).positive("Il costo deve essere maggiore di 0")
    ),
});


const isShippable = z.object({
    isShippable: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                if (val.toLowerCase() === "true") return true;
                if (val.toLowerCase() === "false") return false;
            }
            if (val === 1) return true;
            if (val === 0) return false;
            return val;
        },
        z.boolean({
            required_error: "Il campo isShippable è obbligatorio",
            invalid_type_error: "Il campo isShippable deve essere booleano",
        })
    ),
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

let tagNotRequired = z.object({
    tag: z
        .string({
            invalid_type_error: "Il costo deve essere una stringa",
        }).optional()
});

let costoNotRequired = z.object({
    costo: z.preprocess(
        (val) => {
            // se è una stringa numerica, convertila in numero
            if (typeof val === "string" && val.trim() !== "" && !isNaN(Number(val))) {
                return Number(val);
            }
            return val; // altrimenti lascia com'è
        },
        z.number({
            invalid_type_error: "Il costo deve essere un numero",
        }).positive("Il costo deve essere maggiore di 0").optional()
    ),
});

let isShippableNotRequired = z.object({
    isShippable: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                if (val.toLowerCase() === "true") return true;
                if (val.toLowerCase() === "false") return false;
            }
            if (val === 1) return true;
            if (val === 0) return false;
            return val;
        },
        z.boolean({
            required_error: "Il campo isShippable è obbligatorio",
            invalid_type_error: "Il campo isShippable deve essere booleano",
        }).optional()
    ),
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

export const TagRequiredBody = z.object({
    body: tag,
});

export const TagNotRequiredBody = z.object({
    body: tagNotRequired,
});

export const NomeNotRequiredQuery = z.object({
    query: nomeNotRequired,
});

export const TagNotRequiredQuery = z.object({
    query: tagNotRequired,
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


export const schemaProductPost = unionChecks([CostoRequiredBody, NomeRequiredBody, IsShippableRequiredBody, TagRequiredBody]);
export const schemaProductPut = unionChecks([CostoNotRequiredBody, NomeNotRequiredBody, IsShippableNotRequiredBody, TagNotRequiredBody]);
export const schemaProductSearch = unionChecks([NomeNotRequiredQuery, TagNotRequiredQuery]);