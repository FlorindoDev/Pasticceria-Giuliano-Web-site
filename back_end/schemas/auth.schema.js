import { EmailRequiredBody, PasswordRequiredBody, NomeRequiredBody, CognomeRequiredBody, TelefonoNotRequiredBody } from "../schemas/user.schema.js";
import { unionChecks } from "../schemas/utils.schema.js";

export const schemaLogin = unionChecks([EmailRequiredBody, PasswordRequiredBody]);
export const schemaSignUp = unionChecks([schemaLogin, NomeRequiredBody, CognomeRequiredBody, TelefonoNotRequiredBody]);