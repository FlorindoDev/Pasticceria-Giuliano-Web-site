import express from "express";
import { isUserPrsent, isTelephoneNumerPresent } from "../middleware/UserMiddlewares.js";
import { AuthController } from "../controllers/AuthController.js";
import { UserAlreadyExistsError, TelephoneNumerPresentError } from "../utils/error/index.js";
import { schemaLogin, schemaSignUp } from "../schemas/auth.schema.js";
import { validate } from "../middleware/Middlewares.js";


export const router = express.Router();

const ErrorUserAbsenct = new UserAlreadyExistsError();
const ErrorTelephoneNumerPresent = new TelephoneNumerPresentError();

/**
 * @swagger
 *   "/auth/signup": {
 *     "post": {
 *       "summary": "Registra un nuovo utente",
 *       "description": "Crea un nuovo account utente se l'email o il telefono non sono già registrati.",
 *       "tags": ["Authentication"],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "nome": {
 *                   "type": "string",
 *                   "example": "Mario",
 *                   "description": "Nome dell'utente"
 *                 },
 *                 "cognome": {
 *                   "type": "string",
 *                   "example": "Rossi",
 *                   "description": "Cognome dell'utente"
 *                 },
 *                 "telefono": {
 *                   "type": "string",
 *                   "example": "+39 333 1234567",
 *                   "description": "Numero di telefono univoco"
 *                 },
 *                 "email": {
 *                   "type": "string",
 *                   "format": "email",
 *                   "example": "mario.rossi@example.com",
 *                   "description": "Email univoca dell'utente"
 *                 },
 *                 "password": {
 *                   "type": "string",
 *                   "example": "mypassword123",
 *                   "description": "Password in chiaro (verrà hashata SHA-256)"
 *                 }
 *               },
 *               "required": ["nome", "cognome", "telefono", "email", "password"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Utente registrato con successo",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "message": "User successfully registered",
 *                 "user": {
 *                   "idUser": "018fa0fc-3e68-7ccd-9e85-5b3950397aad",
 *                   "nome": "Mario",
 *                   "cognome": "Rossi",
 *                   "email": "mario.rossi@example.com",
 *                   "telefono": "+39 333 1234567",
 *                   "createdAt": "2025-05-17T16:22:54.589Z"
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "409": {
 *           "description": "Utente già esistente (email o telefono duplicati)",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "error": "User already exists"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Dati mancanti o non validi nel body (es. email o password assenti)",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "error": "Missing required fields: email or password"
 *               }
 *             }
 *           }
 *         },
 *         "503": {
 *           "description": "Servizio non disponibile, registrazione temporaneamente disabilitata",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "error": "Service unavailable, signup temporarily disabled"
 *               }
 *             }
 *           }
 *         },
 *         "default": {
 *           "description": "Errore imprevisto",
 *           "content": {
 *             "application/json": {
 *               "example": {
 *                 "error": "Unexpected error"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 */
router.post('/signup', [validate(schemaSignUp), isUserPrsent(ErrorUserAbsenct), isTelephoneNumerPresent(ErrorTelephoneNumerPresent)], (req, res, next) => {
    AuthController.saveUser(req).then(() => {

        res.status(200);
        res.send();

    }).catch((err) => {
        next(err)
    });

});

/**
 * @swagger
 * {
 *  "components": {
 *     "securitySchemes": {
 *       "bearerAuth": {
 *         "type": "http",
 *         "scheme": "bearer",
 *         "bearerFormat": "JWT",
 *         "description": "Inserisci il token JWT nel formato `Bearer <token>`"
 *       }
 *     }
 *   },
 *   "/auth/login": {
 *     "post": {
 *       "summary": "Autenticazione utente",
 *       "description": "Verifica le credenziali e restituisce un token JWT",
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/User"
 *             },
 *             "example": {
 *               "email": "mario.rossi@example.com",
 *               "password": "P@ssw0rd!"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Token rilasciato con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "token": {
 *                     "type": "string",
 *                     "description": "JWT di autenticazione"
 *                   }
 *                 }
 *               },
 *               "example": {
 *                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               }
 *             }
 *           }
 *         },
 *          "400": {
 *           "description": "email or passoword missing in the body",
 *           "content": {
 *             "application/json": {
 *               
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Email o password sbagliate",
 *           "content": {
 *             "application/json": {
 *               
 *             }
 *           }
 *         }
 *       },
 *       "tags": ["Authentication"]
 *     }
 *   }
 * }
 */
router.post('/login', validate(schemaLogin), (req, res, next) => {
    AuthController.checkCredentials(req).then(() => {

        res.status(200);
        res.json({ token: AuthController.issueToken(req.body.email, req.idUser, req.isAdmin) })

    }).catch((err) => {
        next(err)
    });

});
