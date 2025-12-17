import { z } from "zod";
import { unionChecks, uuidV7String, uuidV7StringOptional } from "./utils.schema.js";

const rfc5322EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const telefonoRegex = /^\+(\d{1,4})[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;


let password = z.object({
    password: z.string({
        required_error: "Il campo password è obbligatorio"
    }).min(8).max(50),
});

let nome = z.object({
    nome: z.string({
        required_error: "Il campo nome è obbligatorio"
    }).min(3).max(10),
});

let cognome = z.object({
    cognome: z.string({
        required_error: "Il campo cognome è obbligatorio"
    }).min(3).max(16),
});

let email = z.object({
    email: z.string({
        required_error: "Il campo email è obbligatorio"
    }).regex(rfc5322EmailRegex, "Email non valida"),
});

let telefono = z.object({
    telefono: z.string({
        required_error: "Il campo telefono è obbligatorio"
    }).regex(telefonoRegex, "numero di telefono non valido"),
});

let idR = z.object({
    iduser: uuidV7String
});

let idNotR = z.object({
    iduser: uuidV7StringOptional
});

let cognomeNotRequired = z.object({
    cognome: z.string().min(3).max(16).optional(),
});

let nomeNotRequired = z.object({
    nome: z.string().min(3).max(16).optional(),
});

let emailNotRequired = z.object({
    email: z.string().regex(rfc5322EmailRegex, "Email non valida").optional(),
});

let passwordNotRequired = z.object({
    password: z.string().min(8).max(50).optional(),
});

let telefonoNotRequired = z.object({
    telefono: z.string({}).regex(telefonoRegex, "numero di telefono non valido").optional(),
});

export const idUserRequiredQuery = z.object({
    query: idR
});


export const NomeRequiredBody = z.object({
    body: nome,

});

export const CognomeRequiredBody = z.object({
    body: cognome,

});

export const EmailRequiredBody = z.object({
    body: email,

});

export const PasswordRequiredBody = z.object({
    body: password,

});

export const TelefonoRequiredBody = z.object({
    body: telefono,

});

export const TelefonoNotRequiredBody = z.object({
    body: telefonoNotRequired,

});

export const idUserRequiredParams = z.object({
    params: z.object({
        id: uuidV7String,
    }),
});

export const idUserNotRequiredQuery = z.object({
    query: idNotR
});

export const CognomeNotRequiredBody = z.object({
    body: cognomeNotRequired,

});

export const NomeNotRequiredBody = z.object({
    body: nomeNotRequired,

});


export const EmailNotRequiredBody = z.object({
    body: emailNotRequired,

});

export const PasswordNotRequiredBody = z.object({
    body: passwordNotRequired,

});

export const schemaUserPut = unionChecks([idUserRequiredParams, NomeNotRequiredBody, CognomeNotRequiredBody, TelefonoNotRequiredBody, PasswordNotRequiredBody, EmailNotRequiredBody]);
