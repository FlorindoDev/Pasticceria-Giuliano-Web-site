import express from "express";
import { enforceAuthentication, isOwnProfile } from "../middleware/authorization.js"
import { validate } from "../middleware/Middlewares.js";
import { ResidenceController } from "../controllers/ResidenceController.js";
import { schemaResidencePost, schemaResidencePut, idResidenzaRequiredParams } from "../schemas/residenza.schema.js";

export const router = express.Router();



/**
 * @swagger
 * {
 *   "/users/{id}/residences": {
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
router.post('/:id/residences', [enforceAuthentication, validate(schemaResidencePost), isOwnProfile], (req, res, next) => {
    ResidenceController.addResidence(req.idUser, req.body).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residences/{residenceId}": {
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
router.delete('/:id/residences/:residenceId', [enforceAuthentication, validate(idResidenzaRequiredParams), isOwnProfile], (req, res, next) => {
    ResidenceController.deleteResidence(req.params.residenceId).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residences": {
 *     "get": {
 *       "tags": ["Users"],
 *       "summary": "Ottieni la residenza dell'utente",
 *       "description": "Recupera i dati di residenza associati all'utente specificato tramite ID.",
 *       "operationId": "getUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente di cui ottenere la residenza",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Residenza recuperata con successo",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "regione": { "type": "string", "example": "Lombardia" },
 *                   "comune": { "type": "string", "example": "Milano" },
 *                   "cap": { "type": "string", "example": "20100" },
 *                   "via": { "type": "string", "example": "Via Roma" },
 *                   "numero_civico": { "type": "string", "example": "10" }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l’utente non può accedere a questo profilo" },
 *         "404": { "description": "Residenza non trovata" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.get('/:id/residences', enforceAuthentication, isOwnProfile, (req, res, next) => {
    ResidenceController.getResidence(req.idUser).then((result) => {
        res.status(200).json(result);

    }).catch(err => {
        next(err);
    });

});

/**
 * @swagger
 * {
 *   "/users/{id}/residences/{residenceId}": {
 *     "put": {
 *       "tags": ["Users"],
 *       "summary": "Aggiorna la residenza di un utente",
 *       "description": "Permette di aggiornare i dati di una specifica residenza associata all'utente identificato tramite ID.",
 *       "operationId": "updateUserResidence",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "description": "ID dell'utente proprietario della residenza",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         },
 *         {
 *           "name": "residenceId",
 *           "in": "path",
 *           "description": "ID della residenza da aggiornare",
 *           "required": true,
 *           "schema": { "type": "string" }
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "type": "object",
 *               "properties": {
 *                 "regione": { "type": "string" },
 *                 "comune": { "type": "string" },
 *                 "cap": { "type": "string" },
 *                 "via": { "type": "string" },
 *                 "numero_civico": { "type": "string" }
 *               },
 *               "required": ["regione", "comune", "cap", "via", "numero_civico"],
 *               "example": {
 *                 "regione": "Lombardia",
 *                 "comune": "Milano",
 *                 "cap": "20100",
 *                 "via": "Via Roma",
 *                 "numero_civico": "10"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": { "description": "Residenza aggiornata con successo" },
 *         "400": { "description": "Richiesta non valida — dati mancanti o errati" },
 *         "401": { "description": "Non autorizzato — token mancante o non valido" },
 *         "403": { "description": "Accesso negato — l’utente non può modificare questa residenza" },
 *         "404": { "description": "Residenza non trovata" },
 *         "500": { "description": "Errore del server" }
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id/residences/:residenceId', [enforceAuthentication, validate(schemaResidencePut), isOwnProfile], (req, res, next) => {
    ResidenceController.updateResidence(req.params.residenceId, req.body).then(() => {
        res.status(200);
        res.send();
    }).catch(err => {
        next(err);
    });

});