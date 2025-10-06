import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { UsersController } from "../controllers/UsersController.js";
import { upLoad as upLoadOnGoogle } from "../middleware/GoogleStorage.js"
import { idUserRequredParams, schemaUserPut } from "../schemas/user.schema.js";
import { validate } from "../middleware/Middlewares.js";

//multer
import multer from "multer";
import { ResidanceController } from "../controllers/ResidenceController.js";
const upload = multer({ storage: multer.memoryStorage() });
const imageParser = upload.fields([{ name: 'image', maxCount: 1 }])


export const router = express.Router();


/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Recupera un utente tramite ID",
 *       "description": "Restituisce le informazioni dettagliate di un utente in base all'ID specificato",
 *       "operationId": "getUserById",
 *         "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "items": { "$ref": "#/components/schemas/User" }
 *               },
 *                "example": {
 *                      "idUser": 1,
 *                      "nome": "johnDoe",
 *                      "cognome": "johnDoe",
 *                       "email": "john@example.com",
 *                       "telefono": null,
 *                       "createdAt": "2025-05-17T16:18:36.773Z",
 *                       "updatedAt": "2025-05-17T16:18:36.773Z"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get('/:id', [enforceAuthentication, validate(idUserRequredParams), isOwnProfile], (req, res, next) => {

    UsersController.getUserFromId(req.params.id).then((result) => {

        res.status(200);
        res.json(result);

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "put": {
 *       "tags": ["Users"],
 *       "summary": "Aggiorna un utente tramite ID",
 *       "description": "Aggiorna un utente in base all'ID specificato",
 *       "operationId": "putUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *        "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/User"
 *             },
 *             "example": {
 *               "nome": "johnDoe",
 *               "cognome": "johnDoe",
 *               "telefono": "3391382168",
 *               "email": "john@example.com",
 *               "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6"
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *         },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id', enforceAuthentication, validate(schemaUserPut), isOwnProfile, (req, res, next) => {

    let changes = UsersController.changesObject(req);

    UsersController.updateUser(req.idUser, changes).then(() => {

        res.status(200);
        res.send();

    }).catch((err) => {
        next(err)
    });
});

/**
 * @swagger
 * {
 *   "/users/{id}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Cancella un utente tramite ID",
 *       "description": "",
 *       "operationId": "deleteUserById",
 *       "security": [
 *          {
 *              "bearerAuth": []
 *          }
 *        ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente da recuperare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *         "200": {
 *           "description": "Lista di utenti trovati",
 *          },
 *         "404": {
 *           "description": "Utente non trovato",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "non ci sono utenti"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete('/:id', enforceAuthentication, isOwnProfile, (req, res, next) => {
    UsersController.deleteUser(req.idUser).then(() => {
        res.status(200)
        res.send();
    }).catch(err => {
        next(err);
    });

});


/**
 * @swagger
 * {
 *   "/users/{id}/residence": {
 *     "post": {
 *       "tags": ["Users"],
 *       "summary": "Aggiungi una residenza all'utente",
 *       "description": "Permette di aggiungere una residenza per l'utente specificato tramite ID.",
 *       "operationId": "addUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente a cui aggiungere la residenza",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "regione": {
 *                   "type": "string",
 *                   "example": "Lombardia"
 *                 },
 *                 "comune": {
 *                   "type": "string",
 *                   "example": "Milano"
 *                 },
 *                 "cap": {
 *                   "type": "string",
 *                   "example": "20100"
 *                 },
 *                 "via": {
 *                   "type": "string",
 *                   "example": "Via Roma"
 *                 },
 *                 "numero_civico": {
 *                   "type": "string",
 *                   "example": "10"
 *                 }
 *               },
 *               "required": ["regione", "comune", "cap", "via", "numero_civico"]
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Residenza aggiunta con successo"
 *         },
 *         "400": {
 *           "description": "Richiesta non valida — dati mancanti o errati",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "401": {
 *           "description": "Non autorizzato — token mancante o non valido",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "403": {
 *           "description": "Accesso negato — l’utente non può modificare questo profilo",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post('/:id/residence', enforceAuthentication, isOwnProfile, (req, res, next) => {
    ResidanceController.addResidance(req).then(() => {
        res.status(200)
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residence/{residenceId}": {
 *     "delete": {
 *       "tags": ["Users"],
 *       "summary": "Cancella una residenza dell'utente",
 *       "description": "Elimina una residenza associata all'utente specificato tramite il suo ID.",
 *       "operationId": "deleteUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         },
 *         {
 *           "name": "residenceId",
 *           "in": "path",
 *           "description": "ID della residenza da eliminare",
 *           "required": true,
 *           "schema": {
 *             "type": "string"
 *           }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Residenza eliminata con successo"
 *         },
 *         "401": {
 *           "description": "Non autorizzato — token mancante o non valido",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "403": {
 *           "description": "Accesso negato — l’utente non può modificare questo profilo",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         },
 *         "404": {
 *           "description": "Residenza non trovata",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           },
 *           "examples": {
 *             "application/json": {
 *               "code": 404,
 *               "message": "Residenza non trovata"
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Errore del server",
 *           "schema": {
 *             "$ref": "#/components/schemas/Error"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.delete('/:id/residence/:residenceId', enforceAuthentication, isOwnProfile, (req, res, next) => {
    ResidanceController.deleteResidance(req).then(() => {
        res.status(200)
        res.send();
    }).catch(err => {
        next(err);
    });

});





