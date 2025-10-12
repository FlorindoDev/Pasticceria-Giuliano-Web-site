import { z } from "zod";
import { idRequired, idNotRequired, unionChecks } from "./utils.schema.js";

const capRegex = /^\d{5}$/;
const comuneRegioneRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\-\s]{2,80}$/; // es. "Sant'Agata Bolognese"
const viaRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9'’.\-\/\s]{2,80}$/;     // es. "Via G. Marconi 12/3"
const numeroCivicoRegex = /^\d+[A-Za-z]?(?:[\/\-]\d+[A-Za-z]?)?$/; // 10, 10A, 10/2, 10-12, 10B/1

// ---------- FIELD SCHEMAS (REQUIRED) ----------
let regione = z.object({
    regione: z
        .string({ required_error: "Il campo regione è obbligatorio" })
        .regex(comuneRegioneRegex, "regione non valida"),
});

let comune = z.object({
    comune: z
        .string({ required_error: "Il campo comune è obbligatorio" })
        .regex(comuneRegioneRegex, "comune non valido"),
});

let cap = z.object({
    cap: z
        .string({ required_error: "Il campo cap è obbligatorio" })
        .regex(capRegex, "CAP non valido"),
});

let via = z.object({
    via: z
        .string({ required_error: "Il campo via è obbligatorio" })
        .regex(viaRegex, "via non valida"),
});

let numeroCivico = z.object({
    numero_civico: z
        .string({ required_error: "Il campo numeroCivico è obbligatorio" })
        .regex(numeroCivicoRegex, "numero civico non valido"),
});

// ---------- ID (REQUIRED/NOT REQUIRED) ----------
let idResR = z.object({
    residenceId: idRequired.id,
});

let idResNotR = z.object({
    residenceId: idNotRequired.id,
});

// ---------- FIELD SCHEMAS (NOT REQUIRED) ----------
let regioneNotRequired = z.object({
    regione: z.string().regex(comuneRegioneRegex, "regione non valida").optional(),
});

let comuneNotRequired = z.object({
    comune: z.string().regex(comuneRegioneRegex, "comune non valida").optional(),
});

let capNotRequired = z.object({
    cap: z.string().regex(capRegex, "CAP non valido").optional(),
});

let viaNotRequired = z.object({
    via: z.string().regex(viaRegex, "via non valida").optional(),
});

let numeroCivicoNotRequired = z.object({
    numero_civico: z.string().regex(numeroCivicoRegex, "numero civico non valido").optional(),
});

// ---------- EXPORTS (WRAPPERS) ----------
export const idResidenzaRequiredQuery = z.object({
    query: idResR,
});

export const idResidenzaRequiredParams = z.object({
    params: idResR,
});

export const idResidenzaNotRequiredQuery = z.object({
    query: idResNotR,
});


export const idResidenzaRequredParams = z.object({
    params: z.object(idRequired),
});

export const RegioneRequiredBody = z.object({
    body: regione,
});

export const ComuneRequiredBody = z.object({
    body: comune,
});

export const CapRequiredBody = z.object({
    body: cap,
});

export const ViaRequiredBody = z.object({
    body: via,
});

export const NumeroCivicoRequiredBody = z.object({
    body: numeroCivico,
});

export const RegioneNotRequiredBody = z.object({
    body: regioneNotRequired,
});

export const ComuneNotRequiredBody = z.object({
    body: comuneNotRequired,
});

export const CapNotRequiredBody = z.object({
    body: capNotRequired,
});

export const ViaNotRequiredBody = z.object({
    body: viaNotRequired,
});

export const NumeroCivicoNotRequiredBody = z.object({
    body: numeroCivicoNotRequired,
});


export const schemaProductPost = unionChecks([RegioneRequiredBody, ComuneRequiredBody, CapRequiredBody, ViaRequiredBody, NumeroCivicoRequiredBody]);
export const schemaProductPut = unionChecks([idResidenzaRequiredParams, RegioneNotRequiredBody, ComuneNotRequiredBody, CapNotRequiredBody, ViaNotRequiredBody, NumeroCivicoNotRequiredBody]);